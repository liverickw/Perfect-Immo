import type { HomepageContent, OrderedItem } from "@/lib/api/types";

export const defaultHomepageContent: HomepageContent = {
  status: "PUBLISHED",
  hero: {
    badge: "TOPOGRAPHIE • ARCHITECTURE • IMMOBILIER",
    eyebrow: "GÉOMATIQUE & INGÉNIERIE",
    titlePrefix: "La précision au",
    titleSuffix: "service de",
    highlightedTitle: "vos Projets",
    description:
      "PIE accompagne les projets de topographie, géodésie GNSS, cartographie SIG, architecture, immobilier et ingénierie partout au Cameroun.",
    primaryCtaLabel: "Voir nos projets",
    primaryCtaHref: "/projets",
    secondaryCtaLabel: "Nous contacter",
    secondaryCtaHref: "/contact",
    mediaUrl: "",
    mediaAlt: "Photo HD ici",
    stats: [
      { value: "120+", label: "LEVÉS RÉALISÉS", order: 1 },
      { value: "15", label: "ANS D'EXPÉRIENCE", order: 2 },
      { value: "500+", label: "Clients", order: 3 },
      { value: "85k", label: "PRÉCISION RTK", order: 4 },
    ],
  },
  whatsapp: {
    href: "https://wa.me/237676438342",
    label: "WhatsApp - Réponse en moins de 2h",
    detail: "+237 676 438 342 · Lun-Sam 8h-18h",
  },
  expertise: {
    eyebrow: "Ce que nous faisons",
    titleLine1: "Nos domaines",
    titleLine2: "d'expertise",
    description:
      "De la topographie de terrain à la cartographie numérique, nous accompagnons les projets d'infrastructure, de construction et d'aménagement.",
    services: [
      {
        icon: "Hammer",
        title: "Levés Topographiques",
        description: "Mesures de terrain, implantations, nivellement et plans topographiques.",
        order: 1,
      },
      {
        icon: "Building2",
        title: "Géodésie & GNSS",
        description: "Levés GNSS RTK, géoréférencement et contrôle de précision.",
        order: 2,
      },
      {
        icon: "Ruler",
        title: "Cartographie & SIG",
        description:
          "Production de cartes numériques, analyse spatiale et bases de données géographiques.",
        order: 3,
      },
      {
        icon: "Home",
        title: "Architecture & Immobilier",
        description: "Conception architecturale, études techniques et accompagnement immobilier.",
        order: 4,
      },
      {
        icon: "KeyRound",
        title: "Implantation & VRD",
        description: "Implantation d'ouvrages, voiries et réseaux divers.",
        order: 5,
      },
      {
        icon: "BadgeCheck",
        title: "Location d'Équipements",
        description: "Drone, GNSS RTK, stations totales et matériel topographique.",
        order: 6,
      },
    ],
  },
  portfolio: {
    eyebrow: "Notre portfolio",
    titleLine1: "Réalisations",
    titleLine2: "récentes",
    ctaLabel: "Voir toutes les réalisations",
    ctaHref: "/realisations",
    projects: [
      {
        tag: "Résidentiel · 2024",
        name: "Campagne de Levés Topographiques",
        location: "Douala • 150 ha cartographiés",
        featured: true,
        order: 1,
      },
      {
        tag: "Commercial · 2023",
        name: "Implantation d'Infrastructures",
        location: "Bonanjo • Bâtiments et réseaux",
        featured: false,
        order: 2,
      },
      {
        tag: "Infrastructure · 2023",
        name: "Projet Géodésie GNSS RTK",
        location: "Douala • Réseau de points de contrôle",
        featured: false,
        order: 3,
      },
    ],
  },
  about: {
    eyebrow: "Qui sommes-nous",
    titleLine1: "Mesurer avec précision,",
    titleLine2: "accompagner avec",
    highlightedTitle: "expertise",
    description:
      "Perfect Immo & Engineering SARL réunit des spécialistes en topographie, géodésie, cartographie, architecture et immobilier afin d'accompagner les projets publics et privés au Cameroun.",
    values: [
      { text: "Précision et fiabilité des mesures", order: 1 },
      { text: "Équipements professionnels de dernière génération", order: 2 },
      { text: "Solutions adaptées aux besoins de chaque projet", order: 3 },
    ],
    stats: [
      {
        value: "15",
        label: "Années d'expérience",
        detail: "dans l'immobilier & l'ingénierie au Cameroun",
        order: 1,
      },
      {
        value: "12",
        label: "Ingénieurs certifiés",
        detail: "génie civil, structure, VRD et bâtiment",
        order: 2,
      },
      {
        value: "98%",
        label: "Taux de satisfaction",
        detail: "mesuré auprès de nos clients depuis 2020",
        order: 3,
      },
    ],
  },
  process: {
    eyebrow: "Notre méthode",
    title: "Comment nous travaillons",
    steps: [
      { number: "1", firstLine: "Analyse", secondLine: "du besoin", order: 1 },
      { number: "2", firstLine: "Reconnaissance", secondLine: "terrain", order: 2 },
      { number: "3", firstLine: "Levés &", secondLine: "acquisition des données", order: 3 },
      { number: "4", firstLine: "Traitement &", secondLine: "vérification", order: 4 },
      { number: "5", firstLine: "Livraison des", secondLine: "résultats", order: 5 },
    ],
  },
  testimonials: {
    eyebrow: "Ils nous font confiance",
    title: "Témoignages clients",
    items: [
      {
        initials: "JE",
        name: "Jean-Marc Essomba",
        role: "PDG, Groupe Essomba",
        quote:
          "L'équipe PIE a réalisé nos levés topographiques avec une précision remarquable et dans les délais prévus.",
        order: 1,
      },
      {
        initials: "MN",
        name: "Marie Ngo Biyong",
        role: "Promotrice, SCI Palmier",
        quote:
          "Leur expertise GNSS et leur accompagnement technique ont été essentiels pour la réussite de notre projet.",
        order: 2,
      },
    ],
  },
  blog: {
    eyebrow: "Actualités & Conseil",
    title: "Notre blog",
    posts: [
      {
        icon: "Building2",
        category: "Marché",
        title: "Pourquoi la topographie est essentielle avant de construire",
        date: "14 mai 2025",
        order: 1,
      },
      {
        icon: "DraftingCompass",
        category: "Ingénierie",
        title: "GNSS RTK : comprendre la précision centimétrique",
        date: "2 avril 2025",
        order: 2,
      },
      {
        icon: "Banknote",
        category: "Conseils",
        title: "Cartographie SIG : un outil stratégique pour les projets modernes",
        date: "18 mars 2025",
        order: 3,
      },
    ],
  },
  finalCta: {
    eyebrow: "Démarrez dès aujourd'hui",
    titleLine1: "Besoin d'un expert en",
    titleLine2: "topographie ou",
    highlightedTitle: "géodésie ?",
    description: "Conseil gratuit • Intervention rapide • Équipements professionnels",
    primaryCtaLabel: "Demander un devis gratuit",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "Découvrir l'entreprise",
    secondaryCtaHref: "/services",
  },
};

export function byDisplayOrder<T extends OrderedItem>(items: T[]) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
