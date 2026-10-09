export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  truck_details?: string;
  departure?: string;
  has_license?: string;
  company_status?: string;
  form_type: "quick_hero" | "full_application";
  language: string;
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwbjB_JP2e-CU0UPte24vOC_0ivzRskf21AcAUulsn-lyewvp2EcQmchARdtF9pZ9tD/exec";

export async function submitLead(data: LeadData): Promise<boolean> {
  const payload = {
    ...data,
    created_at: new Date().toISOString(),
    source: typeof window !== "undefined" ? window.location.href : "direct",
  };

  try {
    // We send payload as URLSearchParams for maximum Google Apps Script compatibility (e.parameter)
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, val]) => {
      params.append(key, String(val ?? ""));
    });

    // Strategy 1: POST request with URL-encoded form data (no-cors prevents browser 302 CORS false-positives)
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    return true;
  } catch (err) {
    console.warn("Primary submission attempt failed, trying fallback...", err);

    // Fallback: send as JSON payload
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
      return true;
    } catch (fallbackErr) {
      console.error("Failed to submit lead to Google Apps Script", fallbackErr);
      return false;
    }
  }
}
