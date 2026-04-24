import { getSupabaseAdmin } from "@/lib/supabase";
import type { Project } from "@/lib/projects";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

async function loadProjects(): Promise<Project[]> {
  try {
    const client = getSupabaseAdmin();
    const { data, error } = await client
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Project[];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("admin loadProjects failed:", err);
    return [];
  }
}

export default async function AdminPage() {
  const projects = await loadProjects();
  const configured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-2">Portfolio</p>
          <h1 className="font-display text-4xl text-moon-pearl">
            Tend to the constellation
          </h1>
        </div>
      </div>

      {!configured && (
        <div className="mb-8 rounded-2xl border border-mist-rose/30 bg-mist-rose/5 p-6 text-sm text-moon-silver">
          Supabase isn&apos;t configured yet. Fill in{" "}
          <code className="text-moon-gold">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-moon-gold">SUPABASE_SERVICE_ROLE_KEY</code> in{" "}
          <code className="text-moon-gold">.env.local</code>, then restart the
          dev server.
        </div>
      )}

      <AdminClient initialProjects={projects} />
    </div>
  );
}
