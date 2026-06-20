"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  Search,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";

const properties = [
  {
    name: "Villa Prestige - Bonapriso",
    type: "Villa",
    transaction: "Vente",
    status: "Disponible",
    location: "Bonapriso, Douala",
    price: "185 000 000 FCFA",
    surface: "780 m²",
    rooms: "6 chambres",
    ref: "PIE-2025-001",
  },
  {
    name: "Appartement F3 - Akwa",
    type: "Appartement",
    transaction: "Vente",
    status: "Disponible",
    location: "Akwa, Douala",
    price: "45 000 000 FCFA",
    surface: "95 m²",
    rooms: "2 chambres",
    ref: "PIE-2025-002",
  },
  {
    name: "Villa Standing - Bastos",
    type: "Villa",
    transaction: "Location",
    status: "Disponible",
    location: "Bastos, Yaoundé",
    price: "4 500 000 FCFA/mois",
    surface: "450 m²",
    rooms: "5 chambres",
    ref: "PIE-2025-003",
  },
  {
    name: "Terrain viabilisé - Kotto",
    type: "Terrain",
    transaction: "Vente",
    status: "Disponible",
    location: "Kotto, Douala",
    price: "28 000 000 FCFA",
    surface: "600 m²",
    rooms: "Titre foncier",
    ref: "PIE-2025-004",
  },
];

export default function ProjetsPage() {
  const [type, setType] = useState("");
  const [transaction, setTransaction] = useState("");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLocaleLowerCase("fr");
  const filtered = properties.filter((item) => {
    const matchesType = type ? item.type === type : true;
    const matchesTransaction = transaction
      ? item.transaction === transaction
      : true;
    const matchesQuery = normalizedQuery
      ? [item.name, item.location, item.type, item.ref].some((value) =>
          value.toLocaleLowerCase("fr").includes(normalizedQuery),
        )
      : true;

    return matchesType && matchesTransaction && matchesQuery;
  });

  return (
    <>
      <Navbar />

      <main className="bg-[#F6F5F0]">
        <section className="bg-[#071D36] text-white">
          <Container className="py-16 sm:py-20 lg:py-24">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#D2AD3D]">
              <span className="h-px w-7 bg-[#D2AD3D]" />
              Catalogue immobilier
            </p>

            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.12] sm:text-5xl lg:text-[58px]">
              Biens{" "}
              <span className="italic text-[#D2AD3D]">disponibles</span>
              <br />
              à Douala & Cameroun
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Vente et location résidentielle & commerciale. Tous nos biens
              sont vérifiés juridiquement avec titres fonciers garantis.
            </p>
          </Container>
        </section>

        <section className="bg-[#172F51] text-white">
          <Container className="grid grid-cols-2 sm:grid-cols-4">
            {[
              ["14", "Disponibles"],
              ["3", "Réservés"],
              ["2", "Programmes neufs"],
              ["48h", "Délai visite"],
            ].map(([number, label], index) => (
              <div
                key={label}
                className={`py-6 text-center sm:py-7 ${
                  index % 2 !== 0 ? "border-l border-white/10" : ""
                } ${index > 1 ? "border-t border-white/10 sm:border-t-0" : ""} ${
                  index > 0 ? "sm:border-l" : ""
                }`}
              >
                <p className="font-serif text-2xl font-semibold text-[#D2AD3D] sm:text-3xl">
                  {number}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/45 sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </Container>
        </section>

        <section className="border-b border-[#071D36]/10 bg-white py-7 sm:py-8">
          <Container className="grid gap-3 md:grid-cols-[1fr_1fr_1.35fr]">
            <select
              aria-label="Type de bien"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="h-12 w-full border border-[#071D36]/15 bg-white px-4 text-sm font-medium text-[#071D36] outline-none transition focus:border-[#D2AD3D]"
            >
              <option value="">Tous types</option>
              <option value="Villa">Villa</option>
              <option value="Appartement">Appartement</option>
              <option value="Terrain">Terrain</option>
            </select>

            <select
              aria-label="Type de transaction"
              value={transaction}
              onChange={(event) => setTransaction(event.target.value)}
              className="h-12 w-full border border-[#071D36]/15 bg-white px-4 text-sm font-medium text-[#071D36] outline-none transition focus:border-[#D2AD3D]"
            >
              <option value="">Vente & Location</option>
              <option value="Vente">Vente</option>
              <option value="Location">Location</option>
            </select>

            <label className="flex h-12 items-center bg-[#071D36] text-white transition focus-within:bg-[#172F51]">
              <Search size={17} className="ml-4 shrink-0 text-[#D2AD3D]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher"
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/45"
              />
              <span className="mr-4 hidden text-[10px] font-bold uppercase tracking-[0.14em] text-white/35 sm:block">
                Rechercher
              </span>
            </label>
          </Container>
        </section>

        <section className="bg-[#F6F5F0] py-16 lg:py-24">
          <Container>
            <article className="relative overflow-hidden rounded-lg bg-[#071D36] p-7 text-white sm:p-9 lg:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.035)_50%,rgba(255,255,255,0.035)_75%,transparent_75%,transparent)] bg-[length:36px_36px] opacity-30" />
              <div className="relative max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D2AD3D]">
                  Lancement exclusif
                </p>
                <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">
                  Résidence Horizon - Bonapriso
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
                  24 appartements standing R+6 avec vue dégagée. Livraison
                  prévue Q3 2026. Paiement échelonné disponible sur 36 mois.
                </p>
                <button className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#D2AD3D] px-6 text-sm font-black uppercase tracking-[0.1em] text-[#071D36] transition hover:bg-[#E0BC4D]">
                  Voir le programme
                </button>
              </div>
            </article>

            <div className="mb-8 mt-12 flex items-center justify-between border-b border-[#071D36]/10 pb-5 text-sm">
              <p className="text-[#071D36]/55">
                Affichage :{" "}
                <span className="font-bold text-[#071D36]">
                  {filtered.length}
                </span>{" "}
                biens
              </p>
              {(type || transaction || query) && (
                <button
                  type="button"
                  onClick={() => {
                    setType("");
                    setTransaction("");
                    setQuery("");
                  }}
                  className="font-semibold text-[#B28C20] hover:text-[#071D36]"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {filtered.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                {filtered.map((item) => (
                  <PropertyCard key={item.ref} item={item} />
                ))}
              </div>
            ) : (
              <div className="border border-[#071D36]/10 bg-white px-6 py-14 text-center">
                <p className="font-serif text-2xl text-[#071D36]">
                  Aucun bien ne correspond à votre recherche.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setType("");
                    setTransaction("");
                    setQuery("");
                  }}
                  className="mt-5 text-sm font-bold text-[#B28C20]"
                >
                  Afficher tous les biens
                </button>
              </div>
            )}
          </Container>
        </section>

        <section className="bg-[#071D36] py-16 text-white lg:py-24">
          <Container>
            <header className="max-w-3xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#D2AD3D]">
                <span className="h-px w-7 bg-[#D2AD3D]" />
                Carte des biens
              </p>
              <h2 className="mt-5 font-serif text-3xl font-medium sm:text-4xl">
                Localisation des biens
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
                Visualisez rapidement les zones où nos biens sont disponibles.
                L&apos;intégration Google Maps pourra être ajoutée après
                validation du projet.
              </p>
            </header>

            <div className="relative mt-9 h-[390px] overflow-hidden rounded-lg border border-[#D2AD3D]/20 bg-[#172F51] sm:h-[440px]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(210,173,61,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(210,173,61,0.08)_1px,transparent_1px)] bg-[length:40px_40px]" />
              <MapMarker
                className="left-[16%] top-[25%] sm:left-[27%] sm:top-[32%]"
                label="Bonapriso"
                color="text-emerald-400"
                borderColor="border-emerald-400/30"
              />
              <MapMarker
                className="left-[46%] top-[42%] sm:left-[49%] sm:top-[46%]"
                label="Akwa"
                color="text-[#D2AD3D]"
                borderColor="border-[#D2AD3D]/30"
              />
              <MapMarker
                className="left-[68%] top-[22%] sm:left-[63%] sm:top-[29%]"
                label="Kotto"
                color="text-emerald-400"
                borderColor="border-emerald-400/30"
              />
              <MapMarker
                className="left-[29%] top-[61%] sm:left-[39%] sm:top-[65%]"
                label="Makepe"
                color="text-orange-400"
                borderColor="border-orange-400/30"
              />

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-x-5 gap-y-2 border border-white/10 bg-[#071D36]/90 px-4 py-3 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto">
                <Legend color="bg-emerald-400" label="Disponible" />
                <Legend color="bg-orange-400" label="Réservé" />
                <Legend color="bg-[#D2AD3D]" label="Programme neuf" />
              </div>

              <p className="absolute bottom-6 right-6 hidden text-xs text-white/30 md:block">
                Google Maps API après validation
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-[#D2AD3D]">
          <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:py-12 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#071D36] sm:text-3xl">
                Vous ne trouvez pas le bien idéal ?
              </h2>
              <p className="mt-2 text-sm text-[#071D36]/65">
                Déposez votre recherche - nous vous contactons sous 24h.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center bg-[#071D36] px-7 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#172F51]"
            >
              Déposer ma recherche
            </Link>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function PropertyCard({
  item,
}: {
  item: (typeof properties)[number];
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#071D36]/10 bg-white shadow-[0_12px_32px_rgba(7,29,54,0.05)] transition hover:-translate-y-1 hover:border-[#D2AD3D]/45 hover:shadow-[0_18px_40px_rgba(7,29,54,0.09)]">
      <div className="relative h-52 overflow-hidden bg-[#071D36] sm:h-56">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.045)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.045)_50%,rgba(255,255,255,0.045)_75%,transparent_75%,transparent)] bg-[length:34px_34px] opacity-30" />
        <span className="absolute left-5 top-5 border border-emerald-400/35 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
          {item.status}
        </span>
        <span className="absolute right-5 top-5 border border-white/15 bg-black/15 px-3 py-1.5 text-xs font-semibold text-white/70">
          {item.type} · {item.transaction}
        </span>
        <button
          type="button"
          aria-label={`Ajouter ${item.name} aux favoris`}
          className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#172F51]/80 text-white transition hover:border-[#D2AD3D] hover:text-[#D2AD3D]"
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <p className="font-serif text-2xl font-semibold text-[#071D36]">
          {item.price}
        </p>
        <h2 className="mt-3 text-base font-bold text-[#071D36] sm:text-lg">
          {item.name}
        </h2>
        <p className="mt-2 flex items-center gap-2 text-sm text-[#071D36]/50">
          <MapPin size={15} className="text-[#B28C20]" />
          {item.location}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-[#071D36]/10 py-5">
          <PropertyMetric label="Surface" value={item.surface} />
          <PropertyMetric label="Type" value={item.type} />
          <PropertyMetric label="Détails" value={item.rooms} />
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xs font-medium text-[#071D36]/35">{item.ref}</p>
          <button className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#B28C20] transition hover:text-[#071D36]">
            Voir détails
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function PropertyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#071D36]/35">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-bold text-[#071D36] sm:text-sm">
        {value}
      </p>
    </div>
  );
}

function MapMarker({
  className,
  label,
  color,
  borderColor,
}: {
  className: string;
  label: string;
  color: string;
  borderColor: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <MapPin className={color} size={30} fill="currentColor" />
      <span
        className={`absolute -top-8 left-5 whitespace-nowrap border bg-[#071D36] px-2.5 py-1 text-[10px] font-semibold text-white ${borderColor}`}
      >
        {label}
      </span>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-white/65">
      <span className={`h-2.5 w-2.5 ${color}`} />
      {label}
    </div>
  );
}
