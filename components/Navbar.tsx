"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-ink-950/50 border-b border-white/5" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2">
          <span className="relative inline-block h-6 w-6">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-mist-lavender to-moon-gold opacity-80 blur-[6px]" />
            <span className="absolute inset-[3px] rounded-full bg-ink-900" />
            <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-mist-rose/60 via-transparent to-transparent" />
          </span>
          <span className="font-display text-xl tracking-wide text-moon-pearl">
            Lumen<span className="text-moon-gold">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-moon-silver/80 transition-colors hover:text-moon-pearl"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-ethereal !px-5 !py-2 text-sm">
            Book a call
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-full border border-white/10 p-2 text-moon-silver"
        >
          <span className="block h-4 w-5">
            <span
              className={`block h-px w-5 bg-current transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`mt-[6px] block h-px w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`mt-[6px] block h-px w-5 bg-current transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-ink-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-moon-silver"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
