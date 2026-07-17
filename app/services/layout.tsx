import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Services | Perfect Immo & Engineering - Douala, Cameroun",
  description:
    "Immobilier résidentiel et commercial, maîtrise d'oeuvre, ingénierie, gestion locative, conseil et études techniques. Devis gratuit sous 48h.",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
