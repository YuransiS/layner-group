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

export function validatePhone(phone: string): boolean {
  // Минимум 8 цифр, допустимы символы +, -, пробелы, скобки
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 8 && digitsOnly.length <= 16;
}

export async function submitLead(data: LeadData): Promise<boolean> {
  const payload = {
    ...data,
    created_at: new Date().toISOString(),
    source: typeof window !== "undefined" ? window.location.href : "direct",
  };

  // 1. Попытка отправки через серверную ручку Next.js /api/lead (автоопределение IP на Vercel)
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return true;
    }
  } catch (apiErr) {
    console.warn("Internal API route failed, trying direct Google Script fallback...", apiErr);
  }

  // 2. Fallback: Прямая отправка в Google Apps Script из браузера
  try {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, val]) => {
      params.append(key, String(val ?? ""));
    });

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
    console.error("Direct lead submission error:", err);
    return false;
  }
}
