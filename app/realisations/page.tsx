"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  MapPin,
  Menu,
  Phone,
  Plus,
  Send,
  X,
} from "lucide-react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import styles from "./realisations.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--portfolio-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--portfolio-sans",
  display: "swap",
});

type Category =
  | "residential"
  | "commercial"
  | "industrial"
  | "infrastructure";
type Filter = "all" | Category;
type Sort = "recent" | "oldest" | "surface";

type Project = {
  id: string;
  category: Category;
  categoryLabel: string;
  year: number;
  surfaceValue: number;
  surface: string;
  title: string;
  location: string;
  meta: [string, string][];
  tags: string[];
  color: string;
  description: string;
  features: string[];
  featured?: boolean;
  award?: string;
};

const projects: Project[] = [
  {
    id: "p0",
    category: "commercial",
    categoryLabel: "Commercial",
    year: 2024,
    surfaceValue: 5200,
    surface: "5 200 m²",
    title: "Tour Bonanjo Business Center",
    location: "Bonanjo, Douala",
    meta: [
      ["Surface", "5 200 m²"],
      ["Niveaux", "8"],
      ["Budget", "850M FCFA"],
    ],
    tags: ["Bureaux", "Climatisation", "Parking"],
    color: "#1E3A64",
    description:
      "Immeuble de bureaux de prestige au coeur de Bonanjo. Huit niveaux climatisés, ascenseurs panoramiques, parking souterrain et plateaux modulables.",
    features: [
      "8 niveaux",
      "Climatisation centrale",
      "Ascenseurs panoramiques",
      "Parking souterrain",
      "Fibre optique",
      "Sécurité 24h",
    ],
    featured: true,
    award: "Livré en avance",
  },
  {
    id: "p1",
    category: "residential",
    categoryLabel: "Résidentiel",
    year: 2024,
    surfaceValue: 650,
    surface: "650 m²",
    title: "Villa Prestige - Bastos",
    location: "Bastos, Yaoundé",
    meta: [
      ["Surface", "650 m²"],
      ["Chambres", "7"],
      ["Budget", "120M FCFA"],
    ],
    tags: ["Piscine", "Jardin", "Standing"],
    color: "#162F52",
    description:
      "Villa de standing dans le quartier diplomatique de Bastos. Architecture contemporaine, piscine à débordement et jardin paysagé.",
    features: [
      "Piscine à débordement",
      "Jardin paysagé",
      "Double garage",
      "Cuisine équipée",
      "Groupe électrogène",
    ],
  },
  {
    id: "p2",
    category: "residential",
    categoryLabel: "Résidentiel",
    year: 2023,
    surfaceValue: 3800,
    surface: "3 800 m²",
    title: "Résidence Les Palmiers",
    location: "Akwa Nord, Douala",
    meta: [
      ["Surface", "3 800 m²"],
      ["Unités", "24 appts"],
      ["Budget", "480M FCFA"],
    ],
    tags: ["R+4", "Ascenseur", "Parking"],
    color: "#1C3560",
    description:
      "Résidence R+4 de 24 appartements à Akwa Nord, vendue intégralement trois mois après livraison.",
    features: [
      "24 appartements",
      "Gardiennage 24h",
      "Parking sécurisé",
      "Ascenseur",
      "Espaces verts",
    ],
  },
  {
    id: "p3",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    year: 2023,
    surfaceValue: 4200,
    surface: "4,2 km",
    title: "Route Ndokoti - VRD & Voirie",
    location: "Ndokoti, Douala",
    meta: [
      ["Longueur", "4,2 km"],
      ["Réseau", "VRD complet"],
      ["Budget", "320M FCFA"],
    ],
    tags: ["Voirie", "Assainissement", "Éclairage"],
    color: "#0F2A4A",
    description:
      "Réhabilitation complète de la voirie et des réseaux divers : chaussée bitumée, assainissement pluvial et éclairage public.",
    features: [
      "Voirie bitumée",
      "Assainissement pluvial",
      "Éclairage public",
      "Trottoirs",
      "Signalisation",
    ],
  },
  {
    id: "p4",
    category: "commercial",
    categoryLabel: "Commercial",
    year: 2022,
    surfaceValue: 2100,
    surface: "2 100 m²",
    title: "Centre Commercial Bonapriso",
    location: "Bonapriso, Douala",
    meta: [
      ["Surface", "2 100 m²"],
      ["Boutiques", "18"],
      ["Budget", "290M FCFA"],
    ],
    tags: ["Commerce", "Food court", "Parking"],
    color: "#182E50",
    description:
      "Centre commercial de 18 boutiques avec parking de 60 places et food court, conçu pour fluidifier les circulations.",
    features: [
      "18 boutiques",
      "Parking 60 places",
      "Food court",
      "Climatisation",
      "Sécurité 24h",
    ],
  },
  {
    id: "p5",
    category: "industrial",
    categoryLabel: "Industriel",
    year: 2022,
    surfaceValue: 8500,
    surface: "8 500 m²",
    title: "Entrepôt logistique - Zone Industrielle",
    location: "Bassa, Douala",
    meta: [
      ["Surface", "8 500 m²"],
      ["Quais", "12"],
      ["Budget", "650M FCFA"],
    ],
    tags: ["Logistique", "Charpente", "Stockage"],
    color: "#112440",
    description:
      "Entrepôt logistique avec 12 quais de chargement, structure métallique et toiture isolée pour la manutention lourde.",
    features: [
      "12 quais",
      "Structure métallique",
      "Toiture isolée",
      "Sol renforcé",
      "Vidéosurveillance",
    ],
  },
  {
    id: "p6",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    year: 2022,
    surfaceValue: 6000,
    surface: "6 km",
    title: "Réseau AEP - Quartier Logpom",
    location: "Logpom, Douala",
    meta: [
      ["Réseau", "6 km"],
      ["Foyers", "1 200"],
      ["Budget", "180M FCFA"],
    ],
    tags: ["AEP", "Pompage", "Raccordement"],
    color: "#0D2240",
    description:
      "Extension du réseau d'eau potable desservant 1 200 foyers, avec station de pompage et raccordements individuels.",
    features: [
      "6 km de réseau",
      "1 200 foyers",
      "Station de pompage",
      "Compteurs installés",
    ],
  },
  {
    id: "p7",
    category: "residential",
    categoryLabel: "Résidentiel",
    year: 2021,
    surfaceValue: 1200,
    surface: "1 200 m²",
    title: "Villa Duplex - Kotto",
    location: "Kotto, Douala",
    meta: [
      ["Terrain", "1 200 m²"],
      ["Chambres", "4"],
      ["Budget", "95M FCFA"],
    ],
    tags: ["Duplex", "Terrasse", "Clé en main"],
    color: "#1A3260",
    description:
      "Duplex contemporain avec terrasse privative, suite parentale et dressing intégré dans un quartier sécurisé.",
    features: [
      "Terrasse privative",
      "Suite parentale",
      "Dressing",
      "2 parkings",
    ],
  },
  {
    id: "p8",
    category: "commercial",
    categoryLabel: "Commercial",
    year: 2021,
    surfaceValue: 900,
    surface: "900 m²",
    title: "Immeuble de Bureaux - Akwa",
    location: "Akwa, Douala",
    meta: [
      ["Surface", "900 m²"],
      ["Niveaux", "R+3"],
      ["Budget", "110M FCFA"],
    ],
    tags: ["Bureaux", "Ascenseur", "Modulable"],
    color: "#0E2442",
    description:
      "Immeuble de bureaux R+3 au coeur d'Akwa, avec climatisation centrale et plateaux modulables.",
    features: [
      "R+3",
      "Climatisation centrale",
      "Plateaux modulables",
      "Parking",
      "Ascenseur",
    ],
  },
  {
    id: "p9",
    category: "industrial",
    categoryLabel: "Industriel",
    year: 2021,
    surfaceValue: 3200,
    surface: "3 200 m²",
    title: "Usine de traitement - Dibamba",
    location: "Dibamba, Douala",
    meta: [
      ["Surface", "3 200 m²"],
      ["Capacité", "50t/j"],
      ["Budget", "420M FCFA"],
    ],
    tags: ["Usine", "Béton armé", "Stockage"],
    color: "#102036",
    description:
      "Unité de traitement industriel d'une capacité de 50 tonnes par jour, conçue pour les contraintes lourdes.",
    features: [
      "Capacité 50t/jour",
      "Béton armé renforcé",
      "Zones de stockage",
      "Bureaux administratifs",
    ],
  },
  {
    id: "p10",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    year: 2020,
    surfaceValue: 45,
    surface: "45 m",
    title: "Pont piétonnier - Makepe",
    location: "Makepe, Douala",
    meta: [
      ["Portée", "45 m"],
      ["Largeur", "4 m"],
      ["Budget", "75M FCFA"],
    ],
    tags: ["Génie civil", "LED", "Accès PMR"],
    color: "#13253E",
    description:
      "Pont piétonnier reliant deux quartiers de Makepe avec garde-corps sécurisés, éclairage LED et accès PMR.",
    features: [
      "45 m de portée",
      "Garde-corps sécurisés",
      "Éclairage LED",
      "Accès PMR",
    ],
  },
  {
    id: "p11",
    category: "residential",
    categoryLabel: "Résidentiel",
    year: 2020,
    surfaceValue: 560,
    surface: "560 m²",
    title: "Villa Bali - New Bell",
    location: "New Bell, Douala",
    meta: [
      ["Surface", "560 m²"],
      ["Chambres", "4"],
      ["Budget", "55M FCFA"],
    ],
    tags: ["Résidentiel", "Clé en main"],
    color: "#192E54",
    description:
      "Villa familiale clé en main avec quatre chambres, cuisine équipée, cour intérieure et garage.",
    features: ["4 chambres", "Cuisine équipée", "Cour intérieure", "Garage"],
  },
  {
    id: "p12",
    category: "commercial",
    categoryLabel: "Commercial",
    year: 2020,
    surfaceValue: 1400,
    surface: "1 400 m²",
    title: "Complexe Hôtelier - Kribi",
    location: "Centre-ville, Kribi",
    meta: [
      ["Surface", "1 400 m²"],
      ["Chambres", "32"],
      ["Budget", "195M FCFA"],
    ],
    tags: ["Hôtellerie", "Piscine"],
    color: "#142848",
    description:
      "Complexe hôtelier de 32 chambres en bord de mer avec piscine, restaurant, bar et salle de conférence.",
    features: [
      "32 chambres",
      "Piscine",
      "Restaurant",
      "Salle de conférence",
      "Vue mer",
    ],
  },
  {
    id: "p13",
    category: "industrial",
    categoryLabel: "Industriel",
    year: 2019,
    surfaceValue: 4600,
    surface: "4 600 m²",
    title: "Plateforme industrielle - Yassa",
    location: "Yassa, Douala",
    meta: [
      ["Surface", "4 600 m²"],
      ["Ateliers", "6"],
      ["Budget", "520M FCFA"],
    ],
    tags: ["Industrie lourde", "Charpente"],
    color: "#0C1E38",
    description:
      "Plateforme industrielle comprenant six ateliers indépendants, charpente métallique lourde et quais dédiés.",
    features: [
      "6 ateliers",
      "Charpente métallique",
      "Quais de chargement",
      "Aire de stockage",
    ],
  },
  {
    id: "p14",
    category: "residential",
    categoryLabel: "Résidentiel",
    year: 2019,
    surfaceValue: 2400,
    surface: "2 400 m²",
    title: "Résidence Mboppi - 2 tours",
    location: "Mboppi, Douala",
    meta: [
      ["Surface", "2 400 m²"],
      ["Unités", "16 appts"],
      ["Budget", "210M FCFA"],
    ],
    tags: ["R+5", "Ascenseur"],
    color: "#172C50",
    description:
      "Programme de deux tours R+5 totalisant 16 appartements avec ascenseur, parking et espaces verts.",
    features: [
      "2 tours R+5",
      "16 appartements",
      "Ascenseur",
      "Parking commun",
      "Gardiennage",
    ],
  },
];

const filterOptions: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "residential", label: "Résidentiel" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industriel" },
  { id: "infrastructure", label: "Infrastructures" },
];

export default function RealisationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const counts = useMemo(
    () =>
      filterOptions.reduce<Record<Filter, number>>(
        (result, option) => {
          result[option.id] =
            option.id === "all"
              ? projects.length
              : projects.filter((project) => project.category === option.id)
                  .length;
          return result;
        },
        {
          all: 0,
          residential: 0,
          commercial: 0,
          industrial: 0,
          infrastructure: 0,
        },
      ),
    [],
  );

  const visibleProjects = useMemo(() => {
    const filtered =
      filter === "all"
        ? [...projects]
        : projects.filter((project) => project.category === filter);

    return filtered.sort((a, b) => {
      if (sort === "oldest") return a.year - b.year;
      if (sort === "surface") return b.surfaceValue - a.surfaceValue;
      return b.year - a.year;
    });
  }, [filter, sort]);

  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <div className={styles.site}>
        <PortfolioNav />

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>›</span>
              <strong>Réalisations</strong>
            </div>
            <p className={styles.eyebrow}>Notre portfolio</p>
            <h1>
              Nos <em>réalisations</em>
              <br />
              parlent pour nous
            </h1>
            <p className={styles.heroDescription}>
              Plus de 120 projets livrés à Douala, Yaoundé et dans les grandes
              villes du Cameroun. Chaque projet est une démonstration de notre
              exigence.
            </p>
            <div className={styles.heroStats}>
              {[
                ["120+", "Projets livrés"],
                ["85k", "m² construits"],
                ["15", "Ans d'expérience"],
                ["98%", "Satisfaction client"],
              ].map(([number, label]) => (
                <div key={label}>
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className={styles.filterBar} aria-label="Filtres des réalisations">
          <div className={styles.filterTabs}>
            {filterOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={filter === option.id ? styles.activeFilter : ""}
              >
                {option.label}
                <span>{counts[option.id]}</span>
              </button>
            ))}
          </div>
        </nav>

        <section className={styles.sortRow}>
          <div>
            <p>
              Affichage : <strong>{visibleProjects.length}</strong> projets
            </p>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              aria-label="Trier les projets"
            >
              <option value="recent">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="surface">Par superficie</option>
            </select>
          </div>
        </section>

        <section className={styles.gallery}>
          <div className={styles.galleryGrid}>
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={filter === "all" && project.featured}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
            {visibleProjects.length === 0 && (
              <div className={styles.emptyState}>
                <Building2 size={40} />
                <p>Aucun projet dans cette catégorie pour le moment.</p>
              </div>
            )}
          </div>
        </section>

        <div className={styles.moreWrap}>
          <Link href="/contact" className={styles.moreButton}>
            <Plus size={16} />
            Voir plus de projets (2015-2018)
            <ArrowRight size={14} />
          </Link>
        </div>

        <Testimonials />

        <section className={styles.cta}>
          <div>
            <h2>
              Votre projet sera notre
              <br />
              prochaine réalisation
            </h2>
            <p>Consultation gratuite · Devis sous 48h</p>
          </div>
          <Link href="/contact" className={styles.navyButton}>
            <Send size={16} /> Démarrer mon projet
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

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}

function PortfolioNav() {
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
        <Link href="/services" className={styles.navLink}>
          Services
        </Link>
        <Link
          href="/realisations"
          className={`${styles.navLink} ${styles.activeNavLink}`}
        >
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

function ProjectCard({
  project,
  featured,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`${styles.projectCard} ${
        featured ? styles.featuredProject : ""
      }`}
    >
      <div
        className={styles.projectImage}
        style={{ backgroundColor: project.color }}
      >
        <span className={styles.projectPattern} />
        <span className={styles.projectOverlay} />
        <span className={styles.typeBadge}>{project.categoryLabel}</span>
        <span className={styles.yearBadge}>{project.year}</span>
        {project.award && (
          <span className={styles.award}>
            <Award size={13} /> {project.award}
          </span>
        )}
      </div>
      <div className={styles.projectBody}>
        <h2>{project.title}</h2>
        <p className={styles.location}>
          <MapPin size={13} /> {project.location}
        </p>
        <div className={styles.projectMeta}>
          {project.meta.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className={styles.projectFooter}>
          <div>
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <strong>
            Voir <ArrowRight size={13} />
          </strong>
        </div>
      </div>
    </button>
  );
}

function Testimonials() {
  const testimonials = [
    {
      initials: "AB",
      quote:
        "La Tour Bonanjo a été livrée avec 2 semaines d'avance sur le planning initial. L'équipe a géré chaque détail avec une précision remarquable.",
      name: "Alain Biyidi",
      role: "Directeur, SCI Bonanjo Tower",
    },
    {
      initials: "PN",
      quote:
        "Nos 24 appartements des Palmiers se sont vendus en 3 mois. La qualité de construction rassure immédiatement les acheteurs.",
      name: "Patricia Nkengne",
      role: "Promotrice, Groupe Nkengne",
    },
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsInner}>
        <header>
          <p className={styles.eyebrow}>Ce que disent nos clients</p>
          <h2>Témoignages sur nos réalisations</h2>
        </header>
        <div className={styles.testimonialGrid}>
          {testimonials.map((item) => (
            <article key={item.name}>
              <div className={styles.stars}>★★★★★</div>
              <p>{item.quote}</p>
              <footer>
                <span>{item.initials}</span>
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className={styles.modalOverlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <header>
          <div>
            <p>
              {project.categoryLabel} · {project.year}
            </p>
            <h2>{project.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer">
            <X size={17} />
          </button>
        </header>
        <div
          className={styles.modalImage}
          style={{ backgroundColor: project.color }}
        >
          <span className={styles.projectPattern} />
        </div>
        <div className={styles.modalBody}>
          <h3>{project.title}</h3>
          <p className={styles.modalLocation}>
            <MapPin size={13} /> {project.location}
          </p>
          <div className={styles.modalSpecs}>
            {project.meta.map(([label, value]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <h4>Description</h4>
          <p className={styles.modalDescription}>{project.description}</p>
          <div className={styles.modalFeatures}>
            {project.features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
          <div className={styles.modalActions}>
            <Link href="/contact">
              <Send size={15} /> Démarrer un projet similaire
            </Link>
            <Link href="/contact">
              <Phone size={15} /> Être rappelé
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
