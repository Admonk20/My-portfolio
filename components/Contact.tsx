"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com";
const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || "";
const socials = [
  { label: "X", url: process.env.NEXT_PUBLIC_SOCIAL_X },
  { label: "LinkedIn", url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN },
  { label: "GitHub", url: process.env.NEXT_PUBLIC_SOCIAL_GITHUB },
].filter((s): s is { label: string; url: string } => Boolean(s.url));

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something drifted off course.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-4">Let&apos;s talk</p>
        <h2 className="section-heading">
          <span className="text-moon-pearl">Send a signal</span>{" "}
          <span className="ethereal-text">into the dark.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-moon-silver/80">
          Tell me what you&apos;re trying to automate. I reply within a day,
          often with a sketch of how the system could work.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass halo rounded-2xl p-8 lg:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-moon-gold">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="What would you love to automate?"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-moon-pearl outline-none ring-0 transition focus:border-mist-lavender/50 focus:bg-white/[0.05]"
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-ethereal disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
              {status !== "sending" && <span aria-hidden>→</span>}
            </button>
            <a href={`mailto:${email}`} className="btn-ghost">
              or email directly
            </a>
          </div>

          {status === "sent" && (
            <p className="mt-4 text-sm text-mist-mint">
              Received. The signal&apos;s traveling ✦
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-mist-rose">
              {error ?? "Something went wrong. Try the mailto link?"}
            </p>
          )}
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="space-y-6 lg:col-span-2"
        >
          {calendly && (
            <div className="glass halo overflow-hidden rounded-2xl">
              <div className="border-b border-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-moon-gold">
                  Book a discovery call
                </p>
                <p className="mt-2 text-sm text-moon-silver/80">
                  30 minutes, free, no pitch. We figure out if this is real.
                </p>
              </div>
              <iframe
                src={calendly}
                title="Book a call"
                className="h-80 w-full bg-transparent"
                style={{ colorScheme: "normal" }}
              />
            </div>
          )}

          <div className="glass halo rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-moon-gold">
              Elsewhere
            </p>
            <div className="mt-4 space-y-3 text-moon-silver/85">
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-between rounded-lg border border-white/5 px-4 py-3 transition hover:border-mist-lavender/40 hover:text-moon-pearl"
              >
                <span>{email}</span>
                <span aria-hidden>✉</span>
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-white/5 px-4 py-3 transition hover:border-mist-lavender/40 hover:text-moon-pearl"
                >
                  <span>{s.label}</span>
                  <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-moon-gold">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-moon-pearl outline-none transition focus:border-mist-lavender/50 focus:bg-white/[0.05]"
      />
    </div>
  );
}
