"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, ArrowRight } from "lucide-react";

const filters = ["Tous", "Résidentiel", "Commercial", "Industriel", "Infrastructures"];

const projects = [
  {
    title: "Tour Bonanjo Business Center",
    category: "Commercial",
    year: "2024",
    location: "Bonanjo, Douala",
    surface: "5 200 m²",
    budget: "850M FCFA",
    duration: "22 mois",
    featured: true,
  },
  {
    title: "Villa Prestige — Bastos",
    category: "Résidentiel",
    year: "2024",
    location: "Bastos, Yaoundé",
    surface: "650 m²",
    budget: "120M FCFA",
    duration: "14 mois",
  },
  {
    title: "Résidence Les Palmiers",
    category: "Résidentiel",
    year: "2023",
    location: "Akwa Nord, Douala",
    surface: "3 800 m²",
    budget: "480M FCFA",
    duration: "18 mois",
  },
  {
    title: "Route Ndokoti — VRD",
    category: "Infrastructures",
    year: "2023",
    location: "Ndokoti, Douala",
    surface: "4,2 km",
    budget: "320M FCFA",
    duration: "10 mois",
  },
  {
    title: "Centre Commercial Bonapriso",
    category: "Commercial",
    year: "2022",
    location: "Bonapriso, Douala",
    surface: "2 100 m²",
    budget: "290M FCFA",
    duration: "12 mois",
  },
  {
    title: "Entrepôt logistique",
    category: "Industriel",
    year: "2022",
    location: "Bassa, Douala",
    surface: "8 500 m²",
    budget: "650M FCFA",
    duration: "20 mois",
  },
];

export default function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filteredProjects =
    activeFilter === "Tous"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      <Navbar />

      <main>
        <section className="bg-[#0B1F3A] text-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <p className="uppercase tracking-[4px] text-yellow-500 text-sm font-semibold">
              Notre portfolio
            </p>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold leading-tight">
              Nos <span className="text-yellow-500 italic">réalisations</span>
              <br />
              parlent pour nous
            </h1>

            <p className="mt-6 text-gray-300 max-w-3xl text-lg leading-8">
              Plus de 120 projets livrés à Douala, Yaoundé et dans les grandes
              villes du Cameroun. Chaque projet démontre notre exigence,
              notre rigueur et notre savoir-faire.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 border-t border-yellow-500/20 pt-10">
              {[
                ["120+", "Projets livrés"],
                ["85k", "m² construits"],
                ["15", "Ans d'expérience"],
                ["98%", "Satisfaction client"],
              ].map(([number, label]) => (
                <div key={label}>
                  <h3 className="text-yellow-500 text-4xl font-bold">
                    {number}
                  </h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wide mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
    
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 flex items-center gap-8 py-4 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide border-b-2 whitespace-nowrap transition ${
                    activeFilter === filter
                        ? "border-yellow-500 text-[#0B1F3A]"
                        : "border-transparent text-gray-500 hover:text-[#0B1F3A]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-[#F8F8F5] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10 flex justify-between items-center">
              <p className="text-gray-600">
                Affichage :{" "}
                <span className="font-bold text-[#0B1F3A]">
                  {filteredProjects.length}
                </span>{" "}
                projets
              </p>

              <p className="text-sm text-gray-500">
                Filtre : {activeFilter}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className={`bg-white rounded-3xl overflow-hidden border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
                    project.featured ? "md:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative bg-[#0B1F3A] ${
                      project.featured ? "h-[360px]" : "h-[240px]"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A64] to-[#0B1F3A]" />

                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(201,168,76,0.2)_1px,transparent_1px)] bg-[length:32px_32px]" />

                    <div className="absolute top-5 left-5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold">
                      {project.category}
                    </div>

                    <div className="absolute top-5 right-5 bg-black/30 text-white px-4 py-2 rounded-full text-sm">
                      {project.year}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-white text-3xl font-bold">
                        {project.title}
                      </h2>

                      <p className="text-gray-300 flex items-center gap-2 mt-3">
                        <MapPin size={18} />
                        {project.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-6 border-b border-gray-100 pb-6">
                      <div>
                        <p className="text-gray-400 text-sm uppercase">
                          Surface
                        </p>
                        <p className="font-bold text-[#0B1F3A]">
                          {project.surface}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm uppercase">
                          Budget
                        </p>
                        <p className="font-bold text-[#0B1F3A]">
                          {project.budget}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm uppercase">
                          Durée
                        </p>
                        <p className="font-bold text-[#0B1F3A]">
                          {project.duration}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                          Maîtrise d'œuvre
                        </span>
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                          Suivi complet
                        </span>
                      </div>

                      <button className="text-yellow-600 font-semibold flex items-center gap-2">
                        Voir
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0B1F3A] py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {[
              [
                "Jean-Marc Essomba",
                "Promoteur immobilier",
                "Perfect Immo & Engineering a livré notre immeuble dans les délais avec un excellent niveau de finition.",
              ],
              [
                "Marie Ngo Biyong",
                "Investisseuse",
                "Leur accompagnement technique et leur transparence nous ont permis d’avancer avec confiance.",
              ],
            ].map(([name, role, text]) => (
              <div
                key={name}
                className="border border-yellow-500/20 rounded-2xl p-8"
              >
                <p className="text-yellow-500 text-xl">★★★★★</p>
                <p className="text-gray-300 italic leading-8 mt-5">
                  "{text}"
                </p>
                <div className="mt-6 border-t border-yellow-500/20 pt-5">
                  <h4 className="text-white font-bold">{name}</h4>
                  <p className="text-gray-500">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-yellow-500 py-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A]">
                Prêt à lancer votre projet ?
              </h2>
              <p className="text-[#0B1F3A]/70 mt-2">
                Discutons de vos besoins et construisons ensemble une solution adaptée.
              </p>
            </div>

            <button className="bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#152B4E] transition">
              Demander un devis
            </button>
          </div>
        </section>
      </main>

        <section className="bg-yellow-500 py-20">
            <div className="max-w-6xl mx-auto px-6 text-center">

                <p className="uppercase tracking-[4px] text-[#0B1F3A] text-sm font-semibold">
                    Démarrons votre projet
                </p>

                <h2 className="mt-4 text-4xl lg:text-6xl font-bold text-[#0B1F3A]">
                    Prêt à construire
                    <br />
                    quelque chose d'exceptionnel ?
                </h2>

                <p className="mt-6 text-xl text-[#0B1F3A]/80 max-w-3xl mx-auto">
                    Que ce soit pour un projet immobilier, une étude technique ou
                    une maîtrise d'œuvre complète, notre équipe est prête à vous
                    accompagner.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                    <button className="bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#132B4E] transition">
                        Demander un devis
                    </button>

                    <button className="border-2 border-[#0B1F3A] text-[#0B1F3A] px-8 py-4 rounded-xl font-semibold hover:bg-[#0B1F3A] hover:text-white transition">
                        Nous contacter
                    </button>

                </div>

            </div>
        </section>

      <Footer />
    </>
  );
    }