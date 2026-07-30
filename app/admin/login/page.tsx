"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { api } from "@/lib/api/client";
import { saveAdminSession } from "@/lib/api/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await api.login({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      });
      saveAdminSession(result.token, result.user);
      router.replace("/admin/dashboard");
    } catch {
      setError("Invalid credentials or inactive account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#071D36] px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-lg border border-white/10 bg-white p-8 shadow-2xl"
      >
        <span className="flex h-12 w-12 items-center justify-center border border-[#D2AD3D] text-sm font-bold text-[#D2AD3D]">
          PI
        </span>
        <h1 className="mt-6 font-serif text-3xl font-semibold text-[#071D36]">
          Admin login
        </h1>
        <p className="mt-2 text-sm text-[#071D36]/60">
          Connectez-vous pour gérer le contenu du site.
        </p>
        <label className="mt-6 block">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#071D36]/50">
            Email
          </span>
          <div className="mt-2 flex h-12 items-center gap-2 rounded-md border border-[#071D36]/10 px-3">
            <Mail size={16} className="text-[#071D36]/40" />
            <input
              name="email"
              type="email"
              required
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </label>
        <label className="mt-4 block">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#071D36]/50">
            Password
          </span>
          <div className="mt-2 flex h-12 items-center gap-2 rounded-md border border-[#071D36]/10 px-3">
            <Lock size={16} className="text-[#071D36]/40" />
            <input
              name="password"
              type="password"
              required
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </label>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="mt-6 h-12 w-full rounded-md bg-[#D2AD3D] text-sm font-black uppercase text-[#071D36]"
        >
          {loading ? "Connexion..." : "Login"}
        </button>
      </form>
    </main>
  );
}
