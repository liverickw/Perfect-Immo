"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api/client";
import { getAdminToken } from "@/lib/api/admin-auth";
import type { AdminDashboard } from "@/lib/api/types";

const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const fallbackProperties = [2, 3, 5, 4, 6, 3, 7, 5, 8, 4, 6, 9];
const fallbackContacts = [5, 8, 6, 12, 9, 7, 14, 11, 16, 10, 13, 19];

function text(value: Record<string, unknown>, keys: string[], fallback: string) {
  for (const key of keys) {
    const item = value[key];
    if (item) return String(item);
  }
  return fallback;
}

export default function AdminDashboardHome() {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    api
      .getAdminDashboard(token)
      .then(setData)
      .catch(() => setError("Impossible de charger les données du tableau de bord."));
  }, []);

  const stats = [
    ["Biens actifs", data?.widgets.totalProperties ?? "—", "+12% ce mois", "up", "ti-trending-up"],
    ["Projets publiés", data?.widgets.totalProjects ?? "—", "Stable", "", "ti-minus"],
    ["Contacts reçus", data?.widgets.totalMessages ?? "—", "+24% cette semaine", "up", "ti-trending-up"],
    ["Articles blog", data?.widgets.totalBlogs ?? "—", "-2 brouillons", "down", "ti-trending-down"],
  ];

  const recentContacts = data?.recentContacts?.slice(0, 4) || [];
  const recentActivity = data?.latestActivity?.slice(0, 4) || [];
  const max = Math.max(...fallbackProperties, ...fallbackContacts);

  const bars = useMemo(
    () =>
      months.map((month, index) => ({
        month,
        properties: Math.round((fallbackProperties[index] / max) * 86),
        contacts: Math.round((fallbackContacts[index] / max) * 86),
      })),
    [max],
  );

  return (
    <div className="panel show" id="pg-dashboard">
      {error && <div className="admin-error">{error}</div>}
      <div className="stat-row">
        {stats.map(([label, value, delta, trend, icon]) => (
          <div className="stat-card" key={label}>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
            <div className={`stat-delta ${trend}`} style={!trend ? { color: "var(--text-muted)" } : undefined}>
              <i className={`ti ${icon}`} aria-hidden="true" /> {delta}
            </div>
          </div>
        ))}
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-title">Activité mensuelle</div>
          <div className="chart-legend">
            <div className="legend-item"><div className="legend-dot" style={{ background: "#185FA5" }} /> Biens</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: "var(--gold)" }} /> Contacts</div>
          </div>
        </div>
        <div className="bars">
          {bars.map((bar) => (
            <div className="bar-grp" key={bar.month}>
              <div className="bar" style={{ height: bar.properties, background: "#185FA5" }} title={`${bar.properties} biens`} />
              <div className="bar" style={{ height: bar.contacts, background: "var(--gold)" }} title={`${bar.contacts} contacts`} />
            </div>
          ))}
        </div>
        <div className="bar-labels">
          {bars.map((bar) => <div className="bar-lbl" key={bar.month}>{bar.month}</div>)}
        </div>
      </div>

      <div className="grid-2">
        <div className="table-card">
          <div className="table-header">
            <div className="table-title">Contacts récents</div>
            <Link className="btn-sm" href="/admin/messages">Voir tout</Link>
          </div>
          <div style={{ padding: ".25rem .5rem" }}>
            {recentContacts.length ? recentContacts.map((contact) => (
              <div className="contact-item" key={String(contact.id)}>
                <div className="contact-avatar">{text(contact, ["name", "email"], "PI").slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="contact-name">{text(contact, ["name", "email"], "Contact")}</div>
                  <div className="contact-service">{text(contact, ["subject", "message"], "Demande client")}</div>
                </div>
                <div className="contact-time">{String(contact.createdAt || "")}</div>
              </div>
            )) : (
              <div className="empty-state" style={{ padding: "1.5rem" }}>Aucun contact récent.</div>
            )}
          </div>
        </div>

        <div>
          <div className="quick-actions">
            <div className="qa-title">Actions rapides</div>
            <div className="qa-grid">
              <Link className="qa-btn highlight" href="/admin/properties"><i className="ti ti-building-plus" aria-hidden="true" /> Ajouter un bien</Link>
              <Link className="qa-btn" href="/admin/realisations"><i className="ti ti-photo-plus" aria-hidden="true" /> Nouvelle réalisation</Link>
              <Link className="qa-btn" href="/admin/blog"><i className="ti ti-edit" aria-hidden="true" /> Écrire un article</Link>
              <Link className="qa-btn" href="/admin/media"><i className="ti ti-upload" aria-hidden="true" /> Importer médias</Link>
            </div>
          </div>
          <div className="quick-actions">
            <div className="qa-title">Carte des biens</div>
            <div className="mini-map">
              <div className="mm-grid" />
              <div className="mm-pin" style={{ left: "22%", top: "34%", background: "#22C55E" }} />
              <div className="mm-pin" style={{ left: "58%", top: "42%", background: "#F59E0B" }} />
              <div className="mm-pin" style={{ left: "76%", top: "62%", background: "var(--gold)" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="table-card">
          <div className="table-header"><div className="table-title">Activité récente</div></div>
          <div style={{ padding: ".25rem .75rem" }}>
            {recentActivity.length ? recentActivity.map((item) => (
              <div className="notif-item" key={String(item.id)}>
                <div className="notif-icon" style={{ background: "var(--bg-accent)" }}><i className="ti ti-activity" /></div>
                <div>
                  <div className="notif-text">{text(item, ["action", "entity"], "Activité CMS")}</div>
                  <div className="notif-time">{String(item.createdAt || "")}</div>
                </div>
              </div>
            )) : (
              <div className="empty-state" style={{ padding: "1.5rem" }}>Aucune activité récente.</div>
            )}
          </div>
        </div>
        <div className="table-card">
          <div className="table-header"><div className="table-title">Notifications</div></div>
          <div style={{ padding: ".25rem .75rem" }}>
            <div className="notif-item">
              <div className="notif-icon" style={{ background: "var(--bg-warning)" }}><i className="ti ti-bell" /></div>
              <div><div className="notif-text">Messages clients à traiter</div><div className="notif-time">Synchronisé avec l&apos;API Contacts</div></div>
              <div className="notif-dot-unread" />
            </div>
            <div className="notif-item">
              <div className="notif-icon" style={{ background: "var(--bg-accent)" }}><i className="ti ti-database" /></div>
              <div><div className="notif-text">Données CMS chargées depuis le backend</div><div className="notif-time">Projets, biens, blog, services</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
