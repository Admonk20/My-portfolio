import { NextResponse } from "next/server";
import { getSupabaseAdmin, getSupabasePublic } from "@/lib/supabase";
import { validateProject, type ProjectPayload } from "@/lib/projectValidation";

export const runtime = "nodejs";

export async function GET() {
  const client = getSupabasePublic();
  if (!client) {
    return NextResponse.json({ projects: [] });
  }
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ projects: data ?? [] });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as ProjectPayload | null;
  if (!body) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const { errors, record } = validateProject(body);
  if (errors.length) {
    return NextResponse.json({ error: errors.join("; ") }, { status: 400 });
  }

  const client = getSupabaseAdmin();
  const { data, error } = await client
    .from("projects")
    .insert(record)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ project: data }, { status: 201 });
}
