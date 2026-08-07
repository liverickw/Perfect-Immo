"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { clearAdminSession, getAdminUser } from "@/lib/api/admin-auth";

const navGroups = [
  {
    label: "Principal",
    items: [
      ["/admin/dashboard", "Tableau de bord", "ti-layout-dashboard", ""],
      ["/admin/properties", "Biens immobiliers", "ti-building", "47"],
      ["/admin/projects", "Projets", "ti-hammer", ""],
      ["/admin/services", "Services", "ti-list", ""],
      ["/admin/realisations", "Réalisations", "ti-photo", ""],
      ["/admin/blog", "Blog", "ti-file-text", ""],
      ["/admin/messages", "Contacts", "ti-mail", "8"],
    ],
  },
  {
    label: "Médias & Contenu",
    items: [
      ["/admin/media", "Médiathèque", "ti-photo", ""],
      ["/admin/statistics", "Statistiques", "ti-chart-bar", ""],
    ],
  },
  {
    label: "Administration",
    items: [
      ["/admin/users", "Utilisateurs", "ti-users", ""],
      ["/admin/settings", "Paramètres", "ti-settings", ""],
    ],
  },
] as const;

const titles: Record<string, string> = {
  "/admin/dashboard": "Tableau de bord",
  "/admin/properties": "Biens immobiliers",
  "/admin/projects": "Projets",
  "/admin/services": "Services",
  "/admin/realisations": "Réalisations",
  "/admin/blog": "Articles & Blog",
  "/admin/messages": "Contacts & Demandes",
  "/admin/media": "Bibliothèque médias",
  "/admin/statistics": "Statistiques & Analytics",
  "/admin/users": "Utilisateurs & Rôles",
  "/admin/settings": "Paramètres du site",
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = typeof window !== "undefined" ? getAdminUser() : null;

  const title = useMemo(() => {
    if (pathname === "/admin") return titles["/admin/dashboard"];
    return titles[pathname] || "Administration";
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  function logout() {
    clearAdminSession();
    router.replace("/admin/login");
  }

  return (
    <main className={`pie-admin ${open ? "sidebar-open" : ""}`}>
      <h2 className="sr-only">
        Tableau de bord administrateur Perfect Immo & Engineering - gestion des biens,
        contacts, réalisations, médias et utilisateurs
      </h2>
      <div className="admin-shell">
        <aside className="sidebar">
          <div className="sb-brand">
            <Link href="/admin/dashboard" className="sb-logo">
              <div className="sb-logo-mark">PI</div>
              <div>
                <div className="sb-logo-text">
                  Perfect Immo <span>&</span> E.
                </div>
                <div className="sb-logo-sub">Administration</div>
              </div>
            </Link>
          </div>

          <div className="sb-user">
            <div className="sb-avatar">
              {(user?.name || "AD").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="sb-uname">{user?.name || "Admin Principal"}</div>
              <div className="sb-urole">Douala, Cameroun</div>
            </div>
            <div className="sb-badge-role">
              {user?.role?.replace("_", " ") || "Super Admin"}
            </div>
          </div>

          <nav className="sb-nav" aria-label="Admin navigation">
            {navGroups.map((group) => (
              <div key={group.label}>
                <div className="sb-section-label">{group.label}</div>
                {group.items.map(([href, label, icon, badge]) => {
                  const active =
                    href === "/admin/dashboard"
                      ? pathname === href || pathname === "/admin"
                      : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`sb-item ${active ? "active" : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      <i className={`ti ${icon}`} aria-hidden="true" />
                      {label}
                      {badge && (
                        <span
                          className={`sb-item-badge ${
                            label === "Biens immobiliers" ? "gold" : ""
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="sb-footer">
            <Link href="/" className="sb-footer-link">
              <i className="ti ti-external-link" aria-hidden="true" /> Voir le
              site public
            </Link>
            <button className="sb-footer-link" type="button" onClick={logout}>
              <i className="ti ti-logout" aria-hidden="true" /> Déconnexion
            </button>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="sidebar-dismiss"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
          />
        )}

        <section className="main">
          <header className="topbar">
            <button
              type="button"
              className="topbar-btn mobile-menu"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <i className="ti ti-menu-2" aria-hidden="true" />
            </button>
            <div className="topbar-title" id="page-title">
              {title}
            </div>
            <div className="topbar-right">
              <div className="topbar-search">
                <i className="ti ti-search" aria-hidden="true" />
                <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
                  Rechercher...
                </span>
              </div>
              <Link href="/admin/messages" className="topbar-btn">
                <i className="ti ti-bell" aria-hidden="true" />
                <div className="notif-dot" />
              </Link>
              <button type="button" className="topbar-btn">
                <i className="ti ti-help-circle" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="content">{children}</div>
        </section>
      </div>
    </main>
  );
}
