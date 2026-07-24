"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FileText,
  Image,
  LogOut,
  Moon,
  Search,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { clearAdminSession, getAdminUser } from "@/lib/api/admin-auth";

const navItems = [
  ["/admin", "Dashboard", BarChart3],
  ["/admin/projects", "Projects", BriefcaseBusiness],
  ["/admin/properties", "Properties", Building2],
  ["/admin/services", "Services", FileText],
  ["/admin/realisations", "Realisations", BookOpen],
  ["/admin/blog", "Blog", FileText],
  ["/admin/messages", "Messages", Bell],
  ["/admin/media", "Media Library", Image],
  ["/admin/users", "Users", Users],
  ["/admin/settings", "Settings", Settings],
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = typeof window !== "undefined" ? getAdminUser() : null;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  function logout() {
    clearAdminSession();
    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#F6F5F0] text-[#071D36]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-[#071D36]/10 bg-[#071D36] px-4 py-5 text-white lg:block">
        <Link href="/admin" className="flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center border border-[#D2AD3D] text-sm font-bold text-[#D2AD3D]">
            PI
          </span>
          <span>
            <strong className="block font-serif text-lg leading-tight">
              Perfect Immo
            </strong>
            <small className="text-xs uppercase tracking-[0.25em] text-white/45">
              Admin CMS
            </small>
          </span>
        </Link>
        <nav className="mt-8 space-y-1">
          {navItems.map(([href, label, Icon]) => {
            const active =
              href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-[#D2AD3D] text-[#071D36]"
                    : "text-white/70 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <section className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-[#071D36]/10 bg-[#F6F5F0]/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="hidden w-full max-w-md items-center gap-2 rounded-md border border-[#071D36]/10 bg-white px-3 py-2 md:flex">
              <Search size={16} className="text-[#071D36]/45" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Search projects, properties, users..."
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-md border border-[#071D36]/10 bg-white p-2">
                <Moon size={16} />
              </button>
              <button className="rounded-md border border-[#071D36]/10 bg-white p-2">
                <Bell size={16} />
              </button>
              <div className="hidden items-center gap-2 rounded-md border border-[#071D36]/10 bg-white px-3 py-2 sm:flex">
                <UserRound size={16} />
                <span className="text-sm font-semibold">
                  {user?.name || "Admin"}
                </span>
              </div>
              <button
                onClick={logout}
                className="rounded-md bg-[#071D36] px-3 py-2 text-sm font-semibold text-white"
              >
                <LogOut size={15} className="inline" /> Logout
              </button>
            </div>
          </div>
        </header>
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    </main>
  );
}
