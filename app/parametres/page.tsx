import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import ThemeSettings from "@/components/theme/ThemeSettings";
import styles from "../home.module.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--home-serif", display: "swap" });
const sans = Outfit({ subsets: ["latin"], variable: "--home-sans", display: "swap" });

const navigation = [
  ["Accueil", "/"], ["Services", "/services"], ["Réalisations", "/realisations"],
  ["Projets", "/projets"], ["Blog", "/#blog"], ["Paramètres", "/parametres"],
];

export const metadata: Metadata = {
  title: "Paramètres | Perfect Immo & Engineering",
  description: "Choisissez l’apparence du site Perfect Immo & Engineering.",
};

export default function ParametresPage() {
  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <div className={styles.site}>
        <header className={styles.navbar}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>PI</span>
            <span><span className={styles.logoText}>Perfect Immo <em>&</em> Engineering</span><span className={styles.logoSub}>Douala, Cameroun</span></span>
          </Link>
          <nav className={styles.navLinks} aria-label="Navigation principale">
            {navigation.map(([label, href]) => (
              <Link key={href} href={href} className={`${styles.navLink} ${href === "/parametres" ? styles.activeLink : ""}`}>{label}</Link>
            ))}
          </nav>
          <Link href="/contact" className={styles.navCta}>Contact</Link>
        </header>

        <section className="public-settings-page">
          <div className="public-settings-card">
            <p className="eyebrow">Préférences</p>
            <h1>Paramètres</h1>
            <p className="public-settings-intro">Personnalisez l’apparence du site selon vos préférences.</p>
            <ThemeSettings />
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <div>
              <div className={styles.footerLogo}>Perfect Immo <em>&</em> Engineering</div>
              <p className={styles.footerTagline}>Votre partenaire immobilier et d’ingénierie de confiance à Douala, Cameroun.</p>
            </div>
            <div>
              <div className={styles.footerColumnTitle}>Navigation</div>
              <ul className={styles.footerLinks}>{navigation.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
            </div>
            <div>
              <div className={styles.footerColumnTitle}>Contact</div>
              <ul className={styles.footerLinks}><li><Link href="/contact">Nous contacter</Link></li><li><a href="mailto:contact@perfectimmo.cm">contact@perfectimmo.cm</a></li></ul>
            </div>
          </div>
          <div className={styles.footerBottom}><span>© 2026 Perfect Immo & Engineering · Tous droits réservés</span></div>
        </footer>
      </div>
    </main>
  );
}
