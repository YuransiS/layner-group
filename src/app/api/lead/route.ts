import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwbjB_JP2e-CU0UPte24vOC_0ivzRskf21AcAUulsn-lyewvp2EcQmchARdtF9pZ9tD/exec";

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
    const geo = city && country ? `${city}, ${country}` : (country || "");

    const payload = {
      ...body,
      ip: ip,
      geo: geo,
      source: body.source || req.headers.get("referer") || "direct",
    };

    // Отправка в Google Apps Script
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

    return NextResponse.json({ success: true, ip, geo });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("API Lead Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
