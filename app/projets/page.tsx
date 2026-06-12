"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Heart, ArrowRight, Search } from "lucide-react";

const properties = [
  {
    name: "Villa Prestige — Bonapriso",
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
    name: "Appartement F3 — Akwa",
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
    name: "Villa Standing — Bastos",
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
    name: "Terrain viabilisé — Kotto",
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

  const filtered = properties.filter((item) => {
    const matchType = type ? item.type === type : true;
    const matchTransaction = transaction ? item.transaction === transaction : true;
    return matchType && matchTransaction;
  });

  return (
    <>
      <Navbar />

      <main>
        <section className="bg-[#0B1F3A] text-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <p className="uppercase tracking-[4px] text-yellow-500 text-sm font-semibold">
              Catalogue immobilier
            </p>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold leading-tight">
              Biens <span className="text-yellow-500 italic">disponibles</span>
              <br />
              à Douala & Cameroun
            </h1>

            <p className="mt-6 text-gray-300 max-w-3xl text-lg leading-8">
              Vente et location résidentielle & commerciale. Tous nos biens sont
              vérifiés juridiquement avec titres fonciers garantis.
            </p>
          </div>
        </section>

        <section className="bg-[#152B4E] text-white py-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              ["14", "Disponibles"],
              ["3", "Réservés"],
              ["2", "Programmes neufs"],
              ["48h", "Délai visite"],
            ].map(([number, label]) => (
              <div key={label}>
                <h3 className="text-yellow-500 text-4xl font-bold">{number}</h3>
                <p className="text-gray-300 text-sm uppercase tracking-wide">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-10 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-200 px-4 py-3 rounded-xl"
            >
              <option value="">Tous types</option>
              <option value="Villa">Villa</option>
              <option value="Appartement">Appartement</option>
              <option value="Terrain">Terrain</option>
            </select>

            <select
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
              className="border border-gray-200 px-4 py-3 rounded-xl"
            >
              <option value="">Vente & Location</option>
              <option value="Vente">Vente</option>
              <option value="Location">Location</option>
            </select>

            <button className="bg-[#0B1F3A] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Search size={18} />
              Rechercher
            </button>
          </div>
        </section>

        <section className="bg-[#F8F8F5] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-[#0B1F3A] text-white rounded-3xl p-10 mb-12">
              <p className="uppercase tracking-[4px] text-yellow-500 text-sm">
                Lancement exclusif
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Résidence Horizon — Bonapriso
              </h2>
              <p className="mt-4 text-gray-300 max-w-3xl">
                24 appartements standing R+6 avec vue dégagée. Livraison prévue
                Q3 2026. Paiement échelonné disponible sur 36 mois.
              </p>
              <button className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold">
                Voir le programme
              </button>
            </div>

            <div className="mb-8 flex justify-between items-center">
              <p className="text-gray-600">
                Affichage :{" "}
                <span className="font-bold text-[#0B1F3A]">
                  {filtered.length}
                </span>{" "}
                biens
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filtered.map((item) => (
                <div
                  key={item.ref}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-[180px] bg-[#0B1F3A]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A64] to-[#0B1F3A]" />

                    <div className="absolute top-5 left-5 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                      {item.status}
                    </div>

                    <div className="absolute top-5 right-5 bg-black/30 text-white px-4 py-2 rounded-full text-sm">
                      {item.type} · {item.transaction}
                    </div>

                    <button className="absolute bottom-5 right-5 bg-white/10 p-3 rounded-full text-white hover:text-yellow-500">
                      <Heart size={20} />
                    </button>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0B1F3A]">
                      {item.price}
                    </h3>

                    <p className="mt-3 font-semibold text-[#0B1F3A]">
                      {item.name}
                    </p>

                    <p className="text-gray-500 flex items-center gap-2 mt-2">
                      <MapPin size={16} />
                      {item.location}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mt-6 border-y border-gray-100 py-5">
                      <div>
                        <p className="text-gray-400 text-sm">Surface</p>
                        <p className="font-bold">{item.surface}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Type</p>
                        <p className="font-bold">{item.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Détails</p>
                        <p className="font-bold">{item.rooms}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-gray-400 text-sm">{item.ref}</p>

                      <button className="text-yellow-600 font-semibold flex items-center gap-2">
                        Voir détails
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0B1F3A] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10">
              <p className="uppercase tracking-[4px] text-yellow-500 text-sm font-semibold">
                Carte des biens
              </p>

              <h2 className="mt-4 text-4xl font-bold text-white">
                Localisation des biens
              </h2>

              <p className="mt-4 text-gray-400 max-w-2xl">
                Visualisez rapidement les zones où nos biens sont disponibles.
                L’intégration Google Maps pourra être ajoutée après validation
                du projet.
              </p>
            </div>

            <div className="relative h-[420px] rounded-3xl overflow-hidden border border-yellow-500/20 bg-[#152B4E]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.08)_1px,transparent_1px)] bg-[length:40px_40px]" />

              <div className="absolute left-[28%] top-[35%]">
                <MapPin className="text-green-400" size={34} />
                <span className="absolute -top-8 left-6 bg-[#0B1F3A] text-white text-xs px-3 py-1 rounded-full border border-green-400/30">
                  Bonapriso
                </span>
              </div>

              <div className="absolute left-[50%] top-[48%]">
                <MapPin className="text-yellow-500" size={34} />
                <span className="absolute -top-8 left-6 bg-[#0B1F3A] text-white text-xs px-3 py-1 rounded-full border border-yellow-500/30">
                  Akwa
                </span>
              </div>

              <div className="absolute left-[62%] top-[32%]">
                <MapPin className="text-green-400" size={34} />
                <span className="absolute -top-8 left-6 bg-[#0B1F3A] text-white text-xs px-3 py-1 rounded-full border border-green-400/30">
                  Kotto
                </span>
              </div>

              <div className="absolute left-[40%] top-[65%]">
                <MapPin className="text-orange-400" size={34} />
                <span className="absolute -top-8 left-6 bg-[#0B1F3A] text-white text-xs px-3 py-1 rounded-full border border-orange-400/30">
                  Makepe
                </span>
              </div>

              <div className="absolute bottom-6 left-6 flex flex-wrap gap-4 bg-[#0B1F3A]/80 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-3 h-3 bg-green-400 rounded-full" />
                  Disponible
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-3 h-3 bg-orange-400 rounded-full" />
                  Réservé
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  Programme neuf
                </div>
              </div>

              <div className="absolute bottom-6 right-6 text-gray-400 text-sm">
                Google Maps API après validation
              </div>
            </div>
          </div>
        </section>

        <section className="bg-yellow-500 py-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A]">
                Vous ne trouvez pas le bien idéal ?
              </h2>
              <p className="text-[#0B1F3A]/70 mt-2">
                Déposez votre recherche — nous vous contactons sous 24h.
              </p>
            </div>

            <button className="bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-semibold">
              Déposer ma recherche
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}