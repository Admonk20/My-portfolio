import { createHmac, timingSafeEqual } from "node:crypto";
import { SESSION_COOKIE, SESSION_TTL_SECONDS } from "./authConstants";

export { SESSION_COOKIE };
const SESSION_MAX_AGE = SESSION_TTL_SECONDS;

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error("SESSION_SECRET missing or too short (need >= 16 chars).");
  }
  return s;
}

function b64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(str: string): Buffer {
  const pad = 4 - (str.length % 4);
  const s = str.replace(/-/g, "+").replace(/_/g, "/") + (pad < 4 ? "=".repeat(pad) : "");
  return Buffer.from(s, "base64");
}

/**
 * Sign a session payload. Token format: base64url(payload).base64url(hmac).
 * Payload is small JSON: { exp: <unix seconds> }.
 */
export function signSession(ttlSeconds = SESSION_MAX_AGE): string {
  const payload = JSON.stringify({ exp: Math.floor(Date.now() / 1000) + ttlSeconds });
  const payloadPart = b64url(Buffer.from(payload));
  const sig = createHmac("sha256", getSecret()).update(payloadPart).digest();
  return `${payloadPart}.${b64url(sig)}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadPart, sigPart] = parts;

  const expected = createHmac("sha256", getSecret()).update(payloadPart).digest();
  const got = fromB64url(sigPart);
  if (expected.length !== got.length) return false;
  if (!timingSafeEqual(expected, got)) return false;

  try {
    const payload = JSON.parse(fromB64url(payloadPart).toString("utf8")) as {
      exp: number;
    };
    if (typeof payload.exp !== "number") return false;
    if (Math.floor(Date.now() / 1000) >= payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export function checkAdminPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const SESSION_TTL = SESSION_MAX_AGE;
