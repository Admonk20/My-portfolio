"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-6 pt-28 text-center"
    >
      {/* Floating moon */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="pointer-events-none absolute right-[8%] top-[18%] hidden md:block"
      >
        <div className="animate-float-slow relative h-40 w-40">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #f8f5ff 0%, #d6d3e3 30%, #d6bcfa 55%, rgba(26,10,46,0) 75%)",
              boxShadow:
                "0 0 60px rgba(245,230,200,0.4), 0 0 120px rgba(214,188,250,0.25)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle at 70% 75%, rgba(10,1,24,0.9) 0%, rgba(10,1,24,0) 45%)",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="eyebrow mb-6"
      >
        AI Automation · End-to-end
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1 }}
        className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
      >
        <span className="ethereal-text">Automation,</span>
        <br />
        <span className="text-moon-pearl">Reimagined.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 1 }}
        className="mt-8 max-w-2xl text-lg leading-relaxed text-moon-silver/85 sm:text-xl"
      >
        I craft AI systems that feel like magic — agents, flows, and
        integrations that quietly run your business while you sleep.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 1 }}
        className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a href="#services" className="btn-ethereal">
          Explore services
          <span aria-hidden>→</span>
        </a>
        <a href="#contact" className="btn-ghost">
          Book a discovery call
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-moon-silver/50"
      >
        <span className="inline-block animate-float-slow">scroll ↓</span>
      </motion.div>
    </section>
  );
}
