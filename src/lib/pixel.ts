export const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1478474474170852";

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
  bw_cid?: string;
  visitor_uuid?: string;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

function setCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch {}
}

function getStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Initializes and persists Dual-Storage Attribution:
 * Saves all UTMs, fbclid, _fbp, _fbc, and bw_cid to both localStorage and a 30-day 1st-party Cookie (SameSite=Lax).
 */
export function initAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);

  // 1. Visitor UUID & bw_cid
  let visitorUuid = getStorage("visitor_uuid") || getCookie("visitor_uuid");
  if (!visitorUuid) {
    visitorUuid = generateUuid();
    setStorage("visitor_uuid", visitorUuid);
    setCookie("visitor_uuid", visitorUuid);
  }

  let bwCid = urlParams.get("bw_cid") || getStorage("bw_cid") || getCookie("bw_cid");
  if (!bwCid) {
    bwCid = `bw_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  setStorage("bw_cid", bwCid);
  setCookie("bw_cid", bwCid);

  // 2. UTMs & fbclid
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
  ] as const;

  const attribution: AttributionData = {
    visitor_uuid: visitorUuid,
    bw_cid: bwCid,
  };

  keys.forEach((key) => {
    const fromUrl = urlParams.get(key);
    const stored = fromUrl || getStorage(key) || getCookie(key) || undefined;
    if (stored) {
      attribution[key] = stored;
      setStorage(key, stored);
      setCookie(key, stored);
    }
  });

  // 3. Meta Pixel cookies (_fbp, _fbc)
  const fbp = getCookie("_fbp") || getStorage("_fbp");
  if (fbp) {
    attribution.fbp = fbp;
    setStorage("_fbp", fbp);
    setCookie("_fbp", fbp);
  }

  let fbc = getCookie("_fbc") || getStorage("_fbc");
  const fbclid = attribution.fbclid;
  if (!fbc && fbclid) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
    setStorage("_fbc", fbc);
    setCookie("_fbc", fbc);
  }
  if (fbc) {
    attribution.fbc = fbc;
  }

  return attribution;
}

export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "bw_cid",
    "visitor_uuid",
    "_fbp",
    "_fbc",
  ] as const;

  const data: Record<string, string> = {};
  keys.forEach((k) => {
    const val = getStorage(k) || getCookie(k);
    if (val) {
      data[k.replace(/^_/, "")] = val;
    }
  });

  return data as AttributionData;
}

interface FacebookUserData {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
  external_id?: string;
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

function normalizeName(name: string): { fn?: string; ln?: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return {};
  if (parts.length === 1) {
    return { fn: parts[0].toLowerCase() };
  }
  return {
    fn: parts[0].toLowerCase(),
    ln: parts.slice(1).join(" ").toLowerCase(),
  };
}

export function trackPixelEvent(
  eventName: string,
  params?: Record<string, unknown>,
  userData?: {
    email?: string;
    phone?: string;
    name?: string;
    visitorUuid?: string;
  },
  customEventId?: string
) {
  if (typeof window === "undefined") return;

  const win = window as unknown as { fbq?: (...args: unknown[]) => void };
  const stored = getStoredAttribution();
  const eventId = customEventId || (stored.bw_cid ? `${stored.bw_cid}_${eventName}_${Date.now()}` : undefined);

  if (win.fbq) {
    try {
      if (userData) {
        const formattedUserData: FacebookUserData = {};
        if (userData.phone) formattedUserData.ph = normalizePhone(userData.phone);
        if (userData.name) {
          const { fn, ln } = normalizeName(userData.name);
          if (fn) formattedUserData.fn = fn;
          if (ln) formattedUserData.ln = ln;
        }
        if (stored.visitor_uuid || userData.visitorUuid) {
          formattedUserData.external_id = userData.visitorUuid || stored.visitor_uuid;
        }

        if (Object.keys(formattedUserData).length > 0) {
          win.fbq("init", FACEBOOK_PIXEL_ID, formattedUserData);
        }
      }

      if (eventId) {
        win.fbq("track", eventName, params || {}, { eventID: eventId });
      } else {
        win.fbq("track", eventName, params || {});
      }
    } catch (err) {
      console.error("[FB Pixel] Tracking error:", err);
    }
  }
}
