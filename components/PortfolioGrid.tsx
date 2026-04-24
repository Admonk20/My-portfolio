"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import GlassCard from "./GlassCard";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <motion.button
            key={p.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
            }}
            onClick={() => setActive(p)}
            className="group text-left"
          >
            <GlassCard interactive className="h-full overflow-hidden !p-0">
              <div
                className="relative h-44 w-full overflow-hidden"
                style={{
                  background:
                    p.cover_url
                      ? `url(${p.cover_url}) center/cover`
                      : "linear-gradient(135deg, rgba(214,188,250,0.25), rgba(184,232,210,0.15), rgba(245,230,200,0.2))",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                {p.featured && (
                  <span className="absolute left-4 top-4 rounded-full border border-moon-gold/60 bg-ink-950/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-moon-gold backdrop-blur-md">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-display text-2xl text-moon-pearl">
                  {p.title}
                </h3>
                <p className="mb-4 text-sm text-moon-silver/80 line-clamp-3">
                  {p.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-moon-silver/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="glass-strong halo max-h-[85vh] w-full max-w-3xl overflow-auto rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative h-60 w-full"
                style={{
                  background:
                    active.cover_url
                      ? `url(${active.cover_url}) center/cover`
                      : "linear-gradient(135deg, rgba(214,188,250,0.35), rgba(184,232,210,0.2), rgba(245,230,200,0.25))",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-950/85" />
                <button
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink-950/40 px-3 py-1 text-sm text-moon-silver backdrop-blur-md hover:text-moon-pearl"
                >
                  Close ✕
                </button>
              </div>
              <div className="p-8">
                <h3 className="font-display text-4xl text-moon-pearl">
                  {active.title}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-moon-gold">
                  {active.summary}
                </p>
                {active.description && (
                  <p className="mt-6 whitespace-pre-line leading-relaxed text-moon-silver/85">
                    {active.description}
                  </p>
                )}
                {active.tags && active.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-moon-silver/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {active.live_url && (
                  <a
                    href={active.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ethereal mt-8"
                  >
                    Visit project <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
