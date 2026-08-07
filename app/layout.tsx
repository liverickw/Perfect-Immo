import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeManager from "@/components/theme/ThemeManager";
import PublicSettingsLink from "@/components/theme/PublicSettingsLink";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Perfect Immo & Engineering | Immobilier & Ingénierie à Douala, Cameroun",
  description:
    "Perfect Immo & Engineering - Votre partenaire de confiance à Douala pour la vente, la location et la maîtrise d'oeuvre de vos projets immobiliers et d'ingénierie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('perfect-immo-theme')||'system';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeManager />
        {children}
        <PublicSettingsLink />
      </body>
    </html>
  );
}
