"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api/client";
import { getAdminToken } from "@/lib/api/admin-auth";
import type { ApiRealisation } from "@/lib/api/types";
import { defaultRealisations, realisationFilters, sortRealisations } from "@/lib/realisations-default";

type Field = { name: string; label: string; type?: "text" | "textarea" | "number" | "checkbox" | "array" | "date" };
type RecordValue = Record<string, unknown>;

const fields: Field[] = [
  { name: "title", label: "Titre" },
  { name: "slug", label: "Slug" },
  { name: "category", label: "Catégorie ID" },
  { name: "categoryLabel", label: "Catégorie affichée" },
  { name: "year", label: "Année", type: "number" },
  { name: "client", label: "Client" },
  { name: "location", label: "Localisation" },
  { name: "completionDate", label: "Date d'achèvement", type: "date" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "imageUrl", label: "Image de couverture URL" },
  { name: "gallery", label: "Galerie URLs", type: "array" },
  { name: "surface", label: "Surface / distance / durée" },
  { name: "surfaceValue", label: "Valeur numérique tri surface", type: "number" },
  { name: "levels", label: "Niveaux" },
  { name: "budget", label: "Budget" },
  { name: "result", label: "Résultat / award" },
  { name: "color", label: "Couleur placeholder" },
  { name: "servicesUsed", label: "Services utilisés", type: "array" },
  { name: "technicalTags", label: "Tags techniques", type: "array" },
  { name: "features", label: "Features modal", type: "array" },
  { name: "displayOrder", label: "Ordre d'affichage", type: "number" },
  { name: "published", label: "Publié", type: "checkbox" },
  { name: "featured", label: "Mis en avant", type: "checkbox" },
  { name: "metaTitle", label: "SEO title" },
  { name: "metaDescription", label: "SEO description", type: "textarea" },
];

function clone(realisation: ApiRealisation) {
  return JSON.parse(JSON.stringify(realisation)) as ApiRealisation;
}

function stripIds(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripIds);
  if (!value || typeof value !== "object") return value;
  const next: RecordValue = {};
  Object.entries(value as RecordValue).forEach(([key, item]) => {
    if (key === "id" || key === "createdAt" || key === "updatedAt" || key === "deletedAt") return;
    next[key] = stripIds(item);
  });
  return next;
}

function toDateInput(value: unknown) {
  return value ? String(value).slice(0, 10) : "";
}

export default function AdminRealisationsEditor() {
  const [items, setItems] = useState<ApiRealisation[]>([]);
  const [editing, setEditing] = useState<ApiRealisation | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const filtered = useMemo(() => {
    const search = query.toLowerCase();
    return sortRealisations(items).filter((item) => {
      const matchesSearch = JSON.stringify(item).toLowerCase().includes(search);
      const matchesCategory = category === "all" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, items, query]);

  async function load() {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await api.getAdminRealisations(token);
      setItems(data);
      setEditing((current) => {
        if (!current) return data[0] ? clone(data[0]) : null;
        const updated = data.find((item) => item.id === current.id);
        return updated ? clone(updated) : current;
      });
    } catch {
      setError("Impossible de charger les réalisations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function createFromDefault() {
    const source = defaultRealisations[0];
    setEditing({
      ...clone(source),
      id: "",
      title: "Nouvelle réalisation",
      slug: `nouvelle-realisation-${Date.now()}`,
      published: false,
      featured: false,
      displayOrder: items.length + 1,
    });
  }

  function updateField(field: Field, value: unknown) {
    setEditing((current) => current ? { ...current, [field.name]: value } : current);
  }

  function updateMetric(index: number, key: "label" | "value" | "displayOrder", value: unknown) {
    setEditing((current) => {
      if (!current) return current;
      const metrics = [...(current.metrics || [])];
      metrics[index] = { ...metrics[index], [key]: value };
      return { ...current, metrics };
    });
  }

  function addMetric() {
    setEditing((current) => {
      if (!current) return current;
      const metrics = [...(current.metrics || [])];
      return { ...current, metrics: [...metrics, { label: "Info", value: "Valeur", displayOrder: metrics.length + 1 }] };
    });
  }

  function removeMetric(index: number) {
    setEditing((current) => current ? { ...current, metrics: (current.metrics || []).filter((_, itemIndex) => itemIndex !== index) } : current);
  }

  async function uploadCover(file: File | null) {
    const token = getAdminToken();
    if (!token || !file || !editing) return;
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "realisations");
      const uploaded = await api.uploadImage(token, formData);
      setEditing({ ...editing, imageUrl: uploaded.imageUrl });
    } catch {
      setError("Impossible d'importer l'image.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadGallery(files: FileList | null) {
    const token = getAdminToken();
    if (!token || !files?.length || !editing) return;
    setSaving(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("folder", "realisations");
        const uploaded = await api.uploadImage(token, formData);
        urls.push(uploaded.imageUrl);
      }
      setEditing({ ...editing, gallery: [...(editing.gallery || []), ...urls] });
    } catch {
      setError("Impossible d'importer la galerie.");
    } finally {
      setSaving(false);
    }
  }

  async function save() {
    const token = getAdminToken();
    if (!token || !editing) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = stripIds(editing);
      if (editing.id && !editing.id.startsWith("fallback-")) {
        await api.updateAdminRecord(`/realisations/${editing.id}`, token, payload);
      } else {
        await api.createAdminRecord("/realisations", token, payload);
      }
      setSuccess("Réalisation enregistrée.");
      await load();
    } catch {
      setError("Impossible d'enregistrer. Vérifiez le slug, les champs et la base de données.");
    } finally {
      setSaving(false);
    }
  }

  async function archiveItem() {
    const token = getAdminToken();
    if (!token || !editing?.id || editing.id.startsWith("fallback-")) return;
    if (!confirm("Archiver cette réalisation ?")) return;
    try {
      await api.deleteAdminRecord(`/realisations/${editing.id}`, token);
      setEditing(null);
      await load();
    } catch {
      setError("Impossible d'archiver cette réalisation.");
    }
  }

  if (loading) return <div className="empty-state">Chargement des réalisations...</div>;

  return (
    <div className="panel show">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        <div>
          <div className="table-title">Réalisations CMS</div>
          <div className="td-ref">Portfolio livré, distinct des projets et biens immobiliers.</div>
        </div>
        <div className="table-actions">
          <input className="form-control" style={{ width: 180 }} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher..." />
          <select className="btn-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
            {realisationFilters.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
          <button className="btn-sm" onClick={load}><i className="ti ti-refresh" /> Actualiser</button>
          <button className="btn-sm gold" onClick={createFromDefault}><i className="ti ti-plus" /> Nouvelle réalisation</button>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">{success}</div>}

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div className="table-card">
          <div className="table-header"><div className="table-title">Liste</div><div className="td-ref">{filtered.length} éléments</div></div>
          {filtered.length === 0 ? <div className="empty-state">Aucune réalisation.</div> : (
            <div style={{ padding: ".5rem" }}>
              {filtered.map((item) => (
                <button
                  key={item.id || item.slug}
                  className="contact-item"
                  style={{ width: "100%", border: 0, textAlign: "left", cursor: "pointer" }}
                  type="button"
                  onClick={() => setEditing(clone(item))}
                >
                  <div className="contact-avatar">{String(item.categoryLabel || item.title).slice(0, 2)}</div>
                  <div><div className="contact-name">{item.title}</div><div className="contact-service">{item.categoryLabel || item.category} · {item.location || "Cameroun"}</div></div>
                  <span className={`badge ${item.published ? "badge-green" : "badge-amber"}`}>{item.published ? "Publié" : "Brouillon"}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {!editing ? <div className="empty-state">Sélectionnez ou créez une réalisation.</div> : (
            <div className="table-card" style={{ padding: "1.25rem" }}>
              <div className="table-header">
                <div className="table-title">{editing.id ? "Modifier" : "Créer"} une réalisation</div>
                <div className="table-actions">
                  {editing.id && !editing.id.startsWith("fallback-") && <button className="btn-sm" onClick={archiveItem}><i className="ti ti-trash" /> Archiver</button>}
                  <button className="btn-sm gold" disabled={saving} onClick={save}><i className="ti ti-device-floppy" /> {saving ? "Enregistrement..." : "Enregistrer"}</button>
                </div>
              </div>
              <div className="form-grid">
                {fields.map((field) => (
                  <div className="form-group" key={field.name}>
                    <label>{field.label}</label>
                    <AdminInput field={field} value={(editing as unknown as RecordValue)[field.name]} onChange={(value) => updateField(field, value)} />
                  </div>
                ))}
                <div className="form-group">
                  <label>Uploader couverture</label>
                  <input className="form-control" type="file" accept="image/*" onChange={(event) => uploadCover(event.currentTarget.files?.[0] || null)} />
                </div>
                <div className="form-group">
                  <label>Uploader galerie</label>
                  <input className="form-control" type="file" accept="image/*" multiple onChange={(event) => uploadGallery(event.currentTarget.files)} />
                </div>
              </div>

              <div className="table-header"><div className="table-title">Métriques de carte</div><button className="btn-sm" onClick={addMetric}><i className="ti ti-plus" /> Ajouter</button></div>
              <div style={{ display: "grid", gap: 10 }}>
                {(editing.metrics || []).map((metric, index) => (
                  <div className="form-grid" key={`${metric.label}-${index}`}>
                    <div className="form-group"><label>Label</label><input className="form-control" value={metric.label} onChange={(event) => updateMetric(index, "label", event.target.value)} /></div>
                    <div className="form-group"><label>Valeur</label><input className="form-control" value={metric.value} onChange={(event) => updateMetric(index, "value", event.target.value)} /></div>
                    <div className="form-group"><label>Ordre</label><input className="form-control" type="number" value={metric.displayOrder ?? 0} onChange={(event) => updateMetric(index, "displayOrder", Number(event.target.value))} /></div>
                    <div className="form-group"><label>Action</label><button className="btn-sm" onClick={() => removeMetric(index)}><i className="ti ti-trash" /> Retirer</button></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (value: unknown) => void }) {
  if (field.type === "textarea") return <textarea className="form-control" value={String(value ?? "")} onChange={(event) => onChange(event.target.value)} />;
  if (field.type === "checkbox") {
    return <button type="button" className={`toggle-switch ${value ? "on" : ""}`} onClick={() => onChange(!value)}><div className="toggle-knob" /></button>;
  }
  if (field.type === "array") {
    return <input className="form-control" value={Array.isArray(value) ? value.join(", ") : String(value ?? "")} onChange={(event) => onChange(event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />;
  }
  if (field.type === "date") {
    return <input className="form-control" type="date" value={toDateInput(value)} onChange={(event) => onChange(event.target.value)} />;
  }
  return <input className="form-control" type={field.type === "number" ? "number" : "text"} value={String(value ?? "")} onChange={(event) => onChange(field.type === "number" ? Number(event.target.value) : event.target.value)} />;
}
