"use client";

import { useEffect, useState } from "react";
import { Activity, FileText, Home, Mail, Newspaper } from "lucide-react";
import { api } from "@/lib/api/client";
import { getAdminToken } from "@/lib/api/admin-auth";
import type { AdminDashboard } from "@/lib/api/types";

const widgetIcons = [Activity, Home, Newspaper, Mail, FileText];

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    api
      .getAdminDashboard(token)
      .then(setData)
      .catch(() => setError("Unable to load dashboard analytics."));
  }, []);

  const widgets = data
    ? [
        ["Total Projects", data.widgets.totalProjects],
        ["Total Properties", data.widgets.totalProperties],
        ["Blog Posts", data.widgets.totalBlogs],
        ["Messages", data.widgets.totalMessages],
        ["Website Visitors", data.widgets.websiteVisitors],
      ]
    : [];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D2AD3D]">
          Overview
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-[#071D36]/60">
          Analytics, recent activity and content health.
        </p>
      </header>

      {error && <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {(data ? widgets : Array.from({ length: 5 }).map((_, i) => [`Loading`, i])).map(
          ([label, value], index) => {
            const Icon = widgetIcons[index] || Activity;
            return (
              <article key={String(label)} className="rounded-lg border border-[#071D36]/10 bg-white p-5 shadow-sm">
                <Icon size={18} className="text-[#D2AD3D]" />
                <strong className="mt-5 block text-3xl">{value}</strong>
                <span className="text-sm text-[#071D36]/55">{label}</span>
              </article>
            );
          },
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {[
          ["Recent Contacts", data?.recentContacts],
          ["Recent Projects", data?.recentProjects],
          ["Recent Blog Posts", data?.recentBlogs],
        ].map(([title, items]) => (
          <article key={String(title)} className="rounded-lg border border-[#071D36]/10 bg-white p-5 shadow-sm">
            <h2 className="font-serif text-xl font-semibold">{String(title)}</h2>
            <div className="mt-4 space-y-3">
              {Array.isArray(items) && items.length ? (
                items.map((item) => (
                  <div key={String(item.id)} className="rounded-md bg-[#F6F5F0] p-3">
                    <strong className="block text-sm">
                      {String(item.title || item.name || item.email || item.id)}
                    </strong>
                    <span className="text-xs text-[#071D36]/55">
                      {String(item.createdAt || "")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#071D36]/50">No data yet.</p>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-[#071D36]/10 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-xl font-semibold">Charts</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="h-56 rounded-md bg-[#F6F5F0] p-4 text-sm text-[#071D36]/55">
            Projects created per month
          </div>
          <div className="h-56 rounded-md bg-[#F6F5F0] p-4 text-sm text-[#071D36]/55">
            Contact requests per month
          </div>
        </div>
      </section>
    </div>
  );
}
