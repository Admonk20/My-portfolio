import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Body | null;
  if (!body) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  try {
    const client = getSupabaseAdmin();
    const { error } = await client.from("messages").insert({
      name: name || null,
      email: email || null,
      message,
    });
    if (error) throw error;
  } catch (err) {
    // If Supabase isn't configured or the insert fails, still log and accept
    // so the user isn't blocked. The form also shows the mailto fallback.
    // eslint-disable-next-line no-console
    console.error("contact insert failed:", err);
    return NextResponse.json(
      {
        error:
          "Couldn't save your message. Please email directly — the mailto link is right below the form.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
