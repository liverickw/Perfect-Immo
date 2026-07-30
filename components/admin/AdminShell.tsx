"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { clearAdminSession, getAdminUser } from "@/lib/api/admin-auth";

const navGroups = [
  {
    label: "Principal",
    items: [
      ["/admin/dashboard", "Dashboard", "ti-layout-dashboard", ""],
      ["/admin/properties", "Properties", "ti-building", "47"],
      ["/admin/projects", "Projects", "ti-hammer", ""],
      ["/admin/services", "Services", "ti-list", ""],
      ["/admin/realisations", "Realisations", "ti-photo", ""],
      ["/admin/blog", "Blog", "ti-file-text", ""],
      ["/admin/messages", "Contacts", "ti-mail", "8"],
    ],
  },
  {
    label: "Médias & Contenu",
    items: [
      ["/admin/media", "Media Library", "ti-photo", ""],
      ["/admin/statistics", "Statistics", "ti-chart-bar", ""],
    ],
  },
  {
    label: "Administration",
    items: [
      ["/admin/users", "Users", "ti-users", ""],
      ["/admin/settings", "Settings", "ti-settings", ""],
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
        Dashboard administrateur Perfect Immo & Engineering - gestion des biens,
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
                            label === "Properties" ? "gold" : ""
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

        <section className="main">
          <header className="topbar">
            <button
              type="button"
              className="topbar-btn mobile-menu"
              onClick={() => setOpen((value) => !value)}
              aria-label="Ouvrir le menu"
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
