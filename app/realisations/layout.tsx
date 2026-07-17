import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Réalisations | Perfect Immo & Engineering - Douala, Cameroun",
  description:
    "Plus de 120 projets immobiliers et d'ingénierie livrés à Douala, Yaoundé et au Cameroun. Résidentiel, commercial, industriel et infrastructures.",
};

export default function RealisationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
