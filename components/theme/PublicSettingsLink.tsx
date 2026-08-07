"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function PublicSettingsLink() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/parametres") return null;

  return (
    <Link href="/parametres" className="public-settings-link" aria-label="Ouvrir les paramètres d’apparence">
      <Settings size={19} aria-hidden="true" />
      <span>Paramètres</span>
    </Link>
  );
}
