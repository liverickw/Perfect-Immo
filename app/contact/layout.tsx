import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Perfect Immo & Engineering - Douala, Cameroun",
  description:
    "Contactez Perfect Immo & Engineering à Douala. Consultation gratuite, réponse sous 24h. Téléphone, email, WhatsApp et formulaire complet.",
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
