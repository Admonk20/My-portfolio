"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";

type Draft = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  cover_url: string;
  tags: string;
  live_url: string;
  featured: boolean;
};

const emptyDraft: Draft = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  cover_url: "",
  tags: "",
  live_url: "",
  featured: false,
};

function toDraft(p: Project): Draft {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    description: p.description ?? "",
    cover_url: p.cover_url ?? "",
    tags: (p.tags ?? []).join(", "),
    live_url: p.live_url ?? "",
    featured: p.featured,
  };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(draft.id);

  const resetDraft = () => {
    setDraft(emptyDraft);
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: draft.title.trim(),
      slug: draft.slug.trim() || slugify(draft.title),
      summary: draft.summary.trim(),
      description: draft.description.trim() || null,
      cover_url: draft.cover_url.trim() || null,
      tags: draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      live_url: draft.live_url.trim() || null,
      featured: draft.featured,
    };

    try {
      const url = draft.id ? `/api/projects/${draft.id}` : "/api/projects";
      const method = draft.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save failed");
      }
      const { project } = (await res.json()) as { project: Project };
      setProjects((list) => {
        if (draft.id) {
          return list.map((p) => (p.id === project.id ? project : p));
        }
        return [project, ...list];
      });
      resetDraft();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Delete failed");
      return;
    }
    setProjects((list) => list.filter((p) => p.id !== id));
    if (draft.id === id) resetDraft();
    router.refresh();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <form
        onSubmit={onSubmit}
        className="glass halo rounded-2xl p-6 lg:col-span-2"
      >
        <h2 className="mb-1 font-display text-2xl text-moon-pearl">
          {isEditing ? "Edit project" : "New project"}
        </h2>
        <p className="mb-6 text-sm text-moon-silver/70">
          {isEditing
            ? "Saving will update this entry."
            : "Add a new project to the constellation."}
        </p>

        <Input
          label="Title"
          value={draft.title}
          onChange={(v) =>
            setDraft((d) => ({
              ...d,
              title: v,
              slug: d.id ? d.slug : slugify(v),
            }))
          }
          required
        />
        <Input
          label="Slug"
          hint="URL-safe identifier. Auto-generated from title."
          value={draft.slug}
          onChange={(v) => setDraft((d) => ({ ...d, slug: v }))}
          required
        />
        <Input
          label="One-line summary"
          value={draft.summary}
          onChange={(v) => setDraft((d) => ({ ...d, summary: v }))}
          required
        />
        <Textarea
          label="Description"
          hint="Long-form, shown in the project detail modal."
          value={draft.description}
          onChange={(v) => setDraft((d) => ({ ...d, description: v }))}
        />
        <Input
          label="Cover image URL"
          hint="Any public HTTPS image URL."
          value={draft.cover_url}
          onChange={(v) => setDraft((d) => ({ ...d, cover_url: v }))}
        />
        <Input
          label="Tags"
          hint="Comma-separated."
          value={draft.tags}
          onChange={(v) => setDraft((d) => ({ ...d, tags: v }))}
        />
        <Input
          label="Live URL"
          value={draft.live_url}
          onChange={(v) => setDraft((d) => ({ ...d, live_url: v }))}
        />

        <label className="mt-4 flex items-center gap-3 text-sm text-moon-silver/85">
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))}
            className="h-4 w-4 rounded border-white/20 bg-white/[0.04] accent-mist-lavender"
          />
          Feature on homepage
        </label>

        {error && <p className="mt-4 text-sm text-mist-rose">{error}</p>}

        <div className="mt-6 flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-ethereal disabled:opacity-60">
            {saving ? "Saving…" : isEditing ? "Save changes" : "Add project"}
          </button>
          {isEditing && (
            <button type="button" onClick={resetDraft} className="btn-ghost">
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl text-moon-pearl">
            Projects ({projects.length})
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="glass halo rounded-2xl p-8 text-center text-moon-silver/80">
            No projects yet. Add the first one ✦
          </div>
        ) : (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.id} className="glass halo rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-display text-lg text-moon-pearl">
                        {p.title}
                      </h3>
                      {p.featured && (
                        <span className="rounded-full border border-moon-gold/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-moon-gold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-sm text-moon-silver/75">
                      {p.summary}
                    </p>
                    {p.tags && p.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-moon-silver/75"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => {
                        setDraft(toDraft(p));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-moon-silver hover:border-mist-lavender/50 hover:text-moon-pearl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-moon-silver hover:border-mist-rose/50 hover:text-mist-rose"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-moon-gold">
        {label}
      </label>
      {hint && <p className="mb-1 text-[11px] text-moon-silver/60">{hint}</p>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-moon-pearl outline-none transition focus:border-mist-lavender/50 focus:bg-white/[0.05]"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-moon-gold">
        {label}
      </label>
      {hint && <p className="mb-1 text-[11px] text-moon-silver/60">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-moon-pearl outline-none transition focus:border-mist-lavender/50 focus:bg-white/[0.05]"
      />
    </div>
  );
}
