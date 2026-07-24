"use client";

import { useEffect, useMemo, useState } from "react";
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
import { api } from "@/lib/api/client";
import type { ApiRealisation } from "@/lib/api/types";
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
  | "topography"
  | "geodesy"
  | "gis"
  | "architecture"
  | "equipment";
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
    category: "topography",
    categoryLabel: "Topographie",
    year: 2024,
    surfaceValue: 420,
    surface: "420 ha",
    title: "Levé topographique - Zone industrielle de Bonabéri",
    location: "Douala",
    meta: [
      ["Surface", "420 ha"],
      ["Mission", "Levé complet"],
      ["Résultat", "Livré"],
    ],
    tags: ["Drone", "GPS RTK"],
    color: "#1E3A64",
    description:
      "Levé topographique complet d'une zone industrielle de 420 hectares à Douala, réalisé par drone et GPS RTK.",
    features: ["Drone", "GPS RTK", "Levé complet", "Mission livrée"],
    featured: true,
    award: "Mission livrée",
  },
  {
    id: "p1",
    category: "topography",
    categoryLabel: "Topographie",
    year: 2024,
    surfaceValue: 1.8,
    surface: "1,8 ha",
    title: "Implantation d’un immeuble R+8",
    location: "Douala",
    meta: [
      ["Surface", "1,8 ha"],
      ["Mission", "Implantation"],
      ["Résultat", "Précision ±2 cm"],
    ],
    tags: ["Implantation", "Station totale"],
    color: "#162F52",
    description:
      "Implantation topographique d'un immeuble R+8 sur une surface de 1,8 hectare avec une précision de ±2 cm.",
    features: ["Implantation", "Station totale", "Précision ±2 cm"],
  },
  {
    id: "p2",
    category: "geodesy",
    categoryLabel: "GNSS & Géodésie",
    year: 2023,
    surfaceValue: 125,
    surface: "125 points",
    title: "Réseau géodésique communal",
    location: "Yaoundé",
    meta: [
      ["Points", "125"],
      ["Mission", "GNSS"],
      ["Résultat", "Validé"],
    ],
    tags: ["GNSS", "Réseau"],
    color: "#1C3560",
    description:
      "Mise en place et validation d'un réseau géodésique communal composé de 125 points GNSS à Yaoundé.",
    features: ["GNSS", "Réseau", "125 points", "Mission validée"],
  },
  {
    id: "p3",
    category: "gis",
    categoryLabel: "Cartographie SIG",
    year: 2023,
    surfaceValue: 180,
    surface: "180 km²",
    title: "Cartographie SIG d’une commune",
    location: "Kribi",
    meta: [
      ["Surface", "180 km²"],
      ["Mission", "SIG"],
      ["Résultat", "Base livrée"],
    ],
    tags: ["SIG", "QGIS"],
    color: "#0F2A4A",
    description:
      "Cartographie SIG d'une commune couvrant 180 km² à Kribi, avec constitution et livraison de la base de données.",
    features: ["SIG", "QGIS", "Base de données", "180 km²"],
  },
  {
    id: "p4",
    category: "topography",
    categoryLabel: "Topographie",
    year: 2023,
    surfaceValue: 55,
    surface: "55 ha",
    title: "Lotissement résidentiel",
    location: "Douala",
    meta: [
      ["Surface", "55 ha"],
      ["Mission", "Bornage"],
      ["Résultat", "Plans livrés"],
    ],
    tags: ["Bornage", "Cadastre"],
    color: "#182E50",
    description:
      "Mission de bornage d'un lotissement résidentiel de 55 hectares à Douala, avec production des plans cadastraux.",
    features: ["Bornage", "Cadastre", "55 ha", "Plans livrés"],
  },
  {
    id: "p5",
    category: "architecture",
    categoryLabel: "Architecture",
    year: 2023,
    surfaceValue: 4800,
    surface: "4 800 m²",
    title: "Plans d’un complexe scolaire",
    location: "Douala",
    meta: [
      ["Surface", "4 800 m²"],
      ["Mission", "Architecture"],
      ["Résultat", "Permis préparé"],
    ],
    tags: ["Plans", "Permis"],
    color: "#112440",
    description:
      "Conception des plans architecturaux d'un complexe scolaire de 4 800 m² et préparation du dossier de permis.",
    features: ["Plans", "Permis", "Architecture", "4 800 m²"],
  },
  {
    id: "p6",
    category: "gis",
    categoryLabel: "Cartographie SIG",
    year: 2022,
    surfaceValue: 48,
    surface: "48 km",
    title: "Cartographie des réseaux d’eau",
    location: "Douala",
    meta: [
      ["Réseau", "48 km"],
      ["Mission", "SIG"],
      ["Résultat", "Données structurées"],
    ],
    tags: ["AEP", "SIG"],
    color: "#0D2240",
    description:
      "Cartographie SIG de 48 km de réseaux d'eau à Douala et structuration des données géospatiales associées.",
    features: ["AEP", "SIG", "48 km", "Données structurées"],
  },
  {
    id: "p7",
    category: "topography",
    categoryLabel: "Topographie",
    year: 2022,
    surfaceValue: 32,
    surface: "32 km",
    title: "Étude corridor routier",
    location: "Bafoussam",
    meta: [
      ["Distance", "32 km"],
      ["Mission", "Levé"],
      ["Résultat", "Profil livré"],
    ],
    tags: ["Route", "Levé"],
    color: "#1A3260",
    description:
      "Levé topographique d'un corridor routier de 32 km à Bafoussam avec production du profil demandé.",
    features: ["Route", "Levé", "32 km", "Profil livré"],
  },
  {
    id: "p8",
    category: "equipment",
    categoryLabel: "Équipements",
    year: 2022,
    surfaceValue: 6,
    surface: "6 mois",
    title: "Location GPS RTK",
    location: "Douala",
    meta: [
      ["Durée", "6 mois"],
      ["Mission", "Location"],
      ["Résultat", "Matériel disponible"],
    ],
    tags: ["GPS", "RTK"],
    color: "#0E2442",
    description:
      "Mise à disposition d'un équipement GPS RTK à Douala pour une période de six mois.",
    features: ["GPS", "RTK", "Location", "6 mois"],
  },
  {
    id: "p9",
    category: "geodesy",
    categoryLabel: "GNSS & Géodésie",
    year: 2021,
    surfaceValue: 34,
    surface: "34 sites",
    title: "Implantation pylônes télécom",
    location: "Garoua",
    meta: [
      ["Sites", "34"],
      ["Mission", "GNSS"],
      ["Résultat", "Points validés"],
    ],
    tags: ["Télécom", "RTK"],
    color: "#102036",
    description:
      "Implantation GNSS de pylônes télécom sur 34 sites à Garoua avec validation des points RTK.",
    features: ["Télécom", "RTK", "34 sites", "Points validés"],
  },
  {
    id: "p10",
    category: "architecture",
    categoryLabel: "Architecture",
    year: 2021,
    surfaceValue: 6500,
    surface: "6 500 m²",
    title: "Étude d’un bâtiment administratif",
    location: "Douala",
    meta: [
      ["Surface", "6 500 m²"],
      ["Mission", "Étude"],
      ["Résultat", "Dossier livré"],
    ],
    tags: ["Architecture", "BIM"],
    color: "#13253E",
    description:
      "Étude architecturale et technique d'un bâtiment administratif de 6 500 m² à Douala avec dossier BIM livré.",
    features: ["Architecture", "BIM", "6 500 m²", "Dossier livré"],
  },
  {
    id: "p11",
    category: "gis",
    categoryLabel: "Cartographie SIG",
    year: 2021,
    surfaceValue: 720,
    surface: "720 ha",
    title: "SIG agricole",
    location: "Bafoussam",
    meta: [
      ["Surface", "720 ha"],
      ["Mission", "SIG"],
      ["Résultat", "Cartes livrées"],
    ],
    tags: ["Agriculture", "SIG"],
    color: "#192E54",
    description:
      "Développement d'un SIG agricole couvrant 720 hectares à Bafoussam avec production des cartes thématiques.",
    features: ["Agriculture", "SIG", "720 ha", "Cartes livrées"],
  },
  {
    id: "p12",
    category: "topography",
    categoryLabel: "Topographie",
    year: 2020,
    surfaceValue: 285,
    surface: "285 parcelles",
    title: "Bornage foncier",
    location: "Yaoundé",
    meta: [
      ["Parcelles", "285"],
      ["Mission", "Cadastre"],
      ["Résultat", "Bornes posées"],
    ],
    tags: ["Bornage", "Cadastre"],
    color: "#142848",
    description:
      "Mission cadastrale de bornage foncier portant sur 285 parcelles à Yaoundé avec pose des bornes.",
    features: ["Bornage", "Cadastre", "285 parcelles", "Bornes posées"],
  },
  {
    id: "p13",
    category: "geodesy",
    categoryLabel: "GNSS & Géodésie",
    year: 2020,
    surfaceValue: 92,
    surface: "92 points",
    title: "Contrôle géodésique barrage",
    location: "Lom Pangar",
    meta: [
      ["Points", "92"],
      ["Mission", "Contrôle"],
      ["Résultat", "Contrôle validé"],
    ],
    tags: ["GNSS", "Contrôle"],
    color: "#0C1E38",
    description:
      "Contrôle géodésique de 92 points sur le barrage de Lom Pangar avec validation des mesures GNSS.",
    features: ["GNSS", "Contrôle", "92 points", "Contrôle validé"],
  },
  {
    id: "p14",
    category: "equipment",
    categoryLabel: "Équipements",
    year: 2019,
    surfaceValue: 3,
    surface: "3 mois",
    title: "Location Station Totale Leica",
    location: "Douala",
    meta: [
      ["Durée", "3 mois"],
      ["Mission", "Location"],
      ["Résultat", "Équipement loué"],
    ],
    tags: ["Leica", "Station totale"],
    color: "#172C50",
    description:
      "Location d'une station totale Leica à Douala pour une mission professionnelle d'une durée de trois mois.",
    features: ["Leica", "Station totale", "Location", "3 mois"],
  },
];

const filterOptions: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "topography", label: "Topographie" },
  { id: "geodesy", label: "GNSS & Géodésie" },
  { id: "gis", label: "Cartographie SIG" },
  { id: "architecture", label: "Architecture" },
  { id: "equipment", label: "Équipements" },
];

function normalizeProjectCategory(category?: string | null): Category {
  const value = (category || "").toLowerCase();
  if (value.includes("gnss") || value.includes("gÃ©od")) return "geodesy";
  if (value.includes("sig") || value.includes("cart")) return "gis";
  if (value.includes("arch")) return "architecture";
  if (value.includes("equip") || value.includes("Ã©quip")) return "equipment";
  return "topography";
}

function getCategoryLabel(category: Category) {
  return (
    filterOptions.find((option) => option.id === category)?.label ||
    "Topographie"
  );
}

function mapApiRealisation(project: ApiRealisation, index: number): Project {
  const primaryService = project.servicesUsed[0] || null;
  const category = normalizeProjectCategory(primaryService);
  const year = new Date(project.completionDate || project.createdAt).getFullYear();
  const label = getCategoryLabel(category);

  return {
    id: project.id,
    category,
    categoryLabel: label,
    year,
    surfaceValue: 0,
    surface: "Mission",
    title: project.title,
    location: project.location || "Cameroun",
    meta: [
      ["AnnÃ©e", String(year)],
      ["Mission", primaryService || label],
      ["RÃ©sultat", "LivrÃ©"],
    ],
    tags: project.servicesUsed.length ? project.servicesUsed : [label, "PIE"],
    color: ["#1E3A64", "#162F52", "#1C3560", "#0F2A4A"][index % 4],
    description: project.description,
    features: project.servicesUsed.length
      ? project.servicesUsed
      : [label, "Ã‰tude", "Livrable"],
    featured: project.featured || index === 0,
    award: index === 0 ? "Mission livrÃ©e" : undefined,
  };
}

export default function RealisationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>(projects);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      try {
        const data = await api.getRealisations();
        if (active && data.length) {
          setPortfolioProjects(data.map(mapApiRealisation));
        }
      } catch {
        if (active) setPortfolioProjects(projects);
      }
    }

    loadProjects();

    return () => {
      active = false;
    };
  }, []);

  const counts = useMemo(
    () =>
      filterOptions.reduce<Record<Filter, number>>(
        (result, option) => {
          result[option.id] =
            option.id === "all"
              ? portfolioProjects.length
              : portfolioProjects.filter((project) => project.category === option.id)
                  .length;
          return result;
        },
        {
          all: 0,
          topography: 0,
          geodesy: 0,
          gis: 0,
          architecture: 0,
          equipment: 0,
        },
      ),
    [portfolioProjects],
  );

  const visibleProjects = useMemo(() => {
    const filtered =
      filter === "all"
        ? [...portfolioProjects]
        : portfolioProjects.filter((project) => project.category === filter);

    return filtered.sort((a, b) => {
      if (sort === "oldest") return a.year - b.year;
      if (sort === "surface") return b.surfaceValue - a.surfaceValue;
      return b.year - a.year;
    });
  }, [filter, portfolioProjects, sort]);

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
            <p className={styles.eyebrow}>Nos réalisations</p>
            <h1>
              Nos <em>réalisations sur le terrain</em>
              <br />
              témoignent de notre expertise
            </h1>
            <p className={styles.heroDescription}>
              Découvrez quelques-unes de nos missions en topographie, géodésie,
              cartographie SIG, architecture, études techniques et
              accompagnement de projets réalisées au Cameroun.
            </p>
            <div className={styles.heroStats}>
              {[
                ["250+", "Missions réalisées"],
                ["3 500+", "Ha levés"],
                ["15", "Ans d'expérience"],
                ["98%", "Clients satisfaits"],
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
              Confiez votre prochain
              <br />
              projet à nos experts
            </h2>
            <p>
              Étude gratuite • Réponse rapide • Intervention partout au
              Cameroun
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
      initials: "JN",
      quote:
        "PIE a réalisé le levé topographique de notre site industriel avec une grande précision. Les livrables étaient conformes aux délais et parfaitement exploitables.",
      name: "Jean-Paul Nzambe",
      role: "Chef de projet - Entreprise BTP",
    },
    {
      initials: "MN",
      quote:
        "Grâce à leur expertise en cartographie SIG, nous disposons aujourd’hui d’une base de données géospatiale fiable qui facilite la gestion de nos infrastructures.",
      name: "Marie Ndzie",
      role: "Responsable SIG - Collectivité locale",
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
