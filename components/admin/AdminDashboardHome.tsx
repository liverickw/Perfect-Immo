"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { getAdminToken } from "@/lib/api/admin-auth";
import type { AdminDashboard } from "@/lib/api/types";

type RecentWorkItem = Record<string, unknown> & {
  _kind: string;
  createdAt?: unknown;
  id?: unknown;
};

function text(value: Record<string, unknown>, keys: string[], fallback: string) {
  for (const key of keys) {
    const item = value[key];
    if (item) return String(item);
  }
  return fallback;
}

function formatDate(value: unknown) {
  if (!value) return "";
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("fr-FR");
}

function Initials({ value }: { value: string }) {
  return <div className="contact-avatar">{value.slice(0, 2).toUpperCase()}</div>;
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="empty-state" style={{ padding: "1.5rem" }}>{children}</div>;
}

export default function AdminDashboardHome() {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      .getAdminDashboard(token)
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => {
        if (active) setError("Impossible de charger les données du tableau de bord.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const stats = [
    ["Total Services", data?.widgets.totalServices, "ti-list"],
    ["Total Projects", data?.widgets.totalProjects, "ti-hammer"],
    ["Total Réalisations", data?.widgets.totalRealisations, "ti-photo"],
    ["Total Properties", data?.widgets.totalProperties, "ti-building"],
    ["Published Blog Posts", data?.widgets.publishedBlogPosts, "ti-file-text"],
    ["Unread Contact Messages", data?.widgets.unreadContactMessages, "ti-mail"],
  ];

  const recentWorkSource: RecentWorkItem[] = [
    ...(data?.recentRealisations || []).map((item) => ({ ...item, _kind: "Réalisation" })),
    ...(data?.recentProjects || []).map((item) => ({ ...item, _kind: "Project" })),
  ];
  const recentWorks = recentWorkSource
    .sort((a, b) => new Date(String(b.createdAt || "")).getTime() - new Date(String(a.createdAt || "")).getTime())
    .slice(0, 5);

  return (
    <div className="panel show" id="pg-dashboard">
      {error && <div className="admin-error">{error}</div>}

      <div className="stat-row" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        {stats.map(([label, value, icon]) => (
          <div className="stat-card" key={String(label)}>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{loading ? "..." : value ?? 0}</div>
            <div className="stat-delta" style={{ color: "var(--text-muted)" }}>
              <i className={`ti ${icon}`} aria-hidden="true" /> Donnée API
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="table-card">
          <div className="table-header">
            <div className="table-title">Recent contact messages</div>
            <Link className="btn-sm" href="/admin/messages">Voir tout</Link>
          </div>
          <div style={{ padding: ".25rem .5rem" }}>
            {loading ? (
              <Empty>Chargement des messages...</Empty>
            ) : data?.recentContacts.length ? (
              data.recentContacts.map((contact) => (
                <div className="contact-item" key={String(contact.id)}>
                  <Initials value={text(contact, ["name", "email"], "PI")} />
                  <div>
                    <div className="contact-name">{text(contact, ["name", "email"], "Contact")}</div>
                    <div className="contact-service">{text(contact, ["subject", "message"], "Demande client")}</div>
                  </div>
                  <div className="contact-time">{formatDate(contact.createdAt)}</div>
                </div>
              ))
            ) : (
              <Empty>Aucun message récent.</Empty>
            )}
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <div className="table-title">Recent projects & réalisations</div>
            <Link className="btn-sm" href="/admin/realisations">Voir tout</Link>
          </div>
          <div style={{ padding: ".25rem .5rem" }}>
            {loading ? (
              <Empty>Chargement des projets...</Empty>
            ) : recentWorks.length ? (
              recentWorks.map((item) => (
                <div className="contact-item" key={`${item._kind}-${String(item.id)}`}>
                  <Initials value={String(item._kind)} />
                  <div>
                    <div className="contact-name">{text(item, ["title"], "Projet")}</div>
                    <div className="contact-service">{String(item._kind)} · {text(item, ["location", "category", "client"], "CMS")}</div>
                  </div>
                  <div className="contact-time">{formatDate(item.createdAt)}</div>
                </div>
              ))
            ) : (
              <Empty>Aucun projet ou réalisation récent.</Empty>
            )}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div className="quick-actions">
            <div className="qa-title">Quick actions</div>
            <div className="qa-grid">
              <Link className="qa-btn highlight" href="/admin/services"><i className="ti ti-list" aria-hidden="true" /> Gérer les services</Link>
              <Link className="qa-btn" href="/admin/projects"><i className="ti ti-hammer" aria-hidden="true" /> Gérer les projets</Link>
              <Link className="qa-btn" href="/admin/realisations"><i className="ti ti-photo-plus" aria-hidden="true" /> Nouvelle réalisation</Link>
              <Link className="qa-btn" href="/admin/media"><i className="ti ti-upload" aria-hidden="true" /> Importer médias</Link>
            </div>
          </div>

          <div className="table-card">
            <div className="table-header"><div className="table-title">Recent uploads</div></div>
            <div style={{ padding: ".25rem .5rem" }}>
              {loading ? (
                <Empty>Chargement des médias...</Empty>
              ) : data?.recentUploads.length ? (
                data.recentUploads.map((upload) => (
                  <div className="contact-item" key={String(upload.id)}>
                    <Initials value="MD" />
                    <div>
                      <div className="contact-name">{text(upload, ["fileName", "publicId"], "Média")}</div>
                      <div className="contact-service">{text(upload, ["folder", "mimeType"], "Media Library")}</div>
                    </div>
                    <div className="contact-time">{formatDate(upload.createdAt)}</div>
                  </div>
                ))
              ) : (
                <Empty>Aucun média disponible.</Empty>
              )}
            </div>
          </div>
        </div>

        <div className="table-card">
          <div className="table-header"><div className="table-title">Latest admin activity</div></div>
          <div style={{ padding: ".25rem .75rem" }}>
            {loading ? (
              <Empty>Chargement de l&apos;activité...</Empty>
            ) : data?.latestActivity.length ? (
              data.latestActivity.map((item) => (
                <div className="notif-item" key={String(item.id)}>
                  <div className="notif-icon" style={{ background: "var(--bg-accent)" }}><i className="ti ti-activity" /></div>
                  <div>
                    <div className="notif-text">{text(item, ["action", "entity"], "Activité CMS")}</div>
                    <div className="notif-time">{formatDate(item.createdAt)}</div>
                  </div>
                </div>
              ))
            ) : (
              <Empty>Aucune activité admin enregistrée.</Empty>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
