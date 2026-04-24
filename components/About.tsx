"use client";

import { motion } from "framer-motion";

const principles = [
  { k: "Calm systems", v: "Automation should feel like silence, not noise." },
  { k: "Measured magic", v: "Every agent earns its place with a clear ROI." },
  { k: "Your voice", v: "AI speaks the way you already speak — only faster." },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div
              className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 200deg, rgba(214,188,250,0.6), rgba(243,217,245,0.5), rgba(184,232,210,0.4), rgba(245,230,200,0.55), rgba(214,188,250,0.6))",
              }}
            />
            <div className="glass halo relative h-full w-full overflow-hidden rounded-[2rem]">
              {/* Portrait placeholder — swap with an <Image /> when ready */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, rgba(248,245,255,0.25), rgba(26,10,46,0) 60%), linear-gradient(180deg, rgba(214,188,250,0.15), rgba(10,1,24,0.6))",
                }}
              />
              <div className="absolute inset-0 flex items-end justify-center p-6">
                <span className="font-display text-2xl text-moon-silver/80">
                  Your portrait here
                </span>
              </div>
              {/* floating glyphs */}
              <span className="absolute left-6 top-6 animate-float-slow text-moon-gold/80">
                ✦
              </span>
              <span className="absolute right-8 top-16 animate-float-slow text-mist-lavender/80" style={{ animationDelay: "-4s" }}>
                ✧
              </span>
              <span className="absolute left-10 bottom-16 animate-float-slow text-mist-rose/80" style={{ animationDelay: "-8s" }}>
                ☾
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="eyebrow mb-4">About</p>
          <h2 className="section-heading mb-8">
            <span className="text-moon-pearl">A quiet</span>{" "}
            <span className="ethereal-text">architect</span>
            <br />
            <span className="text-moon-pearl">of automated systems.</span>
          </h2>
          <div className="space-y-5 text-moon-silver/85">
            <p>
              Hi, I&apos;m{" "}
              <span className="text-moon-pearl">Your Name</span>. I help
              founders, operators, and teams weave AI into the fabric of their
              business — not as a gimmick, but as a quiet co-pilot that always
              shows up.
            </p>
            <p>
              I&apos;ve shipped agents that triage inboxes at 3 a.m., pipelines
              that keep knowledge bases fresh, and assistants that speak in
              their company&apos;s exact voice. The work is equal parts
              engineering and taste.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {principles.map((p) => (
              <div key={p.k} className="glass rounded-xl p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-moon-gold">
                  {p.k}
                </div>
                <div className="mt-2 text-sm text-moon-silver/85">{p.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
