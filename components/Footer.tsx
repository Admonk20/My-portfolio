export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-14 pt-4">
      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-mist-lavender/30 to-transparent" />
      <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-moon-silver/60 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Lumen · Crafted quietly in the small
          hours.
        </p>
        <p className="font-display tracking-wide">
          ✦ Made with moonlight and Next.js ✦
        </p>
      </div>
    </footer>
  );
}
