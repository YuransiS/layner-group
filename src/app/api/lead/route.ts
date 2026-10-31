import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwbjB_JP2e-CU0UPte24vOC_0ivzRskf21AcAUulsn-lyewvp2EcQmchARdtF9pZ9tD/exec";

interface KeyCRMCardResponse {
  id?: number;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Автоматическое определение реального IP и геолокации через заголовки Vercel
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "unknown";

    const country = req.headers.get("x-vercel-ip-country") || "";
    const rawCity = req.headers.get("x-vercel-ip-city") || "";
    const city = rawCity ? decodeURIComponent(rawCity) : "";
    const geo = city && country ? `${city}, ${country}` : country || "";

    const payload = {
      ...body,
      ip: ip,
      geo: geo,
      source: body.source || req.headers.get("referer") || "direct",
    };

    // 1. Отправка в KeyCRM (Pipelines / Воронки)
    let keyCrmCardId: number | null = null;
    const keyCrmApiKey = process.env.KEYCRM_API_KEY;

    if (keyCrmApiKey) {
      try {
        const pipelineId = Number(process.env.KEYCRM_PIPELINE_ID || 1);
        const sourceId = Number(process.env.KEYCRM_SOURCE_ID || 1);
        const statusId = Number(process.env.KEYCRM_STATUS_ID || 1);

        const city = body.departure?.trim() || geo || "Не указан";
        const license = body.has_license || "Не указано";
        const truckInfo = body.truck_details?.trim() || "Не указано";

        const commentLines = [
          "📋 ДАННЫЕ КОНТАКТА:",
          `• Город: ${city}`,
          `• Есть лицензия: ${license}`,
          `• Сколько машин: ${truckInfo}`,
          `• Какие машины по тоны: ${truckInfo}`,
          "",
          "ℹ️ Дополнительно:",
          `• Статус компании: ${body.company_status || "Работает (активна)"}`,
          `• Язык сайта: ${(body.language || "ro").toUpperCase()}`,
          `• Форма: ${body.form_type === "quick_hero" ? "Быстрая (Hero)" : "Полная заявка"}`,
          `• IP / Гео: ${geo || ip || "Не определено"}`,
          `• Страница: ${payload.source}`,
          body.bw_cid ? `• BW CID: ${body.bw_cid}` : null,
          body.fbclid ? `• FBCLID: ${body.fbclid}` : null,
          body.visitor_uuid ? `• Visitor UUID: ${body.visitor_uuid}` : null,
        ].filter((line) => line !== null);

        const keyCrmBody = {
          title: body.name
            ? `${body.name} [${(body.language || "ro").toUpperCase()}]`
            : "Заявка с сайта",
          source_id: sourceId,
          pipeline_id: pipelineId,
          status_id: statusId,
          contact: {
            full_name: body.name || "Не указано",
            phone: body.phone || "",
            email: body.email || undefined,
          },
          manager_comment: commentLines.join("\n"),
          utm_source: body.utm_source || undefined,
          utm_medium: body.utm_medium || undefined,
          utm_campaign: body.utm_campaign || undefined,
          utm_term: body.utm_term || undefined,
          utm_content: body.utm_content || undefined,
        };

        const keyCrmRes = await fetch("https://openapi.keycrm.app/v1/pipelines/cards", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${keyCrmApiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(keyCrmBody),
        });

        if (keyCrmRes.ok) {
          const resData = (await keyCrmRes.json()) as KeyCRMCardResponse;
          keyCrmCardId = resData.id ?? null;
          console.log(`[KeyCRM] Card created successfully. ID: ${keyCrmCardId}`);
        } else {
          const errText = await keyCrmRes.text();
          console.error(`[KeyCRM] Error response (${keyCrmRes.status}):`, errText);
        }
      } catch (crmErr) {
        console.error("[KeyCRM] Network/Execution error:", crmErr);
      }
    } else {
      console.warn("[KeyCRM] KEYCRM_API_KEY is not defined in environment");
    }

    // 2. Отправка в Google Apps Script (параллельное сохранение в Google Таблицу)
    try {
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([key, val]) => {
        params.append(key, String(val ?? ""));
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
    } catch (gErr) {
      console.error("[Google Apps Script] Lead send error:", gErr);
    }

    return NextResponse.json({
      success: true,
      keycrm_id: keyCrmCardId,
      ip,
      geo,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("API Lead Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
