"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

type Service = {
  title: string;
  body: string;
  glyph: string;
};

const services: Service[] = [
  {
    title: "Workflow Automation",
    body: "Custom flows across n8n, Make, and Zapier that stitch your tools into a single, self-running system.",
    glyph: "◈",
  },
  {
    title: "AI Agents",
    body: "Autonomous agents for research, support, and operations — trained on your voice, your data, your rules.",
    glyph: "✦",
  },
  {
    title: "Custom Chatbots & Assistants",
    body: "On-brand GPTs embedded in your site, Slack, or WhatsApp — fluent in your product and playbook.",
    glyph: "☾",
  },
  {
    title: "RAG & Knowledge Pipelines",
    body: "Turn scattered docs, PDFs, and notes into a living knowledge base your AI can reason over in seconds.",
    glyph: "❋",
  },
  {
    title: "API Integrations",
    body: "Glue your stack together — CRMs, billing, analytics, inbox — with resilient, observable pipes.",
    glyph: "✧",
  },
  {
    title: "Training & Consulting",
    body: "Hands-on enablement for your team: prompt craft, tool selection, and the architecture behind real systems.",
    glyph: "✺",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-4">What I offer</p>
        <h2 className="section-heading">
          <span className="ethereal-text">Every detail</span>{" "}
          <span className="text-moon-pearl">of AI automation.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-moon-silver/80">
          From a single agent to an end-to-end operating system — I design,
          build, and ship automation that stays quiet, fast, and luminous.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => (
          <motion.div key={s.title} variants={item}>
            <GlassCard interactive className="h-full">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-moon-gold/40 text-2xl text-moon-gold">
                {s.glyph}
              </div>
              <h3 className="mb-3 font-display text-2xl text-moon-pearl">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-moon-silver/80">
                {s.body}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
