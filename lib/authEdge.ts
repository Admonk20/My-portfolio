// Edge-runtime safe session verification (used by middleware).
// Uses Web Crypto (SubtleCrypto) so it works in both Edge and Node.

function fromB64url(str: string): Uint8Array {
  const pad = 4 - (str.length % 4);
  const s = str.replace(/-/g, "+").replace(/_/g, "/") + (pad < 4 ? "=".repeat(pad) : "");
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64urlFromBytes(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return new Uint8Array(sig);
}

export async function verifySessionEdge(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadPart, sigPart] = parts;

  try {
    const expected = await hmac(secret, payloadPart);
    const got = fromB64url(sigPart);
    if (!constantTimeEqual(expected, got)) return false;

    const payloadBytes = fromB64url(payloadPart);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as { exp?: number };
    if (typeof payload.exp !== "number") return false;
    if (Math.floor(Date.now() / 1000) >= payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

// Used by places that need to produce a signature in Edge (not currently used,
// but handy if login routes move to edge). Left here for symmetry.
export async function signSessionEdge(ttlSeconds = 60 * 60 * 24 * 7): Promise<string> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET missing");
  const payload = JSON.stringify({ exp: Math.floor(Date.now() / 1000) + ttlSeconds });
  const payloadPart = b64urlFromBytes(new TextEncoder().encode(payload));
  const sig = await hmac(secret, payloadPart);
  return `${payloadPart}.${b64urlFromBytes(sig)}`;
}
