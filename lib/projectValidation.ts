export type ProjectPayload = {
  title?: unknown;
  slug?: unknown;
  summary?: unknown;
  description?: unknown;
  cover_url?: unknown;
  tags?: unknown;
  live_url?: unknown;
  featured?: unknown;
};

export function validateProject(body: ProjectPayload) {
  const errors: string[] = [];
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const strOrNull = (v: unknown) =>
    typeof v === "string" && v.trim().length > 0 ? v.trim() : null;

  const title = str(body.title);
  const slug = str(body.slug);
  const summary = str(body.summary);

  if (!title) errors.push("title is required");
  if (!slug) errors.push("slug is required");
  if (!summary) errors.push("summary is required");
  if (slug && !/^[a-z0-9-]+$/.test(slug)) {
    errors.push("slug must be lowercase letters, numbers, and dashes only");
  }

  const tags = Array.isArray(body.tags)
    ? body.tags.filter((t): t is string => typeof t === "string" && t.length > 0)
    : [];

  return {
    errors,
    record: {
      title,
      slug,
      summary,
      description: strOrNull(body.description),
      cover_url: strOrNull(body.cover_url),
      tags,
      live_url: strOrNull(body.live_url),
      featured: Boolean(body.featured),
    },
  };
}
