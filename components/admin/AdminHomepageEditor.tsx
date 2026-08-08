"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { getAdminToken } from "@/lib/api/admin-auth";
import type { HomepageContent } from "@/lib/api/types";
import { byDisplayOrder, defaultHomepageContent } from "@/lib/homepage-default";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "select";

type SectionField = {
  label: string;
  path: string;
  type?: FieldType;
  options?: string[];
};

type CollectionField = {
  label: string;
  name: string;
  type?: FieldType;
  options?: string[];
};

type CollectionConfig = {
  title: string;
  path: string;
  fields: CollectionField[];
  factory: () => Record<string, unknown>;
};

const iconOptions = [
  "BadgeCheck",
  "Banknote",
  "Building2",
  "DraftingCompass",
  "Hammer",
  "Home",
  "KeyRound",
  "Ruler",
];

const sectionFields: Array<{ title: string; description: string; fields: SectionField[] }> = [
  {
    title: "Hero",
    description: "Texte principal, CTA et média de la première section.",
    fields: [
      { label: "Eyebrow / badge programme", path: "hero.badge" },
      { label: "Label", path: "hero.eyebrow" },
      { label: "Titre ligne 1", path: "hero.titlePrefix" },
      { label: "Titre ligne 2 avant highlight", path: "hero.titleSuffix" },
      { label: "Texte en or italique", path: "hero.highlightedTitle" },
      { label: "Description", path: "hero.description", type: "textarea" },
      { label: "CTA principal", path: "hero.primaryCtaLabel" },
      { label: "Lien CTA principal", path: "hero.primaryCtaHref" },
      { label: "CTA secondaire", path: "hero.secondaryCtaLabel" },
      { label: "Lien CTA secondaire", path: "hero.secondaryCtaHref" },
      { label: "URL média hero", path: "hero.mediaUrl" },
      { label: "Libellé média", path: "hero.mediaAlt" },
    ],
  },
  {
    title: "WhatsApp",
    description: "Barre de contact sous le hero.",
    fields: [
      { label: "Lien", path: "whatsapp.href" },
      { label: "Titre", path: "whatsapp.label" },
      { label: "Détail", path: "whatsapp.detail" },
    ],
  },
  {
    title: "Domaines d'expertise",
    description: "En-tête de la grille des expertises.",
    fields: [
      { label: "Label", path: "expertise.eyebrow" },
      { label: "Titre ligne 1", path: "expertise.titleLine1" },
      { label: "Titre ligne 2", path: "expertise.titleLine2" },
      { label: "Description", path: "expertise.description", type: "textarea" },
    ],
  },
  {
    title: "Portfolio",
    description: "En-tête et bouton de la section réalisations récentes.",
    fields: [
      { label: "Label", path: "portfolio.eyebrow" },
      { label: "Titre ligne 1", path: "portfolio.titleLine1" },
      { label: "Titre ligne 2", path: "portfolio.titleLine2" },
      { label: "CTA", path: "portfolio.ctaLabel" },
      { label: "Lien CTA", path: "portfolio.ctaHref" },
    ],
  },
  {
    title: "À propos",
    description: "Introduction société et promesse.",
    fields: [
      { label: "Label", path: "about.eyebrow" },
      { label: "Titre ligne 1", path: "about.titleLine1" },
      { label: "Titre ligne 2", path: "about.titleLine2" },
      { label: "Texte en or italique", path: "about.highlightedTitle" },
      { label: "Description", path: "about.description", type: "textarea" },
    ],
  },
  {
    title: "Méthode",
    description: "Titre de la section process.",
    fields: [
      { label: "Label", path: "process.eyebrow" },
      { label: "Titre", path: "process.title" },
    ],
  },
  {
    title: "Témoignages",
    description: "En-tête de la section témoignages.",
    fields: [
      { label: "Label", path: "testimonials.eyebrow" },
      { label: "Titre", path: "testimonials.title" },
    ],
  },
  {
    title: "Blog",
    description: "En-tête des articles mis en avant sur l'accueil.",
    fields: [
      { label: "Label", path: "blog.eyebrow" },
      { label: "Titre", path: "blog.title" },
    ],
  },
  {
    title: "CTA final",
    description: "Dernier appel à l'action de la homepage.",
    fields: [
      { label: "Label", path: "finalCta.eyebrow" },
      { label: "Titre ligne 1", path: "finalCta.titleLine1" },
      { label: "Titre ligne 2 avant highlight", path: "finalCta.titleLine2" },
      { label: "Texte en or italique", path: "finalCta.highlightedTitle" },
      { label: "Description", path: "finalCta.description" },
      { label: "CTA principal", path: "finalCta.primaryCtaLabel" },
      { label: "Lien CTA principal", path: "finalCta.primaryCtaHref" },
      { label: "CTA secondaire", path: "finalCta.secondaryCtaLabel" },
      { label: "Lien CTA secondaire", path: "finalCta.secondaryCtaHref" },
    ],
  },
];

const collections: CollectionConfig[] = [
  {
    title: "Statistiques hero",
    path: "hero.stats",
    fields: [
      { label: "Valeur", name: "value" },
      { label: "Libellé", name: "label" },
      { label: "Ordre", name: "order", type: "number" },
    ],
    factory: () => ({ value: "0", label: "NOUVELLE STAT", order: 1 }),
  },
  {
    title: "Services mis en avant",
    path: "expertise.services",
    fields: [
      { label: "Icône", name: "icon", type: "select", options: iconOptions },
      { label: "Titre", name: "title" },
      { label: "Description", name: "description", type: "textarea" },
      { label: "Ordre", name: "order", type: "number" },
    ],
    factory: () => ({ icon: "Building2", title: "Nouveau service", description: "Description", order: 1 }),
  },
  {
    title: "Réalisations mises en avant",
    path: "portfolio.projects",
    fields: [
      { label: "Badge", name: "tag" },
      { label: "Titre", name: "name" },
      { label: "Lieu / détail", name: "location" },
      { label: "Grand format", name: "featured", type: "checkbox" },
      { label: "Ordre", name: "order", type: "number" },
    ],
    factory: () => ({ tag: "Catégorie · Année", name: "Nouveau projet", location: "Douala", featured: false, order: 1 }),
  },
  {
    title: "Valeurs société",
    path: "about.values",
    fields: [
      { label: "Texte", name: "text" },
      { label: "Ordre", name: "order", type: "number" },
    ],
    factory: () => ({ text: "Nouvelle valeur", order: 1 }),
  },
  {
    title: "Statistiques société",
    path: "about.stats",
    fields: [
      { label: "Valeur", name: "value" },
      { label: "Titre", name: "label" },
      { label: "Détail", name: "detail" },
      { label: "Ordre", name: "order", type: "number" },
    ],
    factory: () => ({ value: "0", label: "Nouvelle statistique", detail: "Détail", order: 1 }),
  },
  {
    title: "Étapes méthode",
    path: "process.steps",
    fields: [
      { label: "Numéro", name: "number" },
      { label: "Ligne 1", name: "firstLine" },
      { label: "Ligne 2", name: "secondLine" },
      { label: "Ordre", name: "order", type: "number" },
    ],
    factory: () => ({ number: "1", firstLine: "Étape", secondLine: "détail", order: 1 }),
  },
  {
    title: "Témoignages",
    path: "testimonials.items",
    fields: [
      { label: "Initiales", name: "initials" },
      { label: "Nom", name: "name" },
      { label: "Rôle", name: "role" },
      { label: "Citation", name: "quote", type: "textarea" },
      { label: "Ordre", name: "order", type: "number" },
    ],
    factory: () => ({ initials: "PI", name: "Client", role: "Rôle", quote: "Témoignage client.", order: 1 }),
  },
  {
    title: "Articles blog accueil",
    path: "blog.posts",
    fields: [
      { label: "Icône", name: "icon", type: "select", options: iconOptions },
      { label: "Catégorie", name: "category" },
      { label: "Titre", name: "title" },
      { label: "Date", name: "date" },
      { label: "Ordre", name: "order", type: "number" },
    ],
    factory: () => ({ icon: "Building2", category: "Conseil", title: "Nouvel article", date: "2026", order: 1 }),
  },
];

function cloneContent(content: HomepageContent) {
  return JSON.parse(JSON.stringify(content)) as HomepageContent;
}

function readPath(source: HomepageContent, path: string) {
  return path.split(".").reduce<unknown>((value, key) => {
    if (!value || typeof value !== "object") return "";
    return (value as Record<string, unknown>)[key];
  }, source);
}

function writePath(source: HomepageContent, path: string, value: unknown) {
  const next = cloneContent(source);
  const keys = path.split(".");
  let cursor = next as unknown as Record<string, unknown>;
  keys.slice(0, -1).forEach((key) => {
    cursor = cursor[key] as Record<string, unknown>;
  });
  cursor[keys[keys.length - 1]] = value;
  return next;
}

function readCollection(source: HomepageContent, path: string) {
  const value = readPath(source, path);
  return Array.isArray(value) ? byDisplayOrder(value as Array<Record<string, unknown> & { order?: number }>) : [];
}

export default function AdminHomepageEditor() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [published, setPublished] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const token = getAdminToken();

    if (!token) {
      window.setTimeout(() => {
        if (active) setLoading(false);
      }, 0);
      return;
    }

    api
      .getAdminHomepage(token)
      .then((result) => {
        if (!active) return;
        setContent(result.draft || defaultHomepageContent);
        setPublished(result.published);
      })
      .catch(() => {
        if (active) setError("Impossible de charger le contenu de la page d'accueil.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function updateField(path: string, value: unknown) {
    setContent((current) => writePath(current, path, value));
  }

  function updateCollection(path: string, index: number, key: string, value: unknown) {
    setContent((current) => {
      const items = readCollection(current, path);
      const nextItems = items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      );
      return writePath(current, path, nextItems);
    });
  }

  function addCollectionItem(config: CollectionConfig) {
    setContent((current) => {
      const items = readCollection(current, config.path);
      const nextItem = { ...config.factory(), order: items.length + 1 };
      return writePath(current, config.path, [...items, nextItem]);
    });
  }

  function removeCollectionItem(path: string, index: number) {
    setContent((current) => {
      const items = readCollection(current, path).filter((_, itemIndex) => itemIndex !== index);
      return writePath(current, path, items);
    });
  }

  async function save(status: HomepageContent["status"]) {
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = { ...cloneContent(content), status };
      const result = await api.updateAdminHomepage(token, payload);
      setContent(result.draft);
      setPublished(result.published);
      setSuccess(status === "PUBLISHED" ? "Homepage publiée avec succès." : "Brouillon sauvegardé.");
    } catch {
      setError("Impossible d'enregistrer la homepage. Vérifiez les champs requis et l'API.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="empty-state">Chargement du module Homepage...</div>;
  }

  return (
    <div className="panel show">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        <div>
          <div className="table-title">Homepage CMS</div>
          <div className="td-ref">
            Gérez les textes et contenus visibles sur la page d&apos;accueil publique.
          </div>
        </div>
        <div className="table-actions">
          <button className="btn-sm" type="button" onClick={() => setPreviewOpen((value) => !value)}>
            <i className="ti ti-eye" /> Aperçu contenu
          </button>
          <a className="btn-sm" href="/" target="_blank" rel="noreferrer">
            <i className="ti ti-external-link" /> Voir le site
          </a>
          <button className="btn-sm" type="button" disabled={saving} onClick={() => save("DRAFT")}>
            <i className="ti ti-device-floppy" /> Sauver brouillon
          </button>
          <button className="btn-sm gold" type="button" disabled={saving} onClick={() => save("PUBLISHED")}>
            <i className="ti ti-upload" /> Publier
          </button>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">{success}</div>}

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <div className="stat-card">
          <div className="stat-label">Statut brouillon</div>
          <div className="stat-value" style={{ fontSize: 24 }}>{content.status}</div>
          <div className="stat-delta" style={{ color: "var(--text-muted)" }}>Version en édition</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Version publiée</div>
          <div className="stat-value" style={{ fontSize: 24 }}>{published ? "Active" : "Fallback"}</div>
          <div className="stat-delta" style={{ color: "var(--text-muted)" }}>
            {published ? "Contenu API public" : "Contenu par défaut public"}
          </div>
        </div>
      </div>

      {previewOpen && (
        <div className="table-card" style={{ padding: "1rem", marginBottom: "1.25rem" }}>
          <div className="table-header">
            <div className="table-title">Aperçu rapide du brouillon</div>
          </div>
          <div className="td-name">{content.hero.titlePrefix} {content.hero.titleSuffix} {content.hero.highlightedTitle}</div>
          <div className="td-ref">{content.hero.description}</div>
        </div>
      )}

      {sectionFields.map((section) => (
        <div className="table-card" key={section.title} style={{ padding: "1.25rem", marginBottom: "1.25rem" }}>
          <div className="table-header">
            <div>
              <div className="table-title">{section.title}</div>
              <div className="td-ref">{section.description}</div>
            </div>
          </div>
          <div className="form-grid">
            {section.fields.map((field) => (
              <div className="form-group" key={field.path}>
                <label>{field.label}</label>
                <AdminInput
                  field={field}
                  value={readPath(content, field.path)}
                  onChange={(value) => updateField(field.path, value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {collections.map((collection) => {
        const items = readCollection(content, collection.path);
        return (
          <div className="table-card" key={collection.path} style={{ padding: "1.25rem", marginBottom: "1.25rem" }}>
            <div className="table-header">
              <div className="table-title">{collection.title}</div>
              <button className="btn-sm gold" type="button" onClick={() => addCollectionItem(collection)}>
                <i className="ti ti-plus" /> Ajouter
              </button>
            </div>
            {items.length === 0 ? (
              <div className="empty-state">Aucun élément.</div>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                {items.map((item, index) => (
                  <div key={`${collection.path}-${index}`} className="table-card" style={{ padding: "1rem", boxShadow: "none" }}>
                    <div className="form-grid">
                      {collection.fields.map((field) => (
                        <div className="form-group" key={field.name}>
                          <label>{field.label}</label>
                          <AdminInput
                            field={{ ...field, path: field.name }}
                            value={item[field.name]}
                            onChange={(value) => updateCollection(collection.path, index, field.name, value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button className="btn-sm" type="button" onClick={() => removeCollectionItem(collection.path, index)}>
                        <i className="ti ti-trash" /> Retirer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AdminInput({
  field,
  value,
  onChange,
}: {
  field: SectionField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.type === "textarea") {
    return (
      <textarea
        className="form-control"
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <button
        type="button"
        className={`toggle-switch ${value ? "on" : ""}`}
        onClick={() => onChange(!value)}
      >
        <div className="toggle-knob" />
      </button>
    );
  }

  if (field.type === "select") {
    return (
      <select
        className="form-control"
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
      >
        {(field.options || []).map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
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
