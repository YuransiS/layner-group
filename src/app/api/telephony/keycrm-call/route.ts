import { NextRequest, NextResponse } from "next/server";
import { callZadarmaApi } from "@/lib/zadarma";

interface KeyCRMCallPayload {
  caller?: string;
  from?: string;
  internal?: string;
  destination_number?: string;
  to?: string;
  phone?: string;
}

interface ZadarmaCallbackResponse {
  status: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    let body: KeyCRMCallPayload = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const text = await req.text();
      const params = new URLSearchParams(text);
      const parsed: Record<string, string> = {};
      params.forEach((val, key) => {
        parsed[key] = val;
      });
      body = parsed;
    }

    const from = String(body.caller || body.from || body.internal || "101").trim();
    const to = String(body.destination_number || body.to || body.phone || "").trim();

    if (!to) {
      console.warn("[KeyCRM Call] Missing destination number:", body);
      return NextResponse.json(
        { status: "error", message: "Missing destination phone number" },
        { status: 400 }
      );
    }

    console.log(`[KeyCRM Call] Initiating call from ${from} to ${to}...`);

    const { ok, data } = await callZadarmaApi<ZadarmaCallbackResponse>(
      "/v1/request/callback/",
      { from, to },
      "POST"
    );

    if (ok && data.status === "success") {
      console.log(`[KeyCRM Call] Call initiated successfully:`, data);
      return NextResponse.json({ status: "success" }, { status: 200 });
    }

    console.error(`[KeyCRM Call] Zadarma error response:`, data);
    return NextResponse.json(
      { status: "error", message: data.message || "Zadarma call initiation failed" },
      { status: 500 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[KeyCRM Call] Exception:", errorMsg);
    return NextResponse.json(
      { status: "error", message: errorMsg },
      { status: 500 }
    );
  }
}
