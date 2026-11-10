import crypto from "crypto";

const ZADARMA_API_URL = "https://api.zadarma.com";

/**
 * Builds RFC 1738 query string with alphabetically sorted keys
 */
export function buildParamsString(params: Record<string, string | number | undefined | null>): string {
  const sortedKeys = Object.keys(params).sort();
  const searchParams = new URLSearchParams();
  for (const k of sortedKeys) {
    const val = params[k];
    if (val !== undefined && val !== null && val !== "") {
      searchParams.append(k, String(val));
    }
  }
  return searchParams.toString();
}

/**
 * Generates official Zadarma API authorization header:
 * MD5(params_string) -> HMAC-SHA1(method + params_string + md5, secret) -> Base64(hmac_hex)
 */
export function generateZadarmaAuthHeader(
  method: string,
  params: Record<string, string | number | undefined | null>,
  apiKey: string,
  secretKey: string
): string {
  const paramsStr = buildParamsString(params);
  const md5Hex = crypto.createHash("md5").update(paramsStr).digest("hex");
  const data = method + paramsStr + md5Hex;
  const hmacHex = crypto.createHmac("sha1", secretKey).update(data).digest("hex");
  const signature = Buffer.from(hmacHex).toString("base64");
  return `${apiKey}:${signature}`;
}

/**
 * Executes an authenticated request to Zadarma API
 */
export async function callZadarmaApi<T = unknown>(
  method: string,
  params: Record<string, string | number | undefined | null> = {},
  requestType: "GET" | "POST" = "GET"
): Promise<{ ok: boolean; data: T }> {
  const apiKey = process.env.ZADARMA_API_KEY;
  const secretKey = process.env.ZADARMA_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error("Missing ZADARMA_API_KEY or ZADARMA_SECRET_KEY in environment");
  }

  const queryParams = { ...params, format: "json" };
  const authHeader = generateZadarmaAuthHeader(method, queryParams, apiKey, secretKey);
  const paramsStr = buildParamsString(queryParams);

  const url = requestType === "GET"
    ? `${ZADARMA_API_URL}${method}?${paramsStr}`
    : `${ZADARMA_API_URL}${method}`;

  const res = await fetch(url, {
    method: requestType,
    headers: {
      Authorization: authHeader,
      ...(requestType === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    ...(requestType === "POST" ? { body: paramsStr } : {}),
  });

  const data = (await res.json()) as T;
  return { ok: res.ok, data };
}

/**
 * Verifies incoming Zadarma webhook signature.
 * Zadarma signs specific parameters using HMAC-SHA1.
 */
export function verifyZadarmaWebhookSignature(
  signatureHeader: string | null,
  body: Record<string, string>,
  secretKey: string
): boolean {
  if (!signatureHeader || !secretKey) return false;

  const callerId = body.caller_id || body.caller || body.from || "";
  const calledDid = body.called_did || body.destination || body.to || "";
  const callStart = body.call_start || "";

  const candidates: string[] = [
    `${callerId}${calledDid}${callStart}`,
    `${callerId}${body.destination || ""}${callStart}`,
    `${callerId}${body.called_did || ""}${callStart}`,
    buildParamsString(body),
  ];

  const trimmedHeader = signatureHeader.trim();

  for (const str of candidates) {
    if (!str) continue;

    // 1. Raw binary HMAC Base64: base64(hash_hmac('sha1', str, secret, true))
    const rawHmac = crypto.createHmac("sha1", secretKey).update(str).digest("base64");
    if (rawHmac === trimmedHeader) return true;

    // 2. Hex HMAC Base64: base64(hash_hmac('sha1', str, secret))
    const hexHmac = crypto.createHmac("sha1", secretKey).update(str).digest("hex");
    const hexBase64 = Buffer.from(hexHmac).toString("base64");
    if (hexBase64 === trimmedHeader) return true;

    // 3. Raw Hex comparison
    if (hexHmac.toLowerCase() === trimmedHeader.toLowerCase()) return true;
  }

  return false;
}
