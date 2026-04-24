import { getSupabasePublic } from "./supabase";

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  cover_url: string | null;
  tags: string[] | null;
  live_url: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export async function getPublicProjects(): Promise<Project[]> {
  const client = getSupabasePublic();
  if (!client) return [];
  const { data, error } = await client
    .from("projects")
    .select(
      "id, title, slug, summary, description, cover_url, tags, live_url, featured, created_at, updated_at",
    )
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to load projects:", error.message);
    return [];
  }
  return (data ?? []) as Project[];
}
