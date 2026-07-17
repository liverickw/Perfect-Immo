import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  DraftingCompass,
  Globe,
  Hammer,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Ruler,
} from "lucide-react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import styles from "./home.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--home-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--home-sans",
  display: "swap",
});

const services = [
  {
    icon: Home,
    title: "Immobilier résidentiel",
    description:
      "Vente et location de villas, appartements et duplex à Douala et environs.",
  },
  {
    icon: Building2,
    title: "Immobilier commercial",
    description:
      "Bureaux, commerces, entrepôts et espaces industriels en vente ou location.",
  },
  {
    icon: Hammer,
    title: "Maîtrise d'oeuvre",
    description:
      "Pilotage complet de vos chantiers : planning, budget, qualité et conformité.",
  },
  {
    icon: Ruler,
    title: "Études & ingénierie",
    description:
      "Études structurelles, VRD, audits techniques et assistance à maîtrise d'ouvrage.",
  },
  {
    icon: KeyRound,
    title: "Gestion locative",
    description:
      "Gestion complète de votre patrimoine locatif : loyers, entretien, baux.",
  },
  {
    icon: BadgeCheck,
    title: "Permis & conseil",
    description:
      "Obtention de permis de construire, faisabilité et conseil en investissement.",
  },
];

const projects = [
  {
    tag: "Résidentiel · 2024",
    name: "Résidence Les Palmiers - Bastos",
    location: "Yaoundé · 24 appartements · 3 800 m²",
    featured: true,
  },
  {
    tag: "Commercial · 2023",
    name: "Tour Bonanjo Business",
    location: "Douala · 8 étages · 5 200 m²",
  },
  {
    tag: "Infrastructure · 2023",
    name: "Route Ndokoti - VRD",
    location: "Douala · 4,2 km · Voirie & réseaux",
  },
];

const values = [
  "Intégrité et transparence dans chaque transaction",
  "Excellence technique et respect des délais",
  "Innovation au service du développement camerounais",
];

const aboutStats = [
  ["15", "Années d'expérience", "dans l'immobilier & l'ingénierie au Cameroun"],
  ["12", "Ingénieurs certifiés", "génie civil, structure, VRD et bâtiment"],
  ["98%", "Taux de satisfaction", "mesuré auprès de nos clients depuis 2020"],
];

const steps = [
  ["1", "Consultation", "gratuite"],
  ["2", "Étude &", "faisabilité"],
  ["3", "Planification", "du projet"],
  ["4", "Exécution", "& suivi"],
  ["5", "Livraison &", "garantie"],
];

const testimonials = [
  {
    initials: "JE",
    name: "Jean-Marc Essomba",
    role: "PDG, Groupe Essomba",
    quote:
      "Perfect Immo a livré notre immeuble de bureaux dans les délais et au budget convenu. Une équipe rigoureuse et professionnelle.",
  },
  {
    initials: "MN",
    name: "Marie Ngo Biyong",
    role: "Promotrice, SCI Palmier",
    quote:
      "Leur expertise en VRD a transformé notre lotissement. Qualité irréprochable et suivi de chantier exemplaire tout au long du projet.",
  },
];

const posts = [
  {
    icon: Building2,
    category: "Marché",
    title: "Immobilier à Douala : tendances 2025",
    date: "14 mai 2025",
  },
  {
    icon: DraftingCompass,
    category: "Ingénierie",
    title: "Construire durable au Cameroun",
    date: "2 avril 2025",
  },
  {
    icon: Banknote,
    category: "Conseils",
    title: "Investir dans l'immobilier locatif",
    date: "18 mars 2025",
  },
];

export default function HomePage() {
  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <div className={styles.site}>
        <header className={styles.navbar}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>PI</span>
            <span>
              <span className={styles.logoText}>
                Perfect Immo <em>&</em> Engineering
              </span>
              <span className={styles.logoSub}>Douala, Cameroun</span>
            </span>
          </Link>

          <nav className={styles.navLinks} aria-label="Navigation principale">
            <Link href="/" className={`${styles.navLink} ${styles.activeLink}`}>
              Accueil
            </Link>
            <Link href="/services" className={styles.navLink}>
              Services
            </Link>
            <Link href="/realisations" className={styles.navLink}>
              Réalisations
            </Link>
            <Link href="/projets" className={styles.navLink}>
              Projets
            </Link>
            <Link href="/#blog" className={styles.navLink}>
              Blog
            </Link>
          </nav>

          <Link href="/contact" className={styles.navCta}>
            Contact
          </Link>
          <button className={styles.mobileToggle} aria-label="Menu">
            <Menu size={24} />
          </button>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroGrid} />
          <div className={styles.heroGeo} />
          <div className={styles.heroImageZone}>
            <div className={styles.heroImagePlaceholder}>
              <BuildingPlaceholder />
              <span className={styles.buildingLabel}>Photo HD ici</span>
            </div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.newBadge}>
              <span className={styles.newDot} />
              <span>Nouveau programme - Bonanjo 2025</span>
            </div>
            <p className={styles.eyebrow}>Immobilier & Ingénierie</p>
            <h1 className={styles.heroTitle}>
              L&apos;Excellence au
              <br />
              Coeur de <em>vos Projets</em>
            </h1>
            <p className={styles.heroDescription}>
              Votre partenaire de confiance à Douala pour la vente, la location
              et la maîtrise d&apos;oeuvre de vos projets immobiliers.
            </p>
            <div className={styles.heroActions}>
              <Link href="/projets" className={styles.goldButton}>
                Voir nos projets <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className={styles.outlineButton}>
                Nous contacter
              </Link>
            </div>
            <div className={styles.heroStats}>
              {[
                ["120+", "Projets"],
                ["15", "Années"],
                ["500+", "Clients"],
                ["85k", "m² bâtis"],
              ].map(([number, label]) => (
                <div key={label} className={styles.heroStat}>
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <a
          href="https://wa.me/237676438342"
          className={styles.whatsappBar}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={24} />
          <span>
            <strong>WhatsApp - Réponse en moins de 2h</strong>
            <small>+237 676 438 342 · Lun-Sam 8h-18h</small>
          </span>
        </a>

        <section className={`${styles.section} ${styles.whiteSection}`}>
          <SectionHeader
            eyebrow="Ce que nous faisons"
            title={
              <>
                Nos domaines
                <br />
                d&apos;expertise
              </>
            }
            description="De la conception architecturale à la gestion locative, nous couvrons l'ensemble de la chaîne de valeur immobilière et d'ingénierie."
          />
          <div className={styles.servicesGrid}>
            {services.map(({ icon: Icon, title, description }) => (
              <article key={title} className={styles.serviceCard}>
                <span className={styles.serviceIcon}>
                  <Icon size={24} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ArrowRight className={styles.serviceArrow} size={19} />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader
            eyebrow="Notre portfolio"
            title={
              <>
                Réalisations
                <br />
                récentes
              </>
            }
          />
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <article
                key={project.name}
                className={`${styles.projectCard} ${
                  project.featured ? styles.featuredProject : ""
                }`}
              >
                <div className={styles.projectPattern} />
                <div className={styles.projectOverlay}>
                  <span className={styles.projectTag}>{project.tag}</span>
                  <h3>{project.name}</h3>
                  <p>
                    <MapPin size={12} /> {project.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.centerAction}>
            <Link href="/realisations" className={styles.goldButton}>
              Voir toutes les réalisations <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <section id="a-propos" className={styles.about}>
          <div className={styles.aboutGrid}>
            <div>
              <p className={styles.eyebrow}>Qui sommes-nous</p>
              <h2 className={styles.aboutTitle}>
                Construire la confiance,
                <br />
                projet après <em>projet</em>
              </h2>
              <p className={styles.aboutDescription}>
                Fondée à Douala, Perfect Immo & Engineering réunit des
                ingénieurs, architectes et experts immobiliers au service de vos
                ambitions. Notre approche allie rigueur technique et
                accompagnement personnalisé.
              </p>
              <div className={styles.valueList}>
                {values.map((value) => (
                  <div key={value} className={styles.valueItem}>
                    <span />
                    {value}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.aboutStats}>
              {aboutStats.map(([number, label, detail]) => (
                <article key={label} className={styles.aboutStat}>
                  <strong>{number}</strong>
                  <div>
                    <h3>{label}</h3>
                    <p>{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.process}>
          <div className={styles.processHeader}>
            <p className={styles.centeredEyebrow}>Notre méthode</p>
            <h2>Comment nous travaillons</h2>
          </div>
          <div className={styles.processSteps}>
            {steps.map(([number, firstLine, secondLine], index) => (
              <div key={number} className={styles.processStep}>
                {index > 0 && <span className={styles.stepLine} />}
                <strong>{number}</strong>
                <p>
                  {firstLine}
                  <br />
                  {secondLine}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.whiteSection}`}>
          <SectionHeader
            eyebrow="Ils nous font confiance"
            title="Témoignages clients"
          />
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className={styles.testimonialCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.quote}>{testimonial.quote}</p>
                <div className={styles.author}>
                  <span>{testimonial.initials}</span>
                  <div>
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="blog" className={styles.section}>
          <SectionHeader eyebrow="Actualités & Conseil" title="Notre blog" />
          <div className={styles.blogGrid}>
            {posts.map(({ icon: Icon, category, title, date }) => (
              <article key={title} className={styles.blogCard}>
                <div className={styles.blogImage}>
                  <Icon size={36} />
                </div>
                <div className={styles.blogBody}>
                  <p className={styles.blogCategory}>{category}</p>
                  <h3>{title}</h3>
                  <time>{date}</time>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <p className={styles.ctaEyebrow}>Démarrez dès aujourd&apos;hui</p>
          <h2>
            Prêt à concrétiser
            <br />
            votre <em>projet ?</em>
          </h2>
          <p className={styles.ctaDescription}>
            Consultation gratuite · Devis sous 48h · Accompagnement de A à Z
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.goldButton}>
              Demander un devis gratuit <ArrowRight size={15} />
            </Link>
            <Link href="/services" className={styles.outlineButton}>
              Découvrir l&apos;entreprise
            </Link>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <div>
              <h2 className={styles.footerLogo}>
                Perfect Immo <em>&</em> Engineering
              </h2>
              <p className={styles.footerTagline}>
                Votre partenaire immobilier et d&apos;ingénierie de confiance à
                Douala, Cameroun. Excellence, rigueur et innovation.
              </p>
              <div className={styles.footerContact}>
                <p>
                  <MapPin size={13} /> Bonanjo, Douala, Cameroun
                </p>
                <a href="tel:+237676438342">
                  <Phone size={13} /> +237 676 438 342
                </a>
                <a href="mailto:contact@perfectimmo.cm">
                  <Mail size={13} /> contact@perfectimmo.cm
                </a>
              </div>
            </div>
            <FooterColumn
              title="Navigation"
              links={[
                ["Accueil", "/"],
                ["À propos", "/#a-propos"],
                ["Services", "/services"],
                ["Réalisations", "/realisations"],
                ["Projets", "/projets"],
                ["Blog", "/#blog"],
                ["Contact", "/contact"],
              ]}
            />
            <FooterColumn
              title="Services"
              links={[
                ["Vente immobilière", "/services"],
                ["Location", "/services"],
                ["Maîtrise d'oeuvre", "/services"],
                ["Études VRD", "/services"],
                ["Gestion locative", "/services"],
                ["Conseil & audit", "/services"],
              ]}
            />
          </div>
          <div className={styles.footerBottom}>
            <p>
              © 2025 Perfect Immo & Engineering · Tous droits réservés ·
              Mentions légales
            </p>
            <div className={styles.socials}>
              {[MessageCircle, Globe, Mail, Phone].map((Icon, index) => (
                <a key={index} href="#" aria-label={`Réseau social ${index + 1}`}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function BuildingPlaceholder() {
  return (
    <div className={styles.building}>
      <div className={styles.buildingTop} />
      <div className={styles.buildingBody}>
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className={styles.buildingWindow} />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <header className={styles.sectionHeader}>
      <p className={styles.sectionEyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className={styles.sectionDescription}>{description}</p>}
    </header>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className={styles.footerColumnTitle}>{title}</h3>
      <ul className={styles.footerLinks}>
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
