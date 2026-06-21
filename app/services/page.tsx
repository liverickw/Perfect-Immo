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

type TabId = "immo" | "ingenierie" | "gestion" | "conseil" | "tarifs";

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
  { id: "immo", label: "Immobilier", icon: Home },
  { id: "ingenierie", label: "Ingénierie", icon: Ruler },
  { id: "gestion", label: "Gestion locative", icon: KeyRound },
  { id: "conseil", label: "Conseil & Études", icon: BadgeCheck },
  { id: "tarifs", label: "Tarifs", icon: ReceiptText },
];

const immobilierServices: ServiceItem[] = [
  {
    icon: Home,
    title: "Résidentiel - Vente",
    description:
      "Villas, appartements F2 à F6, duplex, terrains viabilisés. Zones : Bonapriso, Bastos, Akwa, Kotto, Makepe.",
    tags: ["Villa", "Appartement", "Terrain"],
  },
  {
    icon: KeyRound,
    title: "Résidentiel - Location",
    description:
      "Location longue durée, location meublée, colocation sécurisée. Contrats de bail conformes au droit camerounais.",
    tags: ["Longue durée", "Meublé", "Bail"],
  },
  {
    icon: Store,
    title: "Commercial - Vente",
    description:
      "Immeubles de bureaux, locaux commerciaux, entrepôts et espaces industriels. Évaluation gratuite incluse.",
    tags: ["Bureaux", "Commerce", "Entrepôt"],
  },
  {
    icon: Building2,
    title: "Commercial - Location",
    description:
      "Location de bureaux équipés, espaces de coworking, surfaces commerciales en pied d'immeuble.",
    tags: ["Coworking", "Pied immeuble"],
  },
  {
    icon: MapPin,
    title: "Estimation immobilière",
    description:
      "Expertise et estimation de la valeur vénale de votre bien selon les prix du marché doualaien. Rapport certifié.",
    tags: ["Expertise", "Rapport", "Certifié"],
  },
  {
    icon: Star,
    title: "Programmes neufs",
    description:
      "Vente sur plans (VEFA) de nos programmes résidentiels. Paiement échelonné disponible selon conditions.",
    tags: ["VEFA", "Échelonné", "Neuf"],
  },
];

const engineeringServices: ServiceItem[] = [
  {
    icon: Hammer,
    title: "Maîtrise d'oeuvre",
    description:
      "Direction et coordination complète du chantier, de l'appel d'offres à la livraison. Suivi budgétaire en temps réel.",
    tags: ["Coordination", "Planning"],
  },
  {
    icon: Ruler,
    title: "Études structurelles",
    description:
      "Calculs béton armé, charpente métallique, fondations profondes et spéciales. Logiciels ETABS, ROBOT, AutoCAD.",
    tags: ["Béton armé", "Charpente"],
  },
  {
    icon: Building2,
    title: "VRD & Réseaux",
    description:
      "Voirie, réseaux divers : assainissement, eau potable, électricité BT/MT, télécom. Levés topographiques.",
    tags: ["VRD", "Assainissement", "AEP"],
  },
  {
    icon: Building2,
    title: "Architecture & Plans",
    description:
      "Conception architecturale, plans d'exécution, permis de construire, dépouillement des offres des entreprises.",
    tags: ["Plans", "3D", "Permis"],
  },
  {
    icon: Eye,
    title: "Contrôle technique",
    description:
      "Inspection béton, contrôle qualité matériaux, essais de charge et rapports certifiés pour maîtres d'ouvrage.",
    tags: ["Inspection", "Qualité"],
  },
  {
    icon: Plug,
    title: "Fluides & Électricité",
    description:
      "Climatisation CVC, plomberie sanitaire, électricité courants forts/faibles, groupes électrogènes et solaire.",
    tags: ["CVC", "Électricité", "Solaire"],
  },
];

const managementServices: ServiceItem[] = [
  {
    icon: Users,
    title: "Recherche de locataires",
    description:
      "Sélection rigoureuse des candidats : vérification solvabilité, référencement et état des lieux d'entrée.",
    tags: ["Sélection", "Solvabilité"],
  },
  {
    icon: Banknote,
    title: "Perception des loyers",
    description:
      "Encaissement mensuel, relances impayés, reversement propriétaire avec relevé de compte détaillé.",
    tags: ["Loyers", "Relevé"],
  },
  {
    icon: Wrench,
    title: "Entretien & réparations",
    description:
      "Réseau d'artisans certifiés pour interventions rapides. Devis validé avant tout engagement de dépense.",
    tags: ["Maintenance", "Artisans"],
  },
  {
    icon: FileText,
    title: "Suivi juridique & baux",
    description:
      "Rédaction des baux, renouvellements et gestion des contentieux locatifs avec notre service juridique.",
    tags: ["Baux", "Juridique"],
  },
  {
    icon: BarChart3,
    title: "Rapports trimestriels",
    description:
      "Reporting complet : taux d'occupation, revenus, dépenses et rentabilité nette de votre patrimoine.",
    tags: ["Reporting", "Rentabilité"],
  },
  {
    icon: ShieldCheck,
    title: "Assurance vacance",
    description:
      "Garantie loyers impayés et protection juridique propriétaire incluses dans nos formules Premium.",
    tags: ["GLI", "Protection"],
  },
];

const consultingServices: ServiceItem[] = [
  {
    icon: FileCheck,
    title: "Audit technique",
    description:
      "Diagnostic complet d'un bâtiment existant : structure, toiture, fluides, humidité. Rapport certifié.",
    tags: ["Diagnostic", "Rapport"],
  },
  {
    icon: BarChart3,
    title: "Étude de faisabilité",
    description:
      "Analyse technique, financière et réglementaire de votre projet avant tout engagement.",
    tags: ["Faisabilité", "Rentabilité"],
  },
  {
    icon: BadgeCheck,
    title: "Permis de construire",
    description:
      "Constitution et dépôt du dossier de permis auprès des services de l'urbanisme de Douala.",
    tags: ["Urbanisme", "Dossier"],
  },
  {
    icon: Banknote,
    title: "Conseil en investissement",
    description:
      "Analyse du marché immobilier local, recommandations d'acquisition et optimisation du rendement.",
    tags: ["Marché", "Rendement"],
  },
  {
    icon: Scale,
    title: "Assistance juridique",
    description:
      "Vérification des titres fonciers, sécurisation des transactions et conseils OHADA.",
    tags: ["Titre foncier", "OHADA"],
  },
  {
    icon: Plane,
    title: "Service diaspora",
    description:
      "Investissement à distance, visites virtuelles, mandats de représentation et remises de clés.",
    tags: ["Diaspora", "À distance"],
  },
];

const immobilierFaqs: FaqItem[] = [
  {
    question: "Quels documents faut-il pour acheter un bien à Douala ?",
    answer:
      "Pour l'achat : CNI ou passeport valide, justificatif de domicile, preuves de revenus et apport initial si financement bancaire. Nous vous guidons dans la constitution du dossier notarial complet.",
  },
  {
    question: "Quel est le délai moyen pour finaliser une vente immobilière ?",
    answer:
      "En moyenne 4 à 8 semaines entre la signature du compromis et l'acte définitif chez le notaire, selon la disponibilité des documents et le financement.",
  },
  {
    question: "Proposez-vous des visites en dehors de Douala ?",
    answer:
      "Oui. Nous intervenons à Yaoundé, Kribi, Bafoussam et Limbé. Pour la diaspora, nous proposons des visites virtuelles en vidéo HD et des mandats de représentation.",
  },
];

const engineeringFaqs: FaqItem[] = [
  {
    question: "Quel est le coût d'une mission de maîtrise d'oeuvre ?",
    answer:
      "Les honoraires varient généralement entre 8% et 12% du montant HT des travaux, selon la complexité du projet. Un devis détaillé est établi après étude du programme.",
  },
  {
    question: "Intervenez-vous en dehors de Douala sur des chantiers ?",
    answer:
      "Oui, nos équipes interviennent sur l'ensemble du territoire camerounais. Des frais de déplacement peuvent s'appliquer au-delà de 100 km de Douala.",
  },
  {
    question:
      "Travaillez-vous avec les entreprises de construction existantes du client ?",
    answer:
      "Oui. Nous pouvons assurer le contrôle et la supervision même si vous avez déjà sélectionné votre entreprise, en qualité d'assistant à maîtrise d'ouvrage.",
  },
];

const consultingFaqs: FaqItem[] = [
  {
    question: "Comment vérifier la fiabilité d'un titre foncier au Cameroun ?",
    answer:
      "Nous vérifions l'authenticité du titre, l'absence d'hypothèque, les limites cadastrales et l'identité du propriétaire auprès de la Conservation Foncière compétente.",
  },
  {
    question: "Pouvez-vous m'aider à investir depuis la France ou les USA ?",
    answer:
      "Oui. Notre service diaspora inclut visites virtuelles HD, mandat de représentation notarié, coordination bancaire et remise des clés en votre absence.",
  },
];

const pricingPlans = [
  {
    name: "Essentiel",
    price: "6%",
    note: "des loyers encaissés / mois",
    features: [
      "Recherche locataire",
      "État des lieux",
      "Rédaction bail",
      "Encaissement loyers",
      "Relevé mensuel",
    ],
  },
  {
    name: "Premium",
    price: "9%",
    note: "des loyers encaissés / mois",
    featured: true,
    features: [
      "Tout Essentiel inclus",
      "Entretien courant",
      "Suivi juridique",
      "Rapport trimestriel",
      "GLI incluse",
    ],
  },
  {
    name: "Patrimoine",
    price: "Sur devis",
    note: "pour 5 biens et plus",
    features: [
      "Tout Premium inclus",
      "Gestionnaire dédié",
      "Optimisation fiscale",
      "Bilan annuel certifié",
      "Tarif préférentiel",
    ],
  },
];

const priceRows = [
  ["Transaction immobilière (vente)", "3 à 5 %", "4-8 semaines"],
  ["Transaction immobilière (location)", "1 mois loyer", "1-3 semaines"],
  ["Maîtrise d'oeuvre", "8 à 12 %", "Selon projet"],
  ["Études structurelles", "Sur devis", "2-4 semaines"],
  ["Gestion locative Essentiel", "6 % / mois", "Continu"],
  ["Gestion locative Premium", "9 % / mois", "Continu"],
  ["Audit technique bâtiment", "Sur devis", "5-10 jours"],
  ["Consultation initiale", "GRATUITE", "Sous 24h"],
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("immo");
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
            <p className={styles.eyebrow}>Notre expertise</p>
            <h1>
              Des services <em>complets</em>
              <br />
              de A à Z
            </h1>
            <p className={styles.heroDescription}>
              Immobilier résidentiel, commercial, maîtrise d&apos;oeuvre, études
              d&apos;ingénierie - une seule adresse pour tous vos projets à
              Douala et au Cameroun.
            </p>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.statsInner}>
            {[
              ["120+", "Projets livrés"],
              ["15 ans", "Expérience"],
              ["6", "Pôles d'expertise"],
              ["48h", "Délai devis"],
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
          {activeTab === "immo" && (
            <StandardPanel
              eyebrow="Pôle Immobilier"
              title={
                <>
                  Vente & Location
                  <br />
                  de biens immobiliers
                </>
              }
              description="Résidentiel, commercial ou industriel - nous vous accompagnons à chaque étape, de la recherche à la signature de l'acte."
              featuredTitle={
                <>
                  Vente clé en main
                  <br />
                  résidentielle
                </>
              }
              featuredDescription="Villas, appartements, duplex et programmes neufs à Douala, Yaoundé et Kribi. Accompagnement notarial inclus."
              featuredPoints={[
                "Portefeuille de 80+ biens actifs à Douala",
                "Visites organisées sous 48h",
                "Accompagnement complet jusqu'à l'acte notarié",
                "Financement bancaire facilité",
                "Garantie juridique sur tous les titres fonciers",
              ]}
              services={immobilierServices}
              processTitle="Notre processus d'acquisition"
              steps={[
                ["1", "Analyse", "de besoins"],
                ["2", "Sélection", "de biens"],
                ["3", "Visite", "guidée"],
                ["4", "Offre &", "négociation"],
                ["5", "Acte", "notarié"],
              ]}
              faqTitle="Questions fréquentes - Immobilier"
              faqs={immobilierFaqs}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            >
              <Testimonials />
            </StandardPanel>
          )}

          {activeTab === "ingenierie" && (
            <StandardPanel
              eyebrow="Pôle Ingénierie"
              title={
                <>
                  Maîtrise d&apos;oeuvre &
                  <br />
                  Ingénierie technique
                </>
              }
              description="De la conception à la livraison, nos ingénieurs certifiés pilotent vos chantiers avec rigueur, respect du budget et des délais."
              featuredTitle={
                <>
                  Maîtrise d&apos;oeuvre
                  <br />
                  complète
                </>
              }
              featuredDescription="Pilotage intégral de votre projet : conception, coordination des corps de métier, suivi de chantier et réception des travaux."
              featuredPoints={[
                "12 ingénieurs certifiés (génie civil, structure, VRD)",
                "Respect du budget ± 5% garanti contractuellement",
                "Rapports de chantier hebdomadaires digitaux",
                "Assurance décennale et responsabilité civile",
                "Conformité normes camerounaises & OHADA",
              ]}
              services={engineeringServices}
              processTitle="Notre processus d'ingénierie"
              steps={[
                ["1", "Consultation", "technique"],
                ["2", "Études &", "conception"],
                ["3", "Appel", "d'offres"],
                ["4", "Exécution", "chantier"],
                ["5", "Réception &", "garantie"],
              ]}
              faqTitle="Questions fréquentes - Ingénierie"
              faqs={engineeringFaqs}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            >
              <Engagements />
            </StandardPanel>
          )}

          {activeTab === "gestion" && (
            <>
              <SectionHeading
                eyebrow="Pôle Gestion"
                title={
                  <>
                    Gestion locative
                    <br />
                    <em>sans tracas</em>
                  </>
                }
                description="Confiez-nous votre patrimoine immobilier. Nous gérons tout : locataires, loyers, entretien et aspects juridiques."
              />
              <ServiceGrid services={managementServices} />
              <PricingCards />
            </>
          )}

          {activeTab === "conseil" && (
            <>
              <SectionHeading
                eyebrow="Pôle Conseil"
                title={
                  <>
                    Études, conseil &
                    <br />
                    <em>accompagnement</em>
                  </>
                }
                description="Expertise technique et juridique pour sécuriser vos décisions d'investissement immobilier et de construction au Cameroun."
              />
              <ServiceGrid services={consultingServices} />
              <ProcessBlock
                title="Processus d'étude & conseil"
                steps={[
                  ["1", "Briefing", "initial"],
                  ["2", "Collecte", "données"],
                  ["3", "Analyse", "technique"],
                  ["4", "Rapport &", "recommandations"],
                  ["5", "Suivi &", "mise en oeuvre"],
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

          {activeTab === "tarifs" && <PricingTable />}
        </section>

        <section className={styles.ctaBand}>
          <div>
            <h2>
              Consultation gratuite
              <br />
              sans engagement
            </h2>
            <p>Réponse sous 24h · Devis sous 48h</p>
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
        <p className={styles.featuredLabel}>Service phare</p>
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
          "J'ai trouvé ma villa à Kotto en 3 semaines. L'équipe est très professionnelle et rassurante dans les démarches.",
          "Christelle Mbarga",
          "Acheteuse - Résidentiel",
        ],
        [
          "Nos locaux commerciaux à Akwa ont été loués en 10 jours. Service rapide et suivi impeccable du bail.",
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
    [ShieldCheck, "Assurance décennale", "Couverture complète 10 ans sur tous nos ouvrages livrés"],
    [CalendarDays, "Respect des délais", "Pénalités contractuelles en cas de retard imputable à PI&E"],
    [BarChart3, "Reporting digital", "Rapport de chantier chaque vendredi avec photos et avancement"],
    [Check, "Normes & conformité", "Respect strict des normes camerounaises, DTU et EUROCODE"],
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
        eyebrow="Nos honoraires"
        title={
          <>
            Tarifs clairs &
            <br />
            <em>transparents</em>
          </>
        }
        description="Pas de frais cachés. Tous nos tarifs sont annoncés dès la première consultation et formalisés dans un contrat de mission signé."
      />
      <div className={styles.priceTable}>
        <div className={`${styles.priceRow} ${styles.priceHead}`}>
          <span>Service</span>
          <span>Tarif</span>
          <span>Délai</span>
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
        <strong>Note :</strong> Tous les tarifs sont exprimés hors TVA. Le taux
        applicable au Cameroun est de 19,25 %. Un devis détaillé et un contrat
        de mission sont établis avant toute prestation.
      </div>
    </>
  );
}
