"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  Grid2X2,
  Heart,
  List,
  Map,
  MapPin,
  Menu,
  Phone,
  Search,
  Send,
  X,
} from "lucide-react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import styles from "./projets.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--catalog-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--catalog-sans",
  display: "swap",
});

type PropertyStatus = "Disponible" | "Réservé" | "Programme neuf";
type View = "grid" | "list";
type Sort = "default" | "price-asc" | "price-desc" | "surface";

type Property = {
  id: string;
  ref: string;
  name: string;
  price: string;
  priceValue: number;
  priceNote: string;
  location: string;
  zone: string;
  type: string;
  typeLabel: string;
  transaction: string;
  status: PropertyStatus;
  surfaceValue: number;
  color: string;
  cardSpecs: [string, string][];
  modalSpecs: [string, string][];
  description: string;
  features: string[];
};

const programme: Property = {
  id: "p0",
  ref: "PIE-2025-PRG",
  name: "Résidence Horizon — Bonapriso",
  price: "À partir de 45 000 000 FCFA",
  priceValue: 45,
  priceNote: "Livraison prévue Q3 2026",
  location: "Bonapriso, Douala",
  zone: "bonapriso",
  type: "appartement",
  typeLabel: "Programme neuf",
  transaction: "vente",
  status: "Programme neuf",
  surfaceValue: 55,
  color: "#1A3260",
  cardSpecs: [],
  modalSpecs: [
    ["24", "Appartements"],
    ["F2–F4", "Typologies"],
    ["55–120 m²", "Surfaces"],
    ["R+6", "Hauteur"],
    ["Q3 2026", "Livraison"],
    ["Neuf", "Statut"],
  ],
  description:
    "Programme neuf R+6 de 24 appartements standing avec vue dégagée sur la ville. Typologies F2, F3 et F4. Livraison prévue Q3 2026. Paiement échelonné sur 36 mois disponible sous conditions.",
  features: [
    "R+6",
    "Vue panoramique",
    "24 appartements",
    "F2 à F4",
    "Ascenseur",
    "Parking souterrain",
    "Gardiennage",
    "Livraison Q3 2026",
  ],
};

const properties: Property[] = [
  {
    id: "p1",
    ref: "PIE-2025-001",
    name: "Villa Prestige — Bonapriso",
    price: "185 000 000 FCFA",
    priceValue: 185,
    priceNote: "soit ~282 000 €",
    location: "Bonapriso, Douala",
    zone: "bonapriso",
    type: "villa",
    typeLabel: "Villa",
    transaction: "vente",
    status: "Disponible",
    surfaceValue: 780,
    color: "#1A3260",
    cardSpecs: [
      ["780", "m²"],
      ["6", "Chambres"],
      ["3", "SDB"],
      ["Oui", "Piscine"],
    ],
    modalSpecs: [
      ["780 m²", "Surface"],
      ["6", "Chambres"],
      ["3", "Salles de bain"],
      ["Oui", "Piscine"],
      ["Titre foncier", "Juridique"],
      ["Disponible", "Statut"],
    ],
    description:
      "Magnifique villa de standing dans le quartier prisé de Bonapriso. Construction haute qualité, finitions premium, cuisine équipée, double garage, jardin paysagé et piscine. Idéale pour famille ou expatrié. Titre foncier disponible et vérifié.",
    features: [
      "Piscine",
      "Jardin paysagé",
      "Double garage",
      "Cuisine équipée",
      "Climatisation",
      "Groupe électrogène",
      "Titre foncier",
      "Gardiennage 24h",
    ],
  },
  {
    id: "p2",
    ref: "PIE-2025-002",
    name: "Appartement F3 — Akwa",
    price: "45 000 000 FCFA",
    priceValue: 45,
    priceNote: "soit ~68 600 €",
    location: "Akwa, Douala",
    zone: "akwa",
    type: "appartement",
    typeLabel: "Appartement",
    transaction: "vente",
    status: "Disponible",
    surfaceValue: 95,
    color: "#152B4E",
    cardSpecs: [
      ["95", "m²"],
      ["2", "Chambres"],
      ["2", "SDB"],
      ["3e", "Étage"],
    ],
    modalSpecs: [
      ["95 m²", "Surface"],
      ["2", "Chambres"],
      ["2", "SDB"],
      ["3e", "Étage"],
      ["Titre foncier", "Juridique"],
      ["Disponible", "Statut"],
    ],
    description:
      "Bel appartement F3 lumineux au 3e étage d'un immeuble sécurisé à Akwa. Double vitrage, parquet flottant, cuisine américaine équipée. Proche commerces, banques et transports. Idéal pour couple ou jeune famille.",
    features: [
      "3e étage",
      "Parquet flottant",
      "Cuisine américaine",
      "Double vitrage",
      "Gardiennage",
      "Interphone",
      "Titre foncier",
    ],
  },
  {
    id: "p3",
    ref: "PIE-2025-003",
    name: "Villa Standing — Bastos",
    price: "4 500 000 FCFA/mois",
    priceValue: 4.5,
    priceNote: "charges non incluses",
    location: "Bastos, Yaoundé",
    zone: "bastos",
    type: "villa",
    typeLabel: "Villa",
    transaction: "location",
    status: "Disponible",
    surfaceValue: 450,
    color: "#1E3A64",
    cardSpecs: [
      ["450", "m²"],
      ["5", "Chambres"],
      ["3", "SDB"],
      ["Oui", "Piscine"],
    ],
    modalSpecs: [
      ["450 m²", "Surface"],
      ["5", "Chambres"],
      ["3", "SDB"],
      ["Oui", "Piscine"],
      ["Meublé", "Équipement"],
      ["Disponible", "Statut"],
    ],
    description:
      "Villa de haut standing en location à Bastos, quartier diplomatique de Yaoundé. Cinq chambres avec salles de bain privatives, salon de réception, piscine et grand jardin. Personnel de maison possible en option.",
    features: [
      "Piscine privée",
      "Grand jardin",
      "5 chambres en suite",
      "Salon de réception",
      "Cuisine professionnelle",
      "Groupe électrogène",
      "Sécurité 24h",
    ],
  },
  {
    id: "p4",
    ref: "PIE-2025-004",
    name: "Duplex Moderne — Makepe",
    price: "75 000 000 FCFA",
    priceValue: 75,
    priceNote: "soit ~114 300 €",
    location: "Makepe, Douala",
    zone: "makepe",
    type: "duplex",
    typeLabel: "Duplex",
    transaction: "vente",
    status: "Réservé",
    surfaceValue: 220,
    color: "#112238",
    cardSpecs: [
      ["220", "m²"],
      ["4", "Chambres"],
      ["2", "SDB"],
      ["2", "Niveaux"],
    ],
    modalSpecs: [
      ["220 m²", "Surface"],
      ["4", "Chambres"],
      ["2", "SDB"],
      ["2", "Niveaux"],
      ["Titre foncier", "Juridique"],
      ["Réservé", "Statut"],
    ],
    description:
      "Duplex moderne de 220 m² sur deux niveaux à Makepe Misoke. Architecture contemporaine, terrasse privative au premier étage, quatre chambres dont une suite parentale. Quartier résidentiel calme et sécurisé.",
    features: [
      "Terrasse privative",
      "Suite parentale",
      "Cuisine équipée",
      "Dressing",
      "2 parkings",
      "Quartier sécurisé",
    ],
  },
  {
    id: "p5",
    ref: "PIE-2025-005",
    name: "Bureaux Open Space — Akwa",
    price: "1 200 000 FCFA/mois",
    priceValue: 1.2,
    priceNote: "Plateau de bureaux open space",
    location: "Akwa Centre, Douala",
    zone: "akwa",
    type: "commercial",
    typeLabel: "Bureau",
    transaction: "location",
    status: "Disponible",
    surfaceValue: 180,
    color: "#0E2242",
    cardSpecs: [
      ["180", "m²"],
      ["2e", "Étage"],
      ["Clim.", "Équipé"],
      ["6", "Parkings"],
    ],
    modalSpecs: [
      ["180 m²", "Surface"],
      ["2e", "Étage"],
      ["6", "Parkings"],
      ["Open space", "Configuration"],
      ["Clim. centrale", "Équipement"],
      ["Disponible", "Statut"],
    ],
    description:
      "Plateau de bureaux open space de 180 m² au deuxième étage d'un immeuble de prestige au cœur d'Akwa. Climatisation centrale, câblage réseau, salle de réunion incluse et six places de parking sécurisées.",
    features: [
      "Climatisation centrale",
      "Câblage réseau",
      "Salle de réunion",
      "6 parkings",
      "Accueil commun",
      "Ascenseur",
      "Vigile 24h",
    ],
  },
  {
    id: "p6",
    ref: "PIE-2025-006",
    name: "Terrain viabilisé — Kotto",
    price: "28 000 000 FCFA",
    priceValue: 28,
    priceNote: "soit ~42 700 € · 46 667 FCFA/m²",
    location: "Kotto, Douala",
    zone: "kotto",
    type: "terrain",
    typeLabel: "Terrain",
    transaction: "vente",
    status: "Disponible",
    surfaceValue: 600,
    color: "#0D2040",
    cardSpecs: [
      ["600", "m²"],
      ["TF", "Titre"],
      ["Oui", "Viabilisé"],
      ["R+3", "COS"],
    ],
    modalSpecs: [
      ["600 m²", "Superficie"],
      ["Plat", "Profil"],
      ["R+3", "COS"],
      ["Titre foncier", "Juridique"],
      ["Viabilisé", "Réseaux"],
      ["Disponible", "Statut"],
    ],
    description:
      "Terrain de 600 m² plat et viabilisé à Kotto, avec titre foncier authentique. Eau, électricité et voirie devant la parcelle. COS permettant R+3. Idéal pour construction résidentielle ou petit immeuble de rapport.",
    features: [
      "Titre foncier",
      "Eau en façade",
      "Électricité",
      "Voirie bitumée",
      "Terrain plat",
      "R+3 autorisé",
    ],
  },
  {
    id: "p7",
    ref: "PIE-2025-007",
    name: "Appartement F2 meublé — Bali",
    price: "700 000 FCFA/mois",
    priceValue: 0.7,
    priceNote: "Charges comprises",
    location: "Bali, Douala",
    zone: "bali",
    type: "appartement",
    typeLabel: "Appartement",
    transaction: "location",
    status: "Disponible",
    surfaceValue: 68,
    color: "#172C52",
    cardSpecs: [
      ["68", "m²"],
      ["1", "Chambre"],
      ["Meublé", "Équipé"],
      ["1er", "Étage"],
    ],
    modalSpecs: [
      ["68 m²", "Surface"],
      ["1", "Chambre"],
      ["1er", "Étage"],
      ["Meublé", "Équipement"],
      ["Incluses", "Charges"],
      ["Disponible", "Statut"],
    ],
    description:
      "Appartement F2 entièrement meublé et équipé au premier étage, quartier Bali. Lit, canapé, télé, cuisine équipée et climatisation. Idéal pour célibataire, expatrié ou séjour professionnel. Disponible immédiatement.",
    features: [
      "Entièrement meublé",
      "Cuisine équipée",
      "Climatisation",
      "Internet fibre",
      "Eau chaude",
      "Disponible immédiatement",
    ],
  },
  {
    id: "p8",
    ref: "PIE-2025-008",
    name: "Villa Neuve R+1 — Kotto",
    price: "95 000 000 FCFA",
    priceValue: 95,
    priceNote: "soit ~144 900 € · Livraison déc. 2025",
    location: "Kotto, Douala",
    zone: "kotto",
    type: "villa",
    typeLabel: "Villa",
    transaction: "vente",
    status: "Programme neuf",
    surfaceValue: 380,
    color: "#192E56",
    cardSpecs: [
      ["380", "m²"],
      ["4", "Chambres"],
      ["3", "SDB"],
      ["R+1", "Niveaux"],
    ],
    modalSpecs: [
      ["380 m²", "Surface"],
      ["4", "Chambres"],
      ["3", "SDB"],
      ["R+1", "Niveaux"],
      ["Titre foncier", "Juridique"],
      ["Programme neuf", "Statut"],
    ],
    description:
      "Villa neuve R+1 dans un lotissement sécurisé à Kotto. Finitions haut de gamme, carrelage importé, cuisine américaine, terrasse couverte et garage double. Livraison prévue décembre 2025. Paiement échelonné possible.",
    features: [
      "Construction neuve",
      "Finitions premium",
      "Terrasse couverte",
      "Double garage",
      "Lotissement sécurisé",
      "Livraison déc. 2025",
      "Paiement échelonné",
    ],
  },
];

const initialFilters = {
  type: "",
  transaction: "",
  zone: "",
  budget: "",
  surface: "",
};

export default function ProjetsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [sort, setSort] = useState<Sort>("default");
  const [view, setView] = useState<View>("grid");
  const [selected, setSelected] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mapOpen, setMapOpen] = useState(false);

  const visibleProperties = useMemo(() => {
    const budget = Number(appliedFilters.budget || Number.POSITIVE_INFINITY);
    const surface = Number(appliedFilters.surface || 0);
    const filtered = properties.filter(
      (property) =>
        (!appliedFilters.type || property.type === appliedFilters.type) &&
        (!appliedFilters.transaction ||
          property.transaction === appliedFilters.transaction) &&
        (!appliedFilters.zone || property.zone === appliedFilters.zone) &&
        property.priceValue <= budget &&
        property.surfaceValue >= surface,
    );

    return filtered.sort((a, b) => {
      if (sort === "price-asc") return a.priceValue - b.priceValue;
      if (sort === "price-desc") return b.priceValue - a.priceValue;
      if (sort === "surface") return b.surfaceValue - a.surfaceValue;
      return properties.indexOf(a) - properties.indexOf(b);
    });
  }, [appliedFilters, sort]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <div className={styles.site}>
        <CatalogueNav />

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>›</span>
              <strong>Biens disponibles</strong>
            </div>
            <p className={styles.eyebrow}>Catalogue immobilier</p>
            <h1>
              Biens <em>disponibles</em>
              <br />à Douala & Cameroun
            </h1>
            <p>
              Vente et location résidentielle & commerciale. Tous nos biens
              sont vérifiés juridiquement avec titres fonciers garantis.
            </p>
          </div>
        </section>

        <section className={styles.stats}>
          <div>
            {[
              ["14", "Disponibles"],
              ["3", "Réservés"],
              ["2", "Programmes neufs"],
              ["48h", "Délai visite"],
            ].map(([number, label]) => (
              <article key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.searchPanel}>
          <div className={styles.searchInner}>
            <div className={styles.searchGrid}>
              <FilterSelect
                label="Type de bien"
                value={filters.type}
                onChange={(value) => updateFilter("type", value)}
                options={[
                  ["", "Tous types"],
                  ["villa", "Villa"],
                  ["appartement", "Appartement"],
                  ["duplex", "Duplex"],
                  ["commercial", "Commercial"],
                  ["terrain", "Terrain"],
                ]}
              />
              <FilterSelect
                label="Transaction"
                value={filters.transaction}
                onChange={(value) => updateFilter("transaction", value)}
                options={[
                  ["", "Vente & Location"],
                  ["vente", "Vente"],
                  ["location", "Location"],
                ]}
              />
              <FilterSelect
                label="Localisation"
                value={filters.zone}
                onChange={(value) => updateFilter("zone", value)}
                options={[
                  ["", "Toutes zones"],
                  ["bonapriso", "Bonapriso"],
                  ["bastos", "Bastos"],
                  ["akwa", "Akwa"],
                  ["kotto", "Kotto"],
                  ["makepe", "Makepe"],
                  ["bali", "Bali"],
                ]}
              />
            </div>
            <div className={styles.searchGridSecondary}>
              <FilterSelect
                label="Budget maximum"
                value={filters.budget}
                onChange={(value) => updateFilter("budget", value)}
                options={[
                  ["", "Tous budgets"],
                  ["10", "< 10M FCFA"],
                  ["50", "< 50M FCFA"],
                  ["100", "< 100M FCFA"],
                  ["300", "< 300M FCFA"],
                  ["500", "< 500M FCFA"],
                ]}
              />
              <FilterSelect
                label="Superficie minimum"
                value={filters.surface}
                onChange={(value) => updateFilter("surface", value)}
                options={[
                  ["", "Toutes surfaces"],
                  ["50", "50 m² et +"],
                  ["100", "100 m² et +"],
                  ["200", "200 m² et +"],
                  ["500", "500 m² et +"],
                ]}
              />
            </div>
            <div className={styles.searchActions}>
              <button
                type="button"
                onClick={() => setAppliedFilters(filters)}
                className={styles.searchButton}
              >
                <Search size={15} /> Rechercher
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className={styles.resetButton}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </section>

        <section className={styles.toolbar}>
          <div>
            <span>
              Affichage : <strong>{visibleProperties.length}</strong> biens
            </span>
            <div className={styles.viewToggle}>
              <button
                type="button"
                aria-label="Vue en grille"
                onClick={() => setView("grid")}
                className={view === "grid" ? styles.activeView : ""}
              >
                <Grid2X2 size={16} />
              </button>
              <button
                type="button"
                aria-label="Vue en liste"
                onClick={() => setView("list")}
                className={view === "list" ? styles.activeView : ""}
              >
                <List size={17} />
              </button>
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              aria-label="Trier les biens"
            >
              <option value="default">Trier par défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="surface">Plus grandes surfaces</option>
            </select>
          </div>
        </section>

        <section className={styles.listing}>
          <article className={styles.programme}>
            <div className={styles.ribbon}>Programme neuf</div>
            <p className={styles.eyebrow}>Lancement exclusif</p>
            <h2>Résidence Horizon — Bonapriso</h2>
            <p className={styles.programmeDescription}>
              24 appartements standing R+6 avec vue dégagée. Livraison prévue
              Q3 2026. Paiement échelonné sur 36 mois disponible.
            </p>
            <div className={styles.programmeDetails}>
              {[
                ["24", "Appartements"],
                ["F2–F4", "Typologies"],
                ["45M+", "À partir de (FCFA)"],
                ["Q3 2026", "Livraison"],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className={styles.programmeActions}>
              <button type="button" onClick={() => setSelected(programme)}>
                Voir le programme
              </button>
              <Link href="/contact">Réserver un appartement</Link>
            </div>
          </article>

          <div className={styles.alert}>
            <Bell size={18} />
            <p>
              Activez les <strong>alertes email</strong> pour être notifié en
              premier lors de l&apos;ajout de nouveaux biens correspondant à
              vos critères.{" "}
              <Link href="/contact">S&apos;inscrire aux alertes →</Link>
            </p>
          </div>

          {visibleProperties.length > 0 ? (
            <div
              className={
                view === "grid" ? styles.propertyGrid : styles.propertyList
              }
            >
              {visibleProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  list={view === "list"}
                  favorite={favorites.includes(property.id)}
                  onFavorite={() =>
                    setFavorites((current) =>
                      current.includes(property.id)
                        ? current.filter((id) => id !== property.id)
                        : [...current, property.id],
                    )
                  }
                  onOpen={() => setSelected(property)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Building2 size={38} />
              <p>
                Aucun bien ne correspond à vos critères.
                <br />
                Essayez d&apos;élargir votre recherche.
              </p>
            </div>
          )}
        </section>

        <section className={styles.mapSection}>
          <header>
            <h2>Localisation des biens</h2>
            <button type="button" onClick={() => setMapOpen(!mapOpen)}>
              <Map size={14} />
              {mapOpen ? "Masquer la carte" : "Afficher la carte"}
            </button>
          </header>
          {mapOpen && <PropertyMap />}
        </section>

        <section className={styles.cta}>
          <div>
            <h2>
              Vous ne trouvez pas
              <br />
              le bien idéal ?
            </h2>
            <p>Déposez votre recherche — nous vous contactons sous 24h</p>
          </div>
          <Link href="/contact">
            <Send size={16} /> Déposer ma recherche
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

      {selected && (
        <PropertyModal
          property={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}

function CatalogueNav() {
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
        <Link href="/">Accueil</Link>
        <Link href="/services">Services</Link>
        <Link href="/realisations">Réalisations</Link>
        <Link href="/projets" className={styles.activeNav}>
          Projets
        </Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link href="/contact" className={styles.navCta}>
        Devis gratuit
      </Link>
      <button type="button" className={styles.mobileToggle} aria-label="Menu">
        <Menu size={24} />
      </button>
    </header>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.filterField}>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionLabel} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function PropertyCard({
  property,
  list,
  favorite,
  onFavorite,
  onOpen,
}: {
  property: Property;
  list: boolean;
  favorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
}) {
  return (
    <article className={`${styles.propertyCard} ${list ? styles.listCard : ""}`}>
      <button
        type="button"
        onClick={onOpen}
        className={styles.propertyImage}
        style={{ backgroundColor: property.color }}
        aria-label={`Voir ${property.name}`}
      >
        <span className={styles.imagePattern} />
        <span className={styles.imageOverlay} />
        <span
          className={`${styles.status} ${
            property.status === "Disponible"
              ? styles.available
              : property.status === "Réservé"
                ? styles.reserved
                : styles.newStatus
          }`}
        >
          {property.status}
        </span>
        <span className={styles.typeTag}>
          {property.typeLabel} ·{" "}
          {property.transaction === "vente" ? "Vente" : "Location"}
        </span>
      </button>
      <button
        type="button"
        onClick={onFavorite}
        className={`${styles.favorite} ${favorite ? styles.favorited : ""}`}
        aria-label={
          favorite ? "Retirer des favoris" : "Ajouter aux favoris"
        }
      >
        <Heart size={16} fill={favorite ? "currentColor" : "none"} />
      </button>
      <button type="button" onClick={onOpen} className={styles.propertyBody}>
        <p className={styles.price}>{property.price}</p>
        <p className={styles.priceNote}>{property.priceNote}</p>
        <h2>{property.name}</h2>
        <p className={styles.location}>
          <MapPin size={13} /> {property.location}
        </p>
        <div className={styles.propertySpecs}>
          {property.cardSpecs.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <footer>
          <span>
            Voir détails <ArrowRight size={13} />
          </span>
          <small>Réf. {property.ref}</small>
        </footer>
      </button>
    </article>
  );
}

function PropertyMap() {
  const pins = [
    ["Bonapriso · 185M", "35%", "40%", "available"],
    ["Akwa · 45M", "52%", "55%", "available"],
    ["Akwa Bureau · 1.2M/mois", "62%", "38%", "available"],
    ["Makepe · Réservé", "45%", "65%", "reserved"],
    ["Kotto · 28M", "68%", "58%", "available"],
    ["Programme Bonapriso", "28%", "52%", "new"],
    ["Bali · 700k/mois", "55%", "72%", "available"],
    ["Villa neuve · 95M", "72%", "45%", "new"],
  ];

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapPlaceholder}>
        <span className={styles.mapGrid} />
        {pins.map(([label, left, top, status]) => (
          <span
            key={label}
            className={`${styles.mapPin} ${styles[`pin${status}`]}`}
            style={{ left, top }}
          >
            <span className={styles.pinLabel}>{label}</span>
          </span>
        ))}
        <p>DOUALA — Carte interactive (Google Maps en production)</p>
      </div>
      <div className={styles.legend}>
        <span>
          <i className={styles.greenDot} /> Disponible
        </span>
        <span>
          <i className={styles.amberDot} /> Réservé
        </span>
        <span>
          <i className={styles.goldDot} /> Programme neuf
        </span>
      </div>
    </div>
  );
}

function PropertyModal({
  property,
  onClose,
}: {
  property: Property;
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
            <p>Référence {property.ref}</p>
            <h2>{property.name}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer">
            <X size={17} />
          </button>
        </header>
        <div
          className={styles.modalImage}
          style={{ backgroundColor: property.color }}
        >
          <span className={styles.imagePattern} />
        </div>
        <div className={styles.modalBody}>
          <p className={styles.modalPrice}>{property.price}</p>
          <h3>{property.name}</h3>
          <p className={styles.modalLocation}>
            <MapPin size={13} /> {property.location}
          </p>
          <div className={styles.modalSpecs}>
            {property.modalSpecs.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <h4>Description</h4>
          <p className={styles.modalDescription}>{property.description}</p>
          <div className={styles.modalFeatures}>
            {property.features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
          <div className={styles.modalActions}>
            <Link href="/contact">
              <CalendarDays size={15} /> Demander une visite
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
