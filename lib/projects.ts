import { airtableList } from "./airtable";

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
};

type ProjectFields = {
  Title?: string;
  Slug?: string;
  Summary?: string;
  Description?: string;
  "Cover Image URL"?: string;
  Tags?: string[];
  "Live URL"?: string;
  Featured?: boolean;
};

const PROJECTS_TABLE = "Projects";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getPublicProjects(): Promise<Project[]> {
  const records = await airtableList<ProjectFields>(PROJECTS_TABLE, {
    revalidate: 60,
  });

  const mapped: Project[] = records.map((r) => {
    const title = r.fields.Title ?? "Untitled";
    return {
      id: r.id,
      title,
      slug: r.fields.Slug?.trim() || slugify(title) || r.id,
      summary: r.fields.Summary ?? "",
      description: r.fields.Description ?? null,
      cover_url: r.fields["Cover Image URL"] ?? null,
      tags: r.fields.Tags ?? null,
      live_url: r.fields["Live URL"] ?? null,
      featured: Boolean(r.fields.Featured),
      created_at: r.createdTime,
    };
  });

  // Featured first, then newest.
  mapped.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.created_at.localeCompare(a.created_at);
  });

  return mapped;
}
