"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api/client";
import { getAdminToken } from "@/lib/api/admin-auth";
import type { ApiService, ServicePageSettings } from "@/lib/api/types";
import { defaultServices, servicePageDefaults, sortByDisplayOrder } from "@/lib/services-default";

type RecordValue = Record<string, unknown>;
type Field = { name: string; label: string; type?: "text" | "textarea" | "number" | "checkbox" | "array" };
type Collection = { key: keyof ApiService; title: string; fields: Field[]; factory: () => RecordValue };

const baseFields: Field[] = [
  { name: "tabId", label: "ID onglet" },
  { name: "tabLabel", label: "Libellé onglet" },
  { name: "icon", label: "Icône" },
  { name: "category", label: "Catégorie" },
  { name: "title", label: "Titre" },
  { name: "slug", label: "Slug" },
  { name: "eyebrow", label: "Eyebrow / sous-titre" },
  { name: "description", label: "Description courte", type: "textarea" },
  { name: "longDescription", label: "Description détaillée", type: "textarea" },
  { name: "heroTitle", label: "Titre hero/banner", type: "textarea" },
  { name: "heroHighlight", label: "Texte en or italique" },
  { name: "featuredLabel", label: "Label prestation phare" },
  { name: "featuredTitle", label: "Titre prestation phare", type: "textarea" },
  { name: "featuredCtaLabel", label: "CTA prestation phare" },
  { name: "featuredCtaHref", label: "Lien CTA prestation phare" },
  { name: "processTitle", label: "Titre processus" },
  { name: "faqTitle", label: "Titre FAQ" },
  { name: "ctaTitle", label: "Titre CTA final", type: "textarea" },
  { name: "ctaSubtitle", label: "Sous-texte CTA final" },
  { name: "ctaLabel", label: "Bouton CTA final" },
  { name: "ctaHref", label: "Lien CTA final" },
  { name: "pricingNote", label: "Note tarifs/location", type: "textarea" },
  { name: "priceTableHeaders", label: "Entêtes tableau prix", type: "array" },
  { name: "imageUrl", label: "Image/banner URL" },
  { name: "gallery", label: "Galerie URLs", type: "array" },
  { name: "displayOrder", label: "Ordre d'affichage", type: "number" },
  { name: "published", label: "Publié", type: "checkbox" },
  { name: "showTestimonials", label: "Afficher témoignages", type: "checkbox" },
  { name: "showEngagements", label: "Afficher engagements", type: "checkbox" },
  { name: "metaTitle", label: "SEO title" },
  { name: "metaDescription", label: "SEO description", type: "textarea" },
];

const collections: Collection[] = [
  {
    key: "features",
    title: "Bénéfices / points prestation phare",
    fields: [
      { name: "text", label: "Texte" },
      { name: "displayOrder", label: "Ordre", type: "number" },
    ],
    factory: () => ({ text: "Nouveau bénéfice", displayOrder: 1 }),
  },
  {
    key: "cards",
    title: "Cartes de services",
    fields: [
      { name: "icon", label: "Icône" },
      { name: "title", label: "Titre" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "tags", label: "Tags", type: "array" },
      { name: "displayOrder", label: "Ordre", type: "number" },
    ],
    factory: () => ({ icon: "Building2", title: "Nouvelle carte", description: "Description", tags: [], displayOrder: 1 }),
  },
  {
    key: "processSteps",
    title: "Étapes processus",
    fields: [
      { name: "number", label: "Numéro" },
      { name: "firstLine", label: "Ligne 1" },
      { name: "secondLine", label: "Ligne 2" },
      { name: "displayOrder", label: "Ordre", type: "number" },
    ],
    factory: () => ({ number: "1", firstLine: "Étape", secondLine: "détail", displayOrder: 1 }),
  },
  {
    key: "faqs",
    title: "FAQ",
    fields: [
      { name: "question", label: "Question" },
      { name: "answer", label: "Réponse", type: "textarea" },
      { name: "displayOrder", label: "Ordre", type: "number" },
    ],
    factory: () => ({ question: "Question", answer: "Réponse", displayOrder: 1 }),
  },
  {
    key: "pricingPlans",
    title: "Cartes tarifs",
    fields: [
      { name: "name", label: "Nom" },
      { name: "price", label: "Prix" },
      { name: "note", label: "Note", type: "textarea" },
      { name: "features", label: "Fonctionnalités", type: "array" },
      { name: "featured", label: "Mis en avant", type: "checkbox" },
      { name: "displayOrder", label: "Ordre", type: "number" },
    ],
    factory: () => ({ name: "Offre", price: "Sur devis", note: "", features: [], featured: false, displayOrder: 1 }),
  },
  {
    key: "pricingRows",
    title: "Tableau location / prix",
    fields: [
      { name: "item", label: "Équipement/service" },
      { name: "price", label: "Prix" },
      { name: "duration", label: "Durée" },
      { name: "highlighted", label: "Ligne en or", type: "checkbox" },
      { name: "displayOrder", label: "Ordre", type: "number" },
    ],
    factory: () => ({ item: "Équipement", price: "Sur devis", duration: "Par jour", highlighted: false, displayOrder: 1 }),
  },
  {
    key: "testimonials",
    title: "Témoignages",
    fields: [
      { name: "quote", label: "Citation", type: "textarea" },
      { name: "name", label: "Nom" },
      { name: "role", label: "Rôle" },
      { name: "displayOrder", label: "Ordre", type: "number" },
    ],
    factory: () => ({ quote: "Citation", name: "Client", role: "Rôle", displayOrder: 1 }),
  },
  {
    key: "engagements",
    title: "Engagements",
    fields: [
      { name: "icon", label: "Icône" },
      { name: "title", label: "Titre" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "displayOrder", label: "Ordre", type: "number" },
    ],
    factory: () => ({ icon: "Check", title: "Engagement", description: "Description", displayOrder: 1 }),
  },
];

function clone(service: ApiService) {
  return JSON.parse(JSON.stringify(service)) as ApiService;
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

export default function AdminServicesEditor() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [pageSettings, setPageSettings] = useState<ServicePageSettings>(servicePageDefaults);
  const [editing, setEditing] = useState<ApiService | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sortedServices = useMemo(() => sortByDisplayOrder(services), [services]);

  async function load() {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const [result, settings] = await Promise.all([
        api.getAdminServices(token),
        api.getAdminServicePageSettings(token),
      ]);
      setServices(result);
      setPageSettings(settings);
      setEditing((current) => {
        if (!current) return result[0] ? clone(result[0]) : null;
        const updated = result.find((item) => item.id === current.id);
        return updated ? clone(updated) : current;
      });
    } catch {
      setError("Impossible de charger les services CMS.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function createFromDefault() {
    const source = defaultServices[0];
    setEditing({
      ...clone(source),
      id: undefined,
      title: "Nouveau service",
      slug: `nouveau-service-${Date.now()}`,
      tabId: `CUSTOM-${Date.now()}`,
      tabLabel: "NOUVEAU SERVICE",
      displayOrder: services.length + 1,
      published: false,
    });
  }

  function updatePageHero(key: keyof ServicePageSettings["hero"], value: string) {
    setPageSettings((current) => ({
      ...current,
      hero: { ...current.hero, [key]: value },
    }));
  }

  function updatePageStat(index: number, key: "value" | "label" | "displayOrder", value: unknown) {
    setPageSettings((current) => ({
      ...current,
      stats: current.stats.map((stat, statIndex) =>
        statIndex === index ? { ...stat, [key]: value } : stat,
      ),
    }));
  }

  function addPageStat() {
    setPageSettings((current) => ({
      ...current,
      stats: [...current.stats, { value: "0", label: "NOUVELLE STAT", displayOrder: current.stats.length + 1 }],
    }));
  }

  function removePageStat(index: number) {
    setPageSettings((current) => ({
      ...current,
      stats: current.stats.filter((_, statIndex) => statIndex !== index),
    }));
  }

  function updateField(field: Field, value: unknown) {
    setEditing((current) => current ? { ...current, [field.name]: value } : current);
  }

  function updateCollection(collection: Collection, index: number, field: Field, value: unknown) {
    setEditing((current) => {
      if (!current) return current;
      const items = [...((current[collection.key] as RecordValue[] | undefined) || [])];
      items[index] = { ...items[index], [field.name]: value };
      return { ...current, [collection.key]: items };
    });
  }

  function addItem(collection: Collection) {
    setEditing((current) => {
      if (!current) return current;
      const items = [...((current[collection.key] as RecordValue[] | undefined) || [])];
      return { ...current, [collection.key]: [...items, { ...collection.factory(), displayOrder: items.length + 1 }] };
    });
  }

  function removeItem(collection: Collection, index: number) {
    setEditing((current) => {
      if (!current) return current;
      const items = ((current[collection.key] as RecordValue[] | undefined) || []).filter((_, itemIndex) => itemIndex !== index);
      return { ...current, [collection.key]: items };
    });
  }

  async function save() {
    const token = getAdminToken();
    if (!token || !editing) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = stripIds(editing);
      if (editing.id) {
        await api.updateAdminRecord(`/services/${editing.id}`, token, payload);
      } else {
        await api.createAdminRecord("/services", token, payload);
      }
      setSuccess("Service enregistré.");
      await load();
    } catch {
      setError("Impossible d'enregistrer ce service. Vérifiez les champs obligatoires, le slug et l'API.");
    } finally {
      setSaving(false);
    }
  }

  async function savePageSettings() {
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const result = await api.updateAdminServicePageSettings(token, pageSettings);
      setPageSettings(result);
      setSuccess("Hero et statistiques Services enregistrés.");
    } catch {
      setError("Impossible d'enregistrer le hero Services.");
    } finally {
      setSaving(false);
    }
  }

  async function archiveService() {
    const token = getAdminToken();
    if (!token || !editing?.id) return;
    if (!confirm("Archiver ce service ?")) return;
    try {
      await api.deleteAdminRecord(`/services/${editing.id}`, token);
      setEditing(null);
      await load();
    } catch {
      setError("Impossible d'archiver ce service.");
    }
  }

  if (loading) return <div className="empty-state">Chargement des services...</div>;

  return (
    <div className="panel show">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        <div>
          <div className="table-title">Services CMS</div>
          <div className="td-ref">Gérez les onglets, contenus, cartes, tarifs et FAQ affichés sur la page Services.</div>
        </div>
        <div className="table-actions">
          <button className="btn-sm" onClick={load}><i className="ti ti-refresh" /> Actualiser</button>
          <button className="btn-sm gold" onClick={createFromDefault}><i className="ti ti-plus" /> Nouveau service</button>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">{success}</div>}

      <div className="table-card" style={{ padding: "1.25rem" }}>
        <div className="table-header">
          <div>
            <div className="table-title">Hero global Services</div>
            <div className="td-ref">Texte et statistiques affichés en haut de /services.</div>
          </div>
          <button className="btn-sm gold" disabled={saving} onClick={savePageSettings}>
            <i className="ti ti-device-floppy" /> Enregistrer hero
          </button>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Eyebrow</label>
            <input className="form-control" value={pageSettings.hero.eyebrow} onChange={(event) => updatePageHero("eyebrow", event.target.value)} />
          </div>
          <div className="form-group">
            <label>Titre avant highlight</label>
            <input className="form-control" value={pageSettings.hero.titleBeforeHighlight} onChange={(event) => updatePageHero("titleBeforeHighlight", event.target.value)} />
          </div>
          <div className="form-group">
            <label>Highlight or italique</label>
            <input className="form-control" value={pageSettings.hero.highlightedTitle} onChange={(event) => updatePageHero("highlightedTitle", event.target.value)} />
          </div>
          <div className="form-group">
            <label>Titre après highlight</label>
            <input className="form-control" value={pageSettings.hero.titleAfterHighlight} onChange={(event) => updatePageHero("titleAfterHighlight", event.target.value)} />
          </div>
          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label>Description</label>
            <textarea className="form-control" value={pageSettings.hero.description} onChange={(event) => updatePageHero("description", event.target.value)} />
          </div>
        </div>
        <div className="table-header">
          <div className="table-title">Statistiques globales</div>
          <button className="btn-sm" onClick={addPageStat}><i className="ti ti-plus" /> Ajouter une statistique</button>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {sortByDisplayOrder(pageSettings.stats).map((stat, index) => (
            <div className="form-grid" key={`${stat.label}-${index}`}>
              <div className="form-group">
                <label>Valeur</label>
                <input className="form-control" value={stat.value} onChange={(event) => updatePageStat(index, "value", event.target.value)} />
              </div>
              <div className="form-group">
                <label>Libellé</label>
                <input className="form-control" value={stat.label} onChange={(event) => updatePageStat(index, "label", event.target.value)} />
              </div>
              <div className="form-group">
                <label>Ordre</label>
                <input className="form-control" type="number" value={stat.displayOrder ?? 0} onChange={(event) => updatePageStat(index, "displayOrder", Number(event.target.value))} />
              </div>
              <div className="form-group">
                <label>Action</label>
                <button className="btn-sm" onClick={() => removePageStat(index)}><i className="ti ti-trash" /> Retirer</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div className="table-card">
          <div className="table-header">
            <div className="table-title">Onglets services</div>
            <div className="td-ref">{sortedServices.length} services</div>
          </div>
          {sortedServices.length === 0 ? (
            <div className="empty-state">Aucun service en base. Créez un premier onglet depuis le fallback.</div>
          ) : (
            <div style={{ padding: ".5rem" }}>
              {sortedServices.map((service) => (
                <button
                  key={service.id || service.slug}
                  className={`contact-item ${editing?.id === service.id ? "active" : ""}`}
                  style={{ width: "100%", border: 0, textAlign: "left", cursor: "pointer" }}
                  onClick={() => setEditing(clone(service))}
                  type="button"
                >
                  <div className="contact-avatar">{String(service.tabLabel || service.title).slice(0, 2)}</div>
                  <div>
                    <div className="contact-name">{service.tabLabel || service.title}</div>
                    <div className="contact-service">{service.slug} · ordre {service.displayOrder ?? 0}</div>
                  </div>
                  <span className={`badge ${service.published ? "badge-green" : "badge-amber"}`}>
                    {service.published ? "Publié" : "Brouillon"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {!editing ? (
            <div className="empty-state">Sélectionnez ou créez un service.</div>
          ) : (
            <ServiceForm
              service={editing}
              saving={saving}
              onField={updateField}
              onCollection={updateCollection}
              onAdd={addItem}
              onRemove={removeItem}
              onSave={save}
              onArchive={archiveService}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceForm({
  service,
  saving,
  onField,
  onCollection,
  onAdd,
  onRemove,
  onSave,
  onArchive,
}: {
  service: ApiService;
  saving: boolean;
  onField: (field: Field, value: unknown) => void;
  onCollection: (collection: Collection, index: number, field: Field, value: unknown) => void;
  onAdd: (collection: Collection) => void;
  onRemove: (collection: Collection, index: number) => void;
  onSave: () => void;
  onArchive: () => void;
}) {
  return (
    <>
      <div className="table-card" style={{ padding: "1.25rem" }}>
        <div className="table-header">
          <div className="table-title">{service.id ? "Modifier le service" : "Créer un service"}</div>
          <div className="table-actions">
            {service.id && <button className="btn-sm" onClick={onArchive}><i className="ti ti-trash" /> Archiver</button>}
            <button className="btn-sm gold" disabled={saving} onClick={onSave}><i className="ti ti-device-floppy" /> {saving ? "Enregistrement..." : "Enregistrer"}</button>
          </div>
        </div>
        <div className="form-grid">
          {baseFields.map((field) => (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              <AdminInput field={field} value={(service as unknown as RecordValue)[field.name]} onChange={(value) => onField(field, value)} />
            </div>
          ))}
        </div>
      </div>

      {collections.map((collection) => {
        const items = sortByDisplayOrder(((service[collection.key] as RecordValue[] | undefined) || []) as Array<RecordValue & { displayOrder?: number }>);
        return (
          <div className="table-card" key={String(collection.key)} style={{ padding: "1.25rem" }}>
            <div className="table-header">
              <div className="table-title">{collection.title}</div>
              <button className="btn-sm gold" onClick={() => onAdd(collection)}><i className="ti ti-plus" /> Ajouter</button>
            </div>
            {items.length === 0 ? (
              <div className="empty-state">Aucun élément.</div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {items.map((item, index) => (
                  <div className="table-card" key={`${String(collection.key)}-${index}`} style={{ padding: "1rem", boxShadow: "none" }}>
                    <div className="form-grid">
                      {collection.fields.map((field) => (
                        <div className="form-group" key={field.name}>
                          <label>{field.label}</label>
                          <AdminInput field={field} value={item[field.name]} onChange={(value) => onCollection(collection, index, field, value)} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button className="btn-sm" onClick={() => onRemove(collection, index)}><i className="ti ti-trash" /> Retirer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function AdminInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (value: unknown) => void }) {
  if (field.type === "textarea") {
    return <textarea className="form-control" value={String(value ?? "")} onChange={(event) => onChange(event.target.value)} />;
  }
  if (field.type === "checkbox") {
    return (
      <button type="button" className={`toggle-switch ${value ? "on" : ""}`} onClick={() => onChange(!value)}>
        <div className="toggle-knob" />
      </button>
    );
  }
  if (field.type === "array") {
    return (
      <input
        className="form-control"
        value={Array.isArray(value) ? value.join(", ") : String(value ?? "")}
        onChange={(event) => onChange(event.target.value.split(",").map((item) => item.trim()).filter(Boolean))}
      />
    );
  }
  return (
    <input
      className="form-control"
      type={field.type === "number" ? "number" : "text"}
      value={String(value ?? "")}
      onChange={(event) => onChange(field.type === "number" ? Number(event.target.value) : event.target.value)}
    />
  );
}
