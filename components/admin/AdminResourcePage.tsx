"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Plus, RefreshCcw, Search, Trash2 } from "lucide-react";
import { api } from "@/lib/api/client";
import { getAdminToken } from "@/lib/api/admin-auth";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox";
  required?: boolean;
};

type RecordValue = Record<string, unknown>;

export default function AdminResourcePage({
  title,
  description,
  endpoint,
  fields,
}: {
  title: string;
  description: string;
  endpoint: string;
  fields: Field[];
}) {
  const [records, setRecords] = useState<RecordValue[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await api.getAdminCollection<RecordValue>(endpoint, token);
      setRecords(data);
    } catch {
      setError("Unable to load records. Check API, database and permissions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function loadInitial() {
      const token = getAdminToken();
      if (!token) return;
      try {
        const data = await api.getAdminCollection<RecordValue>(endpoint, token);
        if (active) setRecords(data);
      } catch {
        if (active) {
          setError("Unable to load records. Check API, database and permissions.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadInitial();

    return () => {
      active = false;
    };
  }, [endpoint]);

  const filtered = useMemo(() => {
    const value = query.toLowerCase();
    return records.filter((record) =>
      JSON.stringify(record).toLowerCase().includes(value),
    );
  }, [query, records]);

  async function createRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    const formData = new FormData(event.currentTarget);
    const body: RecordValue = {};
    fields.forEach((field) => {
      if (field.type === "checkbox") {
        body[field.name] = formData.get(field.name) === "on";
      } else {
        const value = formData.get(field.name);
        if (value === "" && !field.required) return;
        body[field.name] = value;
      }
    });
    setSaving(true);
    try {
      await api.createAdminRecord(endpoint, token, body);
      event.currentTarget.reset();
      await load();
    } catch {
      setError("Unable to save record. Please verify the fields.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRecord(id: unknown) {
    const token = getAdminToken();
    if (!token || typeof id !== "string") return;
    if (!confirm("Archive this record?")) return;
    await api.deleteAdminRecord(`${endpoint}/${id}`, token).catch(() => {
      setError("Unable to archive record.");
    });
    await load();
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D2AD3D]">
            CMS
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#071D36]/60">
            {description}
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-md border border-[#071D36]/10 bg-white px-4 py-2 text-sm font-bold"
        >
          <RefreshCcw size={15} /> Refresh
        </button>
      </header>

      <section className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <form
          onSubmit={createRecord}
          className="rounded-lg border border-[#071D36]/10 bg-white p-5 shadow-sm"
        >
          <h2 className="font-serif text-xl font-semibold">Create</h2>
          <div className="mt-5 space-y-4">
            {fields.map((field) => (
              <label key={field.name} className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#071D36]/50">
                  {field.label}
                </span>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    className="mt-2 min-h-28 w-full rounded-md border border-[#071D36]/10 px-3 py-2 text-sm outline-none focus:border-[#D2AD3D]"
                  />
                ) : field.type === "checkbox" ? (
                  <input name={field.name} type="checkbox" className="mt-3 block" />
                ) : (
                  <input
                    name={field.name}
                    type={field.type || "text"}
                    required={field.required}
                    className="mt-2 h-11 w-full rounded-md border border-[#071D36]/10 px-3 text-sm outline-none focus:border-[#D2AD3D]"
                  />
                )}
              </label>
            ))}
          </div>
          <button
            disabled={saving}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#D2AD3D] px-4 py-3 text-sm font-black uppercase text-[#071D36]"
          >
            <Plus size={15} /> {saving ? "Saving..." : "Create record"}
          </button>
        </form>

        <section className="rounded-lg border border-[#071D36]/10 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-[#071D36]/10 p-4">
            <Search size={16} className="text-[#071D36]/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search records..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          {error && <p className="border-b border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          {loading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-16 animate-pulse rounded-md bg-[#F6F5F0]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-[#071D36]/50">
              No records found.
            </p>
          ) : (
            <div className="divide-y divide-[#071D36]/10">
              {filtered.map((record) => (
                <article key={String(record.id)} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                      {String(record.title || record.name || record.email || record.key || record.id)}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-[#071D36]/55">
                      {String(record.description || record.subject || record.role || record.slug || "")}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="rounded-md border border-red-100 p-2 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
