import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifySessionEdge } from "@/lib/authEdge";
import { SESSION_COOKIE } from "@/lib/authConstants";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const ok = await verifySessionEdge(token);
  if (!ok) redirect("/admin/login");

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-display text-xl text-moon-pearl">
            Lumen<span className="text-moon-gold">.</span>{" "}
            <span className="text-sm tracking-[0.25em] uppercase text-moon-silver/60">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-moon-silver/80 hover:text-moon-pearl">
              View site ↗
            </Link>
            <form action="/api/auth/logout" method="post">
              <button className="rounded-full border border-white/10 px-4 py-1.5 text-moon-silver/80 transition hover:border-mist-rose/40 hover:text-moon-pearl">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
