"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api/client";
import { getAdminToken, getAdminUser } from "@/lib/api/admin-auth";

export type AdminField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select" | "date" | "array" | "image";
  required?: boolean;
  options?: string[];
};

type RecordValue = Record<string, unknown>;

function toTitle(value: RecordValue) {
  return String(value.title || value.name || value.email || value.key || value.fileName || value.id || "Sans titre");
}

function toSubtitle(value: RecordValue) {
  return String(value.description || value.subject || value.location || value.category || value.slug || value.role || value.publicId || "");
}

function formatDate(value: unknown) {
  if (!value) return "";
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("fr-FR");
}

function badgeClass(value: unknown) {
  const text = String(value || "").toUpperCase();
  if (text.includes("PUBLISHED") || text.includes("AVAILABLE") || text.includes("READ") || text === "TRUE") return "badge-green";
  if (text.includes("DRAFT") || text.includes("UNREAD") || text.includes("PENDING")) return "badge-amber";
  if (text.includes("ARCHIVED") || text.includes("DISABLED") || text === "FALSE") return "badge-gray";
  return "badge-blue";
}

function buildBody(form: HTMLFormElement, fields: AdminField[]) {
  const formData = new FormData(form);
  const body: RecordValue = {};
  fields.forEach((field) => {
    if (field.type === "checkbox") {
      body[field.name] = formData.get(field.name) === "on";
      return;
    }
    const raw = formData.get(field.name);
    if ((raw === "" || raw === null) && !field.required) return;
    if (field.type === "number") {
      body[field.name] = Number(raw);
      return;
    }
    if (field.type === "array") {
      body[field.name] = String(raw || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      return;
    }
    body[field.name] = raw;
  });
  return body;
}

function fieldDefault(record: RecordValue | null, field: AdminField) {
  const value = record?.[field.name];
  if (Array.isArray(value)) return value.join(", ");
  if (field.type === "date" && value) return String(value).slice(0, 10);
  if (typeof value === "boolean") return value;
  return value == null ? "" : String(value);
}

function AdminForm({
  fields,
  record,
  saving,
  onSubmit,
  onCancel,
}: {
  fields: AdminField[];
  record: RecordValue | null;
  saving: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        {fields.map((field) => {
          const value = fieldDefault(record, field);
          return (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea name={field.name} className="form-control" required={field.required} defaultValue={String(value)} />
              ) : field.type === "checkbox" ? (
                <button
                  type="button"
                  className={`toggle-switch ${value ? "on" : ""}`}
                  onClick={(event) => {
                    const input = event.currentTarget.nextElementSibling as HTMLInputElement | null;
                    if (input) input.checked = !input.checked;
                    event.currentTarget.classList.toggle("on");
                  }}
                >
                  <div className="toggle-knob" />
                </button>
              ) : field.type === "select" ? (
                <select name={field.name} className="form-control" required={field.required} defaultValue={String(value)}>
                  <option value="">Sélectionner</option>
                  {(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                  className="form-control"
                  required={field.required}
                  defaultValue={typeof value === "boolean" ? "" : String(value)}
                />
              )}
              {field.type === "checkbox" && (
                <input name={field.name} type="checkbox" defaultChecked={Boolean(value)} hidden />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" }}>
        {onCancel && <button type="button" className="btn-sm" onClick={onCancel}>Annuler</button>}
        <button type="submit" className="btn-sm gold" disabled={saving}>
          <i className="ti ti-device-floppy" aria-hidden="true" />
          {saving ? "Enregistrement..." : record ? "Mettre à jour" : "Publier"}
        </button>
      </div>
    </form>
  );
}

export default function AdminResourcePage({
  title,
  description,
  endpoint,
  fields,
  listLabel = "Liste",
  createLabel = "Ajouter",
}: {
  title: string;
  description: string;
  endpoint: string;
  fields: AdminField[];
  listLabel?: string;
  createLabel?: string;
}) {
  const [records, setRecords] = useState<RecordValue[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<"list" | "create">("list");
  const [editing, setEditing] = useState<RecordValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const currentUser = typeof window !== "undefined" ? getAdminUser() : null;
  const pageSize = 8;

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await api.getAdminCollection<RecordValue>(endpoint, token);
      setRecords(Array.isArray(data) ? data : []);
    } catch {
      setError("Impossible de charger les enregistrements. Vérifiez l'API, la base de données et les permissions.");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    const timer = window.setTimeout(() => setPage(1), 0);
    return () => window.clearTimeout(timer);
  }, [endpoint]);

  const filtered = useMemo(() => {
    const value = query.toLowerCase();
    return records.filter((record) => {
      const matchesText = JSON.stringify(record).toLowerCase().includes(value);
      const rawStatus = String(record.status || record.published || record.active || "").toLowerCase();
      const matchesStatus = status === "all" || rawStatus.includes(status.toLowerCase());
      return matchesText && matchesStatus;
    });
  }, [query, records, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function createRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    const body = buildBody(event.currentTarget, fields);
    if (endpoint === "/auth/users" && currentUser?.role === "ADMIN" && body.role === "SUPER_ADMIN") {
      setError("Un Admin ne peut pas créer un Super Admin.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await api.createAdminRecord(endpoint, token, body);
      event.currentTarget.reset();
      setTab("list");
      await load();
    } catch {
      setError("Impossible d'enregistrer. Vérifiez les champs et permissions.");
    } finally {
      setSaving(false);
    }
  }

  async function updateRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getAdminToken();
    if (!token || !editing?.id) return;
    const body = buildBody(event.currentTarget, fields);
    setSaving(true);
    setError("");
    try {
      await api.updateAdminRecord(`${endpoint}/${editing.id}`, token, body);
      setEditing(null);
      await load();
    } catch {
      setError("Impossible de mettre à jour cet enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRecord(id: unknown) {
    const token = getAdminToken();
    if (!token || typeof id !== "string") return;
    if (!confirm("Supprimer ou archiver cet enregistrement ?")) return;
    try {
      await api.deleteAdminRecord(`${endpoint}/${id}`, token);
      await load();
    } catch {
      setError("Impossible de supprimer ou archiver cet enregistrement.");
    }
  }

  async function togglePublished(record: RecordValue) {
    const token = getAdminToken();
    if (!token || typeof record.id !== "string") return;
    const next = !Boolean(record.published ?? record.active);
    const key = "active" in record ? "active" : "published";
    try {
      await api.updateAdminRecord(`${endpoint}/${record.id}`, token, { [key]: next });
      await load();
    } catch {
      setError("Impossible de modifier le statut de publication.");
    }
  }

  async function exportContacts() {
    const token = getAdminToken();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    if (!token) return;
    try {
      const response = await fetch(`${apiUrl}/contacts/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "perfect-immo-contacts.csv";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Impossible d'exporter les contacts.");
    }
  }

  async function uploadMedia(files: FileList | null) {
    const token = getAdminToken();
    if (!token || !files?.length) return;
    setSaving(true);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("folder", "media");
        const uploaded = await api.uploadImage(token, formData);
        await api.createAdminRecord("/admin/media", token, {
          url: uploaded.imageUrl,
          publicId: uploaded.publicId,
          folder: "media",
          fileName: file.name,
          mimeType: file.type,
          size: file.size,
        });
      }
      await load();
    } catch {
      setError("Impossible d'importer les fichiers médias.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="panel show">
      <div className="page-tabs">
        <button className={`ptab ${tab === "list" ? "at" : ""}`} onClick={() => setTab("list")}>{listLabel}</button>
        <button className={`ptab ${tab === "create" ? "at" : ""}`} onClick={() => setTab("create")}>{createLabel}</button>
      </div>

      {tab === "list" ? (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", gap: 10, flexWrap: "wrap" }}>
            <div>
              <div className="table-title">{title}</div>
              <div className="td-ref">{description}</div>
            </div>
            <div className="table-actions">
              <input className="form-control" style={{ width: 190 }} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher..." />
              <select className="btn-sm" style={{ padding: "5px 8px" }} value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="all">Tous statuts</option>
                <option value="published">Publiés</option>
                <option value="draft">Brouillons</option>
                <option value="available">Disponibles</option>
                <option value="unread">Nouveaux</option>
              </select>
              <button className="btn-sm" onClick={load}><i className="ti ti-refresh" /> Actualiser</button>
              {endpoint === "/contacts" && (
                <button className="btn-sm" onClick={exportContacts}><i className="ti ti-download" /> Exporter CSV</button>
              )}
              {endpoint === "/admin/media" && (
                <label className="btn-sm gold">
                  <i className="ti ti-upload" /> Importer des fichiers
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(event) => uploadMedia(event.currentTarget.files)}
                  />
                </label>
              )}
              <button className="btn-sm gold" onClick={() => setTab("create")}><i className="ti ti-plus" /> Ajouter</button>
            </div>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div className="table-title">Tous les enregistrements</div>
              <div className="td-ref">Affichage {visible.length} sur {filtered.length}</div>
            </div>
            {error && <div className="admin-error">{error}</div>}
            {loading ? (
              <div className="empty-state">Chargement...</div>
            ) : visible.length === 0 ? (
              <div className="empty-state">Aucun enregistrement trouvé.</div>
            ) : (
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Référence</th><th>Contenu</th><th>Catégorie</th><th>Date</th><th>Statut</th><th>Publié</th><th style={{ width: 100 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((record) => (
                      <tr key={String(record.id)}>
                        <td><div className="td-ref">{String(record.slug || record.publicId || record.id).slice(0, 18)}</div></td>
                        <td><div className="td-name">{toTitle(record)}</div><div className="td-ref">{toSubtitle(record)}</div></td>
                        <td>{String(record.category || record.role || record.folder || record.location || "CMS")}</td>
                        <td>{formatDate(record.createdAt)}</td>
                        <td><span className={`badge ${badgeClass(record.status || record.replyStatus || record.active || record.published)}`}>{String(record.status || record.replyStatus || (record.active === false ? "Disabled" : record.published ? "Published" : "Draft"))}</span></td>
                        <td>
                          {"published" in record || "active" in record ? (
                            <button type="button" className={`toggle-switch ${Boolean(record.published ?? record.active) ? "on" : ""}`} onClick={() => togglePublished(record)}>
                              <div className="toggle-knob" />
                            </button>
                          ) : <span className="td-ref">—</span>}
                        </td>
                        <td>
                          <div className="td-actions">
                            <button className="icon-btn" onClick={() => setEditing(record)} title="Modifier"><i className="ti ti-edit" /></button>
                            <button className="icon-btn danger" onClick={() => deleteRecord(record.id)} title="Supprimer"><i className="ti ti-trash" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button className="btn-sm" disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Précédent</button>
            <button className="btn-sm" disabled>Page {page} / {pageCount}</button>
            <button className="btn-sm" disabled={page >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>Suivant</button>
          </div>
        </div>
      ) : (
        <div className="table-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", marginBottom: "1rem", paddingBottom: ".75rem", borderBottom: ".5px solid var(--border)" }}>
            {createLabel}
          </div>
          {error && <div className="admin-error" style={{ marginBottom: 12 }}>{error}</div>}
          <AdminForm fields={fields} record={null} saving={saving} onSubmit={createRecord} onCancel={() => setTab("list")} />
        </div>
      )}

      {editing && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-head">
              <div className="table-title">Modifier - {toTitle(editing)}</div>
              <button className="icon-btn" onClick={() => setEditing(null)}><i className="ti ti-x" /></button>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <AdminForm fields={fields} record={editing} saving={saving} onSubmit={updateRecord} onCancel={() => setEditing(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
