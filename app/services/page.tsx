"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Home,
  Ruler,
  KeyRound,
  FileCheck,
  Building2,
  Hammer,
  MapPin,
  Star,
  Plus,
} from "lucide-react";

const tabs = [
  { id: "immo", label: "Immobilier", icon: Home },
  { id: "ingenierie", label: "Ingénierie", icon: Ruler },
  { id: "gestion", label: "Gestion locative", icon: KeyRound },
  { id: "conseil", label: "Conseil & Études", icon: FileCheck },
  { id: "tarifs", label: "Tarifs", icon: Star },
];

const immoServices = [
  ["Résidentiel — Vente", "Villas, appartements, duplex et terrains viabilisés.", Home],
  ["Résidentiel — Location", "Location longue durée, location meublée et contrats sécurisés.", KeyRound],
  ["Commercial — Vente", "Bureaux, commerces, entrepôts et espaces industriels.", Building2],
  ["Commercial — Location", "Location de bureaux, espaces professionnels et locaux commerciaux.", Building2],
  ["Estimation immobilière", "Évaluation de la valeur de votre bien selon le marché local.", MapPin],
  ["Programmes neufs", "Vente sur plans et accompagnement dans les programmes immobiliers.", Star],
];

const engineeringServices = [
  ["Maîtrise d'œuvre", "Coordination complète du chantier, budget, qualité et délais.", Hammer],
  ["Études structurelles", "Calculs béton armé, fondations, charpente et plans techniques.", Ruler],
  ["VRD & Réseaux", "Voirie, assainissement, eau potable, électricité et réseaux.", Building2],
  ["Architecture & Plans", "Conception, plans d’exécution et permis de construire.", FileCheck],
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("immo");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
    
      <main>
        <section className="bg-[#0B1F3A] text-white py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <p className="uppercase tracking-[4px] text-yellow-500 text-sm font-semibold">
              Notre expertise
            </p>
    
            <h1 className="mt-4 text-3xl lg:text-7xl font-bold leading-tight">
              Des services <span className="text-yellow-500 italic">complets</span>
              <br />
              de A à Z
            </h1>

            <p className="mt-6 text-gray-300 max-w-3xl text-lg leading-8">
              Immobilier résidentiel, commercial, maîtrise d'œuvre, études
              d'ingénierie — une seule adresse pour tous vos projets à Douala
              et au Cameroun.
            </p>
          </div>
        </section>
    
        <section className="bg-[#152B4E] text-white py-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["200+", "Projets livrés"],
              ["15 ans", "Expérience"],
              ["6", "Pôles d'expertise"],
              ["48h", "Délai devis"],
            ].map(([number, label]) => (
              <div key={label}>
                <h3 className="text-yellow-500 text-4xl font-bold">{number}</h3>
                <p className="text-gray-300 text-sm uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white sticky top-0 z-20 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-5 text-sm font-semibold uppercase tracking-wide border-b-2 whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? "border-yellow-500 text-[#0B1F3A]"
                      : "border-transparent text-gray-500 hover:text-[#0B1F3A]"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>
    
        <section className="bg-[#F8F8F5] py-20">
          <div className="max-w-6xl mx-auto px-6">
            {activeTab === "immo" && (
              <ServicePanel
                eyebrow="Pôle Immobilier"
                title="Vente & Location de biens immobiliers"
                description="Résidentiel, commercial ou industriel — nous vous accompagnons à chaque étape, de la recherche à la signature."
                services={immoServices}
                featuredTitle="Vente clé en main résidentielle"
                featuredText="Villas, appartements, duplex et programmes neufs à Douala, Yaoundé et Kribi. Accompagnement notarial inclus."
              />
            )}

            {activeTab === "ingenierie" && (
              <ServicePanel
                eyebrow="Pôle Ingénierie"
                title="Maîtrise d'œuvre & Ingénierie technique"
                description="De la conception à la livraison, nos ingénieurs pilotent vos chantiers avec rigueur, respect du budget et des délais."
                services={engineeringServices}
                featuredTitle="Maîtrise d'œuvre complète"
                featuredText="Pilotage intégral : conception, coordination des corps de métier, suivi de chantier et réception des travaux."
              />
            )}

            {activeTab === "gestion" && <PricingPanel />}

            {activeTab === "conseil" && <ConseilPanel />}

            {activeTab === "tarifs" && <TarifsPanel />}

            <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
          </div>
        </section>

        <section className="bg-yellow-500 py-14">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A]">
                Consultation gratuite sans engagement
              </h2>
              <p className="text-[#0B1F3A]/70 mt-2">
                Réponse sous 24h · Devis sous 48h
              </p>
            </div>

            <button className="bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#152B4E] transition">
              Demander un devis
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ServicePanel({
  eyebrow,
  title,
  description,
  services,
  featuredTitle,
  featuredText,
}: {
  eyebrow: string;
  title: string;
  description: string;
  services: [string, string, any][];
  featuredTitle: string;
  featuredText: string;
}) {
  return (
    <>
      <div className="mb-12">
        <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-bold text-[#0B1F3A]">{title}</h2>
        <p className="mt-5 text-gray-600 max-w-3xl leading-8">{description}</p>
      </div>

      <div className="bg-[#0B1F3A] text-white rounded-3xl p-10 grid lg:grid-cols-2 gap-10 mb-12">
        <div>
          <p className="uppercase tracking-[3px] text-yellow-500 text-sm">
            Service phare
          </p>
          <h3 className="mt-4 text-3xl font-bold">{featuredTitle}</h3>
          <p className="mt-5 text-gray-300 leading-8">{featuredText}</p>
          <button className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold">
            Demander un devis
          </button>
        </div>

        <div className="space-y-4">
          {[
            "Accompagnement complet",
            "Suivi personnalisé",
            "Rapport détaillé",
            "Respect des délais",
          ].map((item) => (
            <div key={item} className="border border-yellow-500/20 p-4 rounded-xl">
              <span className="text-yellow-500">●</span>{" "}
              <span className="text-gray-200">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(([title, desc, Icon]) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-8 border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 border border-yellow-500/30 rounded-xl flex items-center justify-center mb-6">
              <Icon className="text-yellow-600" size={30} />
            </div>
            <h3 className="text-xl font-bold text-[#0B1F3A]">{title}</h3>
            <p className="mt-4 text-gray-600 leading-7">{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function PricingPanel() {
  return (
    <div>
      <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold">
        Gestion locative
      </p>
      <h2 className="mt-4 text-4xl font-bold text-[#0B1F3A]">
        Gestion locative sans tracas
      </h2>
      <p className="mt-5 text-gray-600 max-w-3xl leading-8">
        Confiez-nous votre patrimoine immobilier. Nous gérons les locataires,
        les loyers, l’entretien et les aspects juridiques.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {[
          ["Essentiel", "6%", "Recherche locataire, bail, loyers"],
          ["Premium", "9%", "Entretien, juridique, rapport trimestriel"],
          ["Patrimoine", "Sur devis", "Gestionnaire dédié et optimisation"],
        ].map(([name, price, desc]) => (
          <div
            key={name}
            className={`rounded-2xl p-8 border ${
              name === "Premium"
                ? "bg-[#0B1F3A] text-white border-yellow-500"
                : "bg-white border-gray-100"
            }`}
          >
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-yellow-500 text-5xl font-bold mt-4">{price}</p>
            <p className="mt-4 text-gray-400">{desc}</p>
            <button className="mt-8 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold">
              Choisir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConseilPanel() {
  return (
    <ServicePanel
      eyebrow="Pôle Conseil"
      title="Études, conseil & accompagnement"
      description="Expertise technique et juridique pour sécuriser vos décisions d’investissement immobilier et de construction."
      services={[
        ["Audit technique", "Diagnostic complet d’un bâtiment existant.", FileCheck],
        ["Étude de faisabilité", "Analyse technique, financière et réglementaire.", Ruler],
        ["Permis de construire", "Constitution et dépôt du dossier administratif.", FileCheck],
        ["Conseil en investissement", "Analyse du marché et recommandations d’acquisition.", Star],
      ]}
      featuredTitle="Conseil immobilier & technique"
      featuredText="Une expertise professionnelle pour sécuriser vos projets avant tout engagement financier."
    />
  );
}

function TarifsPanel() {
  const rows = [
    ["Transaction immobilière", "3 à 5 %", "4–8 semaines"],
    ["Location immobilière", "1 mois loyer", "1–3 semaines"],
    ["Maîtrise d'œuvre", "8 à 12 %", "Selon projet"],
    ["Études structurelles", "Sur devis", "2–4 semaines"],
    ["Gestion locative", "6 à 9 % / mois", "Continu"],
    ["Consultation initiale", "Gratuite", "Sous 24h"],
  ];

  return (
    <div>
      <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold">
        Nos honoraires
      </p>
      <h2 className="mt-4 text-4xl font-bold text-[#0B1F3A]">
        Tarifs clairs & transparents
      </h2>

      <div className="mt-10 bg-white rounded-2xl overflow-hidden border border-gray-100">
        {rows.map(([service, price, delay], index) => (
          <div
            key={service}
            className={`grid grid-cols-3 p-5 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <p className="font-semibold text-[#0B1F3A]">{service}</p>
            <p className="text-center text-yellow-600 font-bold">{price}</p>
            <p className="text-center text-gray-500">{delay}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQ({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number | null;
  setOpenFaq: (value: number | null) => void;
}) {
  const faqs = [
    [
      "Quels documents faut-il pour acheter un bien ?",
      "Une pièce d’identité valide, les justificatifs nécessaires et les documents liés au financement. L’équipe vous accompagne dans la constitution du dossier.",
    ],
    [
      "Intervenez-vous uniquement à Douala ?",
      "Non. L’entreprise peut accompagner des projets à Douala et dans d’autres villes du Cameroun selon la nature du projet.",
    ],
    [
      "Combien de temps faut-il pour obtenir un devis ?",
      "Un premier retour peut être donné sous 24h et un devis détaillé sous 48h après analyse du besoin.",
    ],
  ];
    
  return (
    <div className="mt-16">
      <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold mb-6">
        Questions fréquentes
      </p>
    
      <div className="space-y-4">
        {faqs.map(([q, a], index) => (
          <div key={q} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full flex justify-between items-center text-left p-5 font-semibold text-[#0B1F3A]"
            >
              {q}
              <Plus
                className={`transition ${openFaq === index ? "rotate-45" : ""}`}
              />
            </button>

            {openFaq === index && (
              <p className="px-5 pb-5 text-gray-600 leading-7">{a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
    }