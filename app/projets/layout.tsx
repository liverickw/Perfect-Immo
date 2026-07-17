import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Biens Disponibles | Perfect Immo & Engineering — Douala, Cameroun",
  description:
    "Villas, appartements, terrains et locaux commerciaux en vente ou location à Douala. Titres fonciers vérifiés, visites organisées sous 48h.",
};

export default function ProjetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
