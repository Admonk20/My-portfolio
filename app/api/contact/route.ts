import { NextResponse } from "next/server";
import { airtableCreate, airtableConfigured } from "@/lib/airtable";

export const runtime = "nodejs";

const MESSAGES_TABLE = "Messages";

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

  if (!airtableConfigured()) {
    return NextResponse.json(
      {
        error:
          "Contact storage isn't configured yet. Please email directly — the mailto link is right below the form.",
      },
      { status: 503 },
    );
  }

  const record = await airtableCreate(MESSAGES_TABLE, {
    Name: name || undefined,
    Email: email || undefined,
    Message: message,
  });

  if (!record) {
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
