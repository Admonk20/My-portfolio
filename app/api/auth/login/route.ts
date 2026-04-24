import { NextResponse } from "next/server";
import { checkAdminPassword, signSession } from "@/lib/auth";
import { SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/lib/authConstants";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const password = (body as { password?: unknown }).password;
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = signSession(SESSION_TTL_SECONDS);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
