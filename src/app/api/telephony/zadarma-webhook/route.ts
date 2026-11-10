import { NextRequest, NextResponse } from "next/server";
import { callZadarmaApi, verifyZadarmaWebhookSignature } from "@/lib/zadarma";

/**
 * GET Handler for Zadarma URL validation challenge (echo $zd_echo)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const zdEcho = searchParams.get("zd_echo");

  if (zdEcho) {
    console.log("[Zadarma Webhook] Responding to zd_echo handshake:", zdEcho);
    return new NextResponse(zdEcho, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ status: "active", service: "zadarma-webhook" });
}

/**
 * POST Handler for Zadarma call event notifications (NOTIFY_END, NOTIFY_OUT_END)
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Check for zd_echo query param in POST handshake
    const { searchParams } = new URL(req.url);
    const zdEcho = searchParams.get("zd_echo");
    if (zdEcho) {
      return new NextResponse(zdEcho, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 2. Parse incoming body (supports application/x-www-form-urlencoded, multipart/form-data, json)
    const contentType = req.headers.get("content-type") || "";
    const body: Record<string, string> = {};

    if (contentType.includes("application/json")) {
      const json = await req.json();
      Object.entries(json).forEach(([k, v]) => {
        body[k] = String(v ?? "");
      });
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        body[key] = String(value ?? "");
      });
    } else {
      const text = await req.text();
      const params = new URLSearchParams(text);
      params.forEach((val, key) => {
        body[key] = val;
      });
    }

    console.log("[Zadarma Webhook] Incoming notification event:", body.event || "UNKNOWN", body);

    // 2.1 Graceful fallback: If KeyCRM call initiation was accidentally routed to this webhook URL
    if (body.destination_number || (body.caller && !body.event)) {
      console.log("[Zadarma Webhook] Detected KeyCRM call initiation request routed to webhook endpoint. Executing call...");
      const from = String(body.caller || body.from || "100").trim();
      const rawTo = String(body.destination_number || body.to || body.phone || "").trim();
      const digitsTo = rawTo.replace(/\D/g, "");

      const callbackParams: Record<string, string> = { from, to: digitsTo };
      if (digitsTo.startsWith("40")) {
        callbackParams.caller_id = "40361630152";
      } else if (digitsTo.startsWith("359")) {
        callbackParams.caller_id = "35952920168";
      }

      const { ok, data } = await callZadarmaApi<{ status: string; message?: string }>(
        "/v1/request/callback/",
        callbackParams,
        "GET"
      );

      if (ok && data.status === "success") {
        console.log("[Zadarma Webhook] Handled KeyCRM call successfully:", data);
        return NextResponse.json({ status: "success" }, { status: 200 });
      }

      console.error("[Zadarma Webhook] Failed to initiate Zadarma call:", data);
      return NextResponse.json(
        { status: "error", message: data.message || "Call initiation failed" },
        { status: 500 }
      );
    }

    // 3. Signature Validation
    const signatureHeader =
      req.headers.get("signature") ||
      req.headers.get("x-signature") ||
      req.headers.get("http_signature") ||
      body.signature ||
      body.sign;

    const secretKey = process.env.ZADARMA_SECRET_KEY || "";

    if (!secretKey) {
      console.error("[Zadarma Webhook] ZADARMA_SECRET_KEY is missing in environment");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const isValid = verifyZadarmaWebhookSignature(signatureHeader, body, secretKey);

    if (!isValid) {
      console.warn("[Zadarma Webhook] Invalid signature rejected:", {
        header: signatureHeader,
        event: body.event,
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = body.event;

    // 4. Process call finish events (NOTIFY_END, NOTIFY_OUT_END)
    if (event === "NOTIFY_END" || event === "NOTIFY_OUT_END") {
      const isIncoming = event === "NOTIFY_END";

      // In KeyCRM:
      // - destination_number is ALWAYS the customer's phone number
      // - caller is ALWAYS the manager's internal extension number (e.g. 101)
      const destinationNumber = isIncoming
        ? body.caller_id || body.caller || body.from || ""
        : body.destination || body.called_did || body.to || "";

      const caller = isIncoming
        ? body.internal || body.called_did || body.to || "101"
        : body.internal || body.caller_id || body.caller || "101";

      const duration = Number(body.duration || 0);

      // State mapping to KeyCRM: started, answered, canceled, busy, completed
      let state = "completed";
      const disposition = (body.disposition || "").toLowerCase();

      if (disposition === "answered" || duration > 0) {
        state = "completed";
      } else if (disposition === "cancel") {
        state = "canceled";
      } else if (disposition === "busy" || disposition === "no answer") {
        state = "busy";
      } else {
        state = duration > 0 ? "completed" : "busy";
      }

      const callId = body.pbx_call_id || body.call_id_with_rec || body.call_id || String(Date.now());

      // 5. Fetch call recording URL if call_id_with_rec is present
      let audioUrl: string | undefined = undefined;
      if (body.call_id_with_rec) {
        try {
          console.log(`[Zadarma Webhook] Fetching recording for call ${body.call_id_with_rec}...`);
          const recRes = await callZadarmaApi<{ status: string; link?: string }>(
            "/v1/pbx/record/request/",
            { call_id: body.call_id_with_rec },
            "GET"
          );

          if (recRes.ok && recRes.data.status === "success" && recRes.data.link) {
            audioUrl = recRes.data.link;
            console.log(`[Zadarma Webhook] Call recording link received:`, audioUrl);
          }
        } catch (recErr) {
          console.warn("[Zadarma Webhook] Failed to fetch call recording:", recErr);
        }
      }

      // 6. Format KeyCRM payload according to Asterisk/Other specification
      const keycrmPayload = {
        action: "call",
        call: {
          id: callId,
          direction: isIncoming ? "incoming" : "outgoing",
          destination_number: destinationNumber,
          caller: caller,
          state: state,
          duration: duration,
          ...(audioUrl ? { audio_url: audioUrl } : {}),
        },
      };

      console.log("[Zadarma Webhook] Formatted KeyCRM payload:", JSON.stringify(keycrmPayload));

      // 7. Send to KeyCRM Webhook URL
      const keycrmWebhookUrl = process.env.KEYCRM_WEBHOOK_URL;
      if (keycrmWebhookUrl) {
        try {
          const crmRes = await fetch(keycrmWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(keycrmPayload),
          });

          console.log(`[Zadarma Webhook] Forwarded to KeyCRM. Response status: ${crmRes.status}`);
        } catch (crmErr) {
          console.error("[Zadarma Webhook] Error sending to KeyCRM:", crmErr);
        }
      } else {
        console.warn("[Zadarma Webhook] KEYCRM_WEBHOOK_URL is not set in environment");
      }
    }

    // Zadarma always expects HTTP 200 OK
    return new NextResponse("OK", { status: 200 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Zadarma Webhook] Error processing webhook:", errorMsg);
    // Still return 200 to acknowledge receipt to Zadarma
    return new NextResponse("OK", { status: 200 });
  }
}
