"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-20">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}

function LoginSkeleton() {
  return (
    <div className="glass halo w-full max-w-md animate-pulse rounded-2xl p-8">
      <div className="h-3 w-16 rounded bg-white/10" />
      <div className="mt-4 h-8 w-3/4 rounded bg-white/10" />
      <div className="mt-8 h-12 w-full rounded bg-white/5" />
      <div className="mt-6 h-11 w-full rounded-full bg-white/5" />
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Login failed");
      }
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass halo w-full max-w-md rounded-2xl p-8">
      <p className="eyebrow mb-3">Admin</p>
      <h1 className="font-display text-3xl text-moon-pearl">
        Whisper the password
      </h1>
      <p className="mt-2 text-sm text-moon-silver/80">
        Only for you. One password unlocks the portfolio editor.
      </p>

      <label className="mt-8 block text-xs uppercase tracking-[0.2em] text-moon-gold">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-moon-pearl outline-none transition focus:border-mist-lavender/50 focus:bg-white/[0.05]"
        autoFocus
        required
      />

      {error && <p className="mt-3 text-sm text-mist-rose">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-ethereal mt-6 w-full disabled:opacity-60"
      >
        {loading ? "Unlocking…" : "Enter ✦"}
      </button>
    </form>
  );
}
