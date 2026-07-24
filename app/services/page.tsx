"use client";

import { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Banknote,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  Eye,
  FileCheck,
  FileText,
  Hammer,
  Home,
  KeyRound,
  MapPin,
  Menu,
  Plane,
  Plug,
  Plus,
  ReceiptText,
  Ruler,
  Scale,
  Send,
  ShieldCheck,
  Star,
  Store,
  Users,
  Wrench,
} from "lucide-react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import styles from "./services.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--services-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--services-sans",
  display: "swap",
});
  
type TabId = "TOPO" | "GNSS & GÉODÉSIE" | "CARTOGRAPHIE" | "ARCHITECTURE" | "LOCATION";

type ServiceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "TOPO", label: "TOPOGRAPHIE", icon: Home },
  { id: "GNSS & GÉODÉSIE", label: "GNSS & GÉODÉSIE", icon: Ruler },
  { id: "CARTOGRAPHIE", label: "CARTOGRAPHIE SIG", icon: KeyRound },
  { id: "ARCHITECTURE", label: "ARCHITECTURE", icon: BadgeCheck },
  { id: "LOCATION", label: "LOCATION D'ÉQUIPEMENTS", icon: ReceiptText },
];
  
const immobilierServices: ServiceItem[] = [
  {
    icon: Home,
    title: "Levés Topographiques",
    description:
      "Mesures de terrain, implantations, nivellement et plans topographiques.",
    tags: ["Terrain", "Implantation", "Nivellement"],
  },
  {
    icon: KeyRound,
    title: "Géodésie & GNSS",
    description:
      "Levés GNSS RTK, géoréférencement et contrôle de précision.",
    tags: ["RTK", "GNSS", "Géoréférencement"],
  },
  {
    icon: Store,
    title: "Cartographie & SIG",
    description:
      "Production de cartes numériques, analyse spatiale et bases de données.",
    tags: ["SIG", "Cartes", "Analyse"],
  },
  {
    icon: Building2,
    title: "Architecture & Études",
    description:
      "Plans architecturaux, études techniques et faisabilité.",
    tags: ["Plans", "Études", "Architecture"],
  },
  {
    icon: MapPin,
    title: "Implantation & VRD",
    description:
      "Implantation d'ouvrages, voiries et réseaux divers.",
    tags: ["VRD", "Chantier", "Implantation"],
  },
  {
    icon: Star,
    title: "Location d'Équipements",
    description:
      "Drone, GNSS, stations totales et matériel terrain.",
    tags: ["Drone", "GNSS", "Station Totale"],
  },
];
  
const engineeringServices: ServiceItem[] = [
  {
    icon: Hammer,
    title: "Levés GNSS RTK",
    description:
      "Acquisition de données GNSS avec précision centimétrique pour projets techniques.",
    tags: ["RTK", "GNSS", "Précision"],
  },
  {
    icon: Ruler,
    title: "Géoréférencement",
    description:
      "Référencement précis de terrains, ouvrages et infrastructures.",
    tags: ["Coordonnées", "SIG", "Référentiel"],
  },
  {
    icon: Building2,
    title: "Points de contrôle",
    description:
      "Installation et contrôle de repères géodésiques pour vos projets.",
    tags: ["Repères", "Contrôle", "Mesures"],
  },
  {
    icon: Building2,
    title: "Densification géodésique",
    description:
      "Extension de réseaux géodésiques pour zones d'aménagement.",
    tags: ["Réseau", "Géodésie", "Précision"],
  },
  {
    icon: Eye,
    title: "Implantation GNSS",
    description:
      "Implantation d'ouvrages, axes et points de chantier.",
    tags: ["Implantation", "Chantier", "GNSS"],
  },
  {
    icon: Plug,
    title: "Contrôle qualité",
    description:
      "Vérification des données, contrôle et validation des relevés.",
    tags: ["Contrôle", "Validation", "Qualité"],
  },
];
  
const managementServices: ServiceItem[] = [
  {
    icon: Users,
    title: "Cartographie numérique",
    description:
      "Création de cartes numériques professionnelles pour projets, études et aménagements.",
    tags: ["SIG", "Cartes", "Numérique"],
  },
  {
    icon: Banknote,
    title: "Analyse spatiale",
    description:
      "Traitement et analyse des données géographiques pour faciliter la prise de décision.",
    tags: ["Analyse", "Données", "Territoire"],
  },
  {
    icon: Wrench,
    title: "Cartographie thématique",
    description:
      "Production de cartes spécialisées : urbanisme, environnement, infrastructures et réseaux.",
    tags: ["Thématique", "Urbanisme", "Réseaux"],
  },
  {
    icon: FileText,
    title: "Bases de données SIG",
    description:
      "Conception et structuration de bases de données géographiques performantes.",
    tags: ["Base SIG", "Données", "GIS"],
  },
  {
    icon: BarChart3,
    title: "Mise à jour géospatiale",
    description:
      "Actualisation et maintenance des données géographiques de vos projets.",
    tags: ["Mise à jour", "Données", "Suivi"],
  },
  {
    icon: ShieldCheck,
    title: "Visualisation & reporting",
    description:
      "Présentation claire des données spatiales sous forme de cartes et tableaux d'analyse.",
    tags: ["Rapports", "Cartes", "Décision"],
  },
];
  
const consultingServices: ServiceItem[] = [
  {
    icon: FileCheck,
    title: "Plans architecturaux",
    description:
      "Conception de plans de maisons, immeubles, commerces et bâtiments administratifs selon vos besoins.",
    tags: ["Plans", "Conception"],
  },
  {
    icon: BarChart3,
    title: "Études de faisabilité",
    description:
      "Analyse technique, financière et réglementaire pour évaluer la viabilité de votre projet avant son lancement.",
    tags: ["Faisabilité", "Rentabilité"],
  },
  {
    icon: BadgeCheck,
    title: "Permis de construire",
    description:
      "Préparation et dépôt des dossiers administratifs nécessaires à l'obtention du permis de construire.",
    tags: ["Urbanisme", "Dossier"],
  },
  {
    icon: Banknote,
    title: "Modélisation 3D",
    description:
      "Visualisation réaliste de votre futur bâtiment grâce à des maquettes et rendus architecturaux 3D.",
    tags: ["3D", "Rendu"],
  },
  {
    icon: Scale,
    title: "Suivi administratif",
    description:
      "Accompagnement auprès des administrations et organismes compétents durant tout le projet.",
    tags: ["Suivi", "Formalités"],
  },
  {
    icon: Plane,
    title: "Assistance projet",
    description:
      "Conseils techniques et coordination des différents intervenants pour garantir le bon déroulement du projet.",
    tags: ["Coordination", "Support"],
  },
];
  
const immobilierFaqs: FaqItem[] = [
  {
    question: "Qu'est-ce qu'un levé topographique ?",
    answer:
      "Un levé topographique permet de relever avec précision les caractéristiques d'un terrain avant un projet de construction.",
  },
  {
    question: "Quelle précision obtenez-vous avec le GNSS RTK ?",
    answer:
      "La technologie RTK permet une précision centimétrique.",
  },
  {
    question: "Proposez-vous la location d'équipements ?",
    answer:
      "Oui. Nous proposons drones, récepteurs GNSS et stations totales.",
  },
];
  
const engineeringFaqs: FaqItem[] = [
  {
    question: "Quelle précision obtenez-vous avec le GNSS RTK ?",
    answer:
      "Nos levés GNSS RTK atteignent généralement une précision centimétrique selon les conditions du terrain.",
  },
  {
    question: "Intervenez-vous partout au Cameroun ?",
    answer:
      "Oui, nos équipes interviennent à Douala, Yaoundé et dans toutes les régions du Cameroun.",
  },
  {
    question:
      "Les données sont-elles compatibles avec AutoCAD et SIG ?",
    answer:
      "Oui, les données peuvent être livrées dans des formats compatibles AutoCAD, SIG et autres logiciels techniques.",
  },
];
  
const consultingFaqs: FaqItem[] = [
  {
    question: "Combien coûte un plan architectural ?",
    answer:
      "Le coût dépend de la superficie, du type de bâtiment et du niveau de détail demandé. Un devis personnalisé est établi après étude de votre projet.",
  },
  {
    question: "Pouvez-vous obtenir le permis de construire pour moi ?",
    answer:
      "Oui. Nous pouvons constituer le dossier technique et vous accompagner dans les démarches administratives jusqu'à l'obtention du permis.",
  },
];

const pricingPlans = [
  {
    name: "CARTOGRAPHIE",
    price: "6%",
    note: "Cartes de base pour projets simples.",
    features: [
      "Cartographie numérique",
      "Export PDF",
      "Géoréférencement",
      "Livraison rapide",
    ],
  },
  {
    name: "SIG AVANCÉ",
    price: "9%",
    note: "Analyses spatiales avancées et solutions géomatiques pour projets professionnels.",
    featured: true,
    features: [
      "Tout Cartographie inclus",
      "Analyse spatiale",
      "Base de données SIG",
      "Cartes thématiques",
      "Rapport techniqu",
    ],
  },
  {
    name: "PROJET SUR MESURE",
    price: "Sur devis",
    note: "Accompagnement complet pour projets complexes et grands territoires.",
    features: [
      "Études complexes",
      "Grand territoir",
      "Données multi-sources",
      "Accompagnement complet",
      "Support technique",
    ],
  },
];
  
const priceRows = [
  ["Drone DJI Mavic 3 Enterprise", "40 000 FCFA", "Per day"],
  ["GNSS RTK Receiver Pair", "20 000 FCFA", "Per day"],
  ["CORS GNSS Receiver", "10 000 FCFA", "5 days"],
  ["Total Station", "Quotation", "Per day"],
  ["Field Controller", "Included depending on equipment", "Per day"],
  ["Specialized Software", "Quotation", "Per project"],
  ["Technical Assistance", "Quotation", "Per mission"],
  ["Reservation & Consultation", "FREE", "Immediate"],
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("TOPO");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function selectTab(id: TabId) {
    setActiveTab(id);
    setOpenFaq(0);
  }

  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <div className={styles.site}>
        <ServicesNav />

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>›</span>
              <strong>Services</strong>
            </div>
            <p className={styles.eyebrow}>NOS PRESTATIONS</p>
            <h1>
              Des solutions <em>techniques</em>
              <br />
              pour tous vos projets
            </h1>
            <p className={styles.heroDescription}>
              Topographie, géodésie GNSS, cartographie SIG,
              architecture, implantation et location d&apos;équipements professionnels.
            </p>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.statsInner}>
            {[
              ["120+", "LEVÉS RÉALISÉS"],
              ["15 ans", "ANS D'EXPÉRIENCE"],
              ["6", "DOMAINES TECHNIQUES"],
              ["48h", "DE RÉPONSE"],
            ].map(([number, label]) => (
              <div key={label} className={styles.stat}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <nav className={styles.tabsBar} aria-label="Catégories de services">
          <div className={styles.tabsNav}>
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectTab(id)}
                className={`${styles.tabButton} ${
                  activeTab === id ? styles.activeTab : ""
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </nav>
  
        <section className={styles.panel}>
          {activeTab === "TOPO" && (
            <StandardPanel
              eyebrow="TOPOGRAPHIE & GÉOMATIQUE"
              title={
                <>
                  Levés topographiques
                  <br />
                  et implantation terrain
                </>
              }
              description="Mesures de terrain, implantations, nivellement et plans topographiques pour projets de construction et d'aménagement."
              featuredTitle={
                <>
                  Levés topographiques
                  <br />
                  professionnels
                </>
              }
              featuredDescription="Levés planimétriques et altimétriques, implantation d'ouvrages, nivellement de précision et plans détaillés."
              featuredPoints={[
                "Levés GNSS RTK de haute précision",
                "Implantation de bâtiments et infrastructures",
                "Nivellement de chantier",
                "Plans topographiques détaillés",
                "Contrôle et suivi d'exécution",
              ]}
              services={immobilierServices}
              processTitle="Notre processus d'acquisition"
              steps={[
                ["1", "Analyse", "de besoins"],
                ["2", "Reconnaissance", "terrain"],
                ["3", "Acquisition", "des données"],
                ["4", "Traitement &", "contrôle"],
                ["5", "Livraison des", "résultats"],
              ]}
              faqTitle="Questions fréquentes - Immobilier"
              faqs={immobilierFaqs}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            >
              <Testimonials />
            </StandardPanel>
          )}
  
          {activeTab === "GNSS & GÉODÉSIE" && (
            <StandardPanel
              eyebrow="GNSS & GÉODÉSIE"
              title={
                <>
                  Géodésie &
                  <br />
                  Positionnement GNSS
                </>
              }
              description="Levés GNSS RTK, géoréférencement, densification de réseaux géodésiques et contrôle de précision pour tous vos projets."
              featuredTitle={
                <>
                  Levés GNSS RTK
                  <br />
                  de haute précision
                </>
              }
              featuredDescription="Mesures GNSS centimétriques, géoréférencement de projets, implantation et contrôle géodésique."
              featuredPoints={[
                "Précision centimétrique RTK",
                "Géoréférencement de projets",
                "Mise en place de points de contrôle",
                "Densification géodésique",
                "Contrôle de précision et vérification",
              ]}
              services={engineeringServices}
              processTitle="NOTRE PROCESSUS GNSS"
              steps={[
                ["1", "Analyse du", "besoin"],
                ["2", "Préparation", "terrain"],
                ["3", " Acquisition", "GNSS"],
                ["4", "Traitement", "des données"],
                ["5", "Livraison", "des résultats"],
              ]}
              faqTitle="Questions fréquentes - Ingénierie"
              faqs={engineeringFaqs}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            >
              <Engagements />
            </StandardPanel>
          )}
    
          {activeTab === "CARTOGRAPHIE" && (
            <>
              <SectionHeading
                eyebrow="PÔLE CARTOGRAPHIE"
                title={
                  <>
                    Cartographie SIG
                    <br />
                    <em>et analyse spatiale</em>
                  </>
                }
                description="Valorisation et analyse de vos données spatiales. Production de cartes numériques, analyses SIG et gestion de bases de données géographiques."
              />
              <ServiceGrid services={managementServices} />
              <PricingCards />
            </>
          )}
  
          {activeTab === "ARCHITECTURE" && (
            <>
              <SectionHeading
                eyebrow="ARCHITECTURE"
                title={
                  <>
                    Architecture, études &
                    <br />
                    <em>conception</em>
                  </>
                }
                description="Conception architecturale, études techniques et accompagnement administratif pour concrétiser vos projets de construction."
              />
              <ServiceGrid services={consultingServices} />
              <ProcessBlock
                title="PROCESSUS ARCHITECTURAL"
                steps={[
                  ["1", "Prise de", "besoin"],
                  ["2", "Étude &", "conception"],
                  ["3", "Plans &", "validation"],
                  ["4", "Permis &", "formalités"],
                  ["5", "Suivi du", "projet"],
                ]}
              />
              <FaqBlock
                title="Questions fréquentes - Conseil"
                faqs={consultingFaqs}
                openFaq={openFaq}
                setOpenFaq={setOpenFaq}
              />
            </>
          )}
  
          {activeTab === "LOCATION" && <PricingTable />}
        </section>
  
        <section className={styles.ctaBand}>
          <div>
            <h2>
              {activeTab === "LOCATION" ? (
                <>
                  Need professional
                  <br />
                  surveying equipment?
                </>
              ) : (
                <>
                  Besoin d&apos;une expertise
                  <br />
                  pour votre projet ?
                </>
              )}
            </h2>
            <p>
              {activeTab === "LOCATION"
                ? "Drone • GNSS RTK • CORS • Total Stations • Mapping"
                : "Topographie • GNSS • Cartographie • Architecture • Équipements"}
            </p>
          </div>
          <Link href="/contact" className={styles.navyButton}>
            <Send size={16} /> Demander un devis
          </Link>
        </section>
  
        <footer className={styles.footer}>
          <p>© 2025 Perfect Immo & Engineering · Douala, Cameroun</p>
          <div>
            <a href="#">Mentions légales</a>
            <a href="#">Confidentialité</a>
            <a href="#">Sitemap</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

function ServicesNav() {
  return (
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
        <Link href="/" className={styles.navLink}>
          Accueil
        </Link>
        <Link
          href="/services"
          className={`${styles.navLink} ${styles.activeNavLink}`}
        >
          Services
        </Link>
        <Link href="/realisations" className={styles.navLink}>
          Réalisations
        </Link>
        <Link href="/projets" className={styles.navLink}>
          Projets
        </Link>
        <Link href="/contact" className={styles.navLink}>
          Contact
        </Link>
      </nav>
      <Link href="/contact" className={styles.navCta}>
        Devis gratuit
      </Link>
      <button className={styles.mobileToggle} aria-label="Menu">
        <Menu size={24} />
      </button>
    </header>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <div>{description}</div>
    </header>
  );
}

function StandardPanel({
  eyebrow,
  title,
  description,
  featuredTitle,
  featuredDescription,
  featuredPoints,
  services,
  processTitle,
  steps,
  faqTitle,
  faqs,
  openFaq,
  setOpenFaq,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  featuredTitle: React.ReactNode;
  featuredDescription: string;
  featuredPoints: string[];
  services: ServiceItem[];
  processTitle: string;
  steps: [string, string, string][];
  faqTitle: string;
  faqs: FaqItem[];
  openFaq: number | null;
  setOpenFaq: (index: number | null) => void;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <FeaturedService
        title={featuredTitle}
        description={featuredDescription}
        points={featuredPoints}
      />
      <ServiceGrid services={services} />
      <ProcessBlock title={processTitle} steps={steps} />
      {children}
      <FaqBlock
        title={faqTitle}
        faqs={faqs}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />
    </>
  );
}

function FeaturedService({
  title,
  description,
  points,
}: {
  title: React.ReactNode;
  description: string;
  points: string[];
}) {
  return (
    <article className={styles.featuredService}>
      <div>
        <p className={styles.featuredLabel}>PRESTATION PRINCIPALE</p>
        <h3>{title}</h3>
        <div className={styles.featuredDescription}>{description}</div>
        <Link href="/contact" className={styles.goldButton}>
          <Hammer size={16} /> Demander un devis
        </Link>
      </div>
      <div className={styles.featuredPoints}>
        {points.map((point) => (
          <div key={point}>
            <span />
            <p>{point}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
  
function ServiceGrid({ services }: { services: ServiceItem[] }) {
  return (
    <div className={styles.serviceGrid}>
      {services.map(({ icon: Icon, title, description, tags }) => (
        <article key={title} className={styles.serviceCard}>
          <span className={styles.serviceIcon}>
            <Icon size={22} />
          </span>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function ProcessBlock({
  title,
  steps,
}: {
  title: string;
  steps: [string, string, string][];
}) {
  return (
    <section className={styles.processBlock}>
      <h3>{title}</h3>
      <div className={styles.steps}>
        {steps.map(([number, first, second]) => (
          <div key={number} className={styles.step}>
            <strong>{number}</strong>
            <p>
              {first}
              <br />
              {second}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqBlock({
  title,
  faqs,
  openFaq,
  setOpenFaq,
}: {
  title: string;
  faqs: FaqItem[];
  openFaq: number | null;
  setOpenFaq: (index: number | null) => void;
}) {
  return (
    <section className={styles.faqBlock}>
      <h3>{title}</h3>
      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;
        return (
          <article
            key={faq.question}
            className={`${styles.faqItem} ${isOpen ? styles.openFaq : ""}`}
          >
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <strong>
                <Plus size={15} />
              </strong>
            </button>
            {isOpen && <p>{faq.answer}</p>}
          </article>
        );
      })}
    </section>
  );
}

function Testimonials() {
  return (
    <div className={styles.testimonials}>
      {[
        [
          "PIE a réalisé nos levés topographiques avec une excellente précision et dans les délais annoncés.",
          "Christelle Mbarga",
          "Acheteuse - Résidentiel",
        ],
        [
          "Leur expertise GNSS RTK nous a permis d'obtenir des résultats fiables pour notre chantier.",
          "Robert Tagne",
          "Investisseur - Commercial",
        ],
      ].map(([quote, name, role]) => (
        <article key={name}>
          <div>★★★★★</div>
          <p>{quote}</p>
          <strong>{name}</strong>
          <span>{role}</span>
        </article>
      ))}
    </div>
  );
}

function Engagements() {
  const items = [
    [ShieldCheck, "Précision RTK", "Précision centimétrique garantie sur les relevés."],
    [CalendarDays, "Rapidité d'exécution", "Acquisition rapide des données terrain."],
    [BarChart3, "Compatibilité SIG", "Export compatible SIG, DAO et BIM."],
    [Check, "Fiabilité des données", "Contrôle qualité avant livraison."],
  ] as const;
  
  return (
    <div className={styles.engagements}>
      {items.map(([Icon, title, description]) => (
        <article key={title}>
          <Icon size={26} />
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function PricingCards() {
  return (
    <div className={styles.pricingGrid}>
      {pricingPlans.map((plan) => (
        <article
          key={plan.name}
          className={`${styles.priceCard} ${
            plan.featured ? styles.featuredPrice : ""
          }`}
        >
          {plan.featured && <span className={styles.priceBadge}>Recommandé</span>}
          <h3>{plan.name}</h3>
          <strong className={plan.price === "Sur devis" ? styles.smallPrice : ""}>
            {plan.price}
          </strong>
          <p>{plan.note}</p>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <Check size={12} /> {feature}
              </li>
            ))}
          </ul>
          <Link href="/contact">Choisir</Link>
        </article>
      ))}
    </div>
  );
}

function PricingTable() {
  return (
    <>
      <SectionHeading
        eyebrow="Location d'équipements"
        title={
          <>
            Des équipements
            <br />
            professionnels
            <br />
            <em>à votre disposition</em>
          </>
        }
        description="Louez du matériel topographique de haute précision pour vos levés, implantations, contrôles et travaux de terrain."
      />
      <div className={styles.priceTable}>
        <div className={`${styles.priceRow} ${styles.priceHead}`}>
          <span>Equipment</span>
          <span>Price</span>
          <span>Duration</span>
        </div>
        {priceRows.map(([service, price, delay], index) => (
          <div
            key={service}
            className={`${styles.priceRow} ${
              index === priceRows.length - 1 ? styles.highlightRow : ""
            }`}
          >
            <span>{service}</span>
            <span>{price}</span>
            <span>{delay}</span>
          </div>
        ))}
      </div>
      <div className={styles.priceNote}>
        Equipment availability depends on stock. A rental agreement and
        security deposit may be required depending on the selected equipment.
      </div>
    </>
  );
}
