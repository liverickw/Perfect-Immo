"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Check,
  FileCheck,
  Hammer,
  Home,
  KeyRound,
  MapPin,
  Plus,
  Ruler,
  Star,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";

type Service = [string, string, LucideIcon];

const tabs = [
  { id: "immo", label: "Immobilier", icon: Home },
  { id: "ingenierie", label: "Ingénierie", icon: Ruler },
  { id: "gestion", label: "Gestion locative", icon: KeyRound },
  { id: "conseil", label: "Conseil & études", icon: FileCheck },
  { id: "tarifs", label: "Tarifs", icon: Star },
];

const immoServices: Service[] = [
  [
    "Résidentiel - Vente",
    "Villas, appartements, duplex et terrains viabilisés.",
    Home,
  ],
  [
    "Résidentiel - Location",
    "Location longue durée, location meublée et contrats sécurisés.",
    KeyRound,
  ],
  [
    "Commercial - Vente",
    "Bureaux, commerces, entrepôts et espaces industriels.",
    Building2,
  ],
  [
    "Commercial - Location",
    "Location de bureaux, espaces professionnels et locaux commerciaux.",
    Building2,
  ],
  [
    "Estimation immobilière",
    "Évaluation de la valeur de votre bien selon le marché local.",
    MapPin,
  ],
  [
    "Programmes neufs",
    "Vente sur plans et accompagnement dans les programmes immobiliers.",
    Star,
  ],
];

const engineeringServices: Service[] = [
  [
    "Maîtrise d'oeuvre",
    "Coordination complète du chantier, budget, qualité et délais.",
    Hammer,
  ],
  [
    "Études structurelles",
    "Calculs béton armé, fondations, charpente et plans techniques.",
    Ruler,
  ],
  [
    "VRD & Réseaux",
    "Voirie, assainissement, eau potable, électricité et réseaux.",
    Building2,
  ],
  [
    "Architecture & Plans",
    "Conception, plans d'exécution et permis de construire.",
    FileCheck,
  ],
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("immo");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />

      <main className="bg-[#F6F5F0]">
        <section className="bg-[#071D36] text-white">
          <Container className="py-16 sm:py-20 lg:py-24">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#D2AD3D]">
              <span className="h-px w-7 bg-[#D2AD3D]" />
              Notre expertise
            </p>

            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.12] sm:text-5xl lg:text-[58px]">
              Des services{" "}
              <span className="italic text-[#D2AD3D]">complets</span>
              <br />
              de A à Z
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Immobilier résidentiel, commercial, maîtrise d&apos;oeuvre,
              études d&apos;ingénierie - une seule adresse pour tous vos projets
              à Douala et au Cameroun.
            </p>

            <div className="mt-12 grid grid-cols-2 border-y border-white/10 sm:grid-cols-4">
              {[
                ["200+", "Projets livrés"],
                ["15 ans", "Expérience"],
                ["6", "Pôles d'expertise"],
                ["48h", "Délai devis"],
              ].map(([number, label], index) => (
                <div
                  key={label}
                  className={`py-6 text-center ${
                    index % 2 !== 0 ? "border-l border-white/10" : ""
                  } ${index > 1 ? "border-t border-white/10 sm:border-t-0" : ""} ${
                    index > 0 ? "sm:border-l" : ""
                  }`}
                >
                  <p className="font-serif text-2xl font-semibold text-[#D2AD3D] sm:text-3xl">
                    {number}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <nav
          aria-label="Catégories de services"
          className="sticky top-0 z-20 border-b border-[#071D36]/10 bg-white"
        >
          <Container className="flex justify-start overflow-x-auto md:justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex min-h-16 shrink-0 items-center gap-2.5 border-b-2 px-5 text-xs font-bold uppercase tracking-[0.1em] transition sm:px-6 ${
                    isActive
                      ? "border-[#D2AD3D] text-[#071D36]"
                      : "border-transparent text-[#071D36]/45 hover:text-[#071D36]"
                  }`}
                >
                  <Icon
                    size={17}
                    className={isActive ? "text-[#B28C20]" : ""}
                  />
                  {tab.label}
                </button>
              );
            })}
          </Container>
        </nav>

        <section className="bg-[#F6F5F0] py-16 lg:py-24">
          <Container>
            {activeTab === "immo" && (
              <ServicePanel
                eyebrow="Pôle immobilier"
                title="Vente & Location de biens immobiliers"
                description="Résidentiel, commercial ou industriel - nous vous accompagnons à chaque étape, de la recherche à la signature."
                services={immoServices}
                featuredTitle="Vente clé en main résidentielle"
                featuredText="Villas, appartements, duplex et programmes neufs à Douala, Yaoundé et Kribi. Accompagnement notarial inclus."
              />
            )}

            {activeTab === "ingenierie" && (
              <ServicePanel
                eyebrow="Pôle ingénierie"
                title="Maîtrise d'oeuvre & Ingénierie technique"
                description="De la conception à la livraison, nos ingénieurs pilotent vos chantiers avec rigueur, respect du budget et des délais."
                services={engineeringServices}
                featuredTitle="Maîtrise d'oeuvre complète"
                featuredText="Pilotage intégral : conception, coordination des corps de métier, suivi de chantier et réception des travaux."
              />
            )}

            {activeTab === "gestion" && <PricingPanel />}
            {activeTab === "conseil" && <ConseilPanel />}
            {activeTab === "tarifs" && <TarifsPanel />}

            <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
          </Container>
        </section>

        <section className="bg-[#D2AD3D]">
          <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:py-12 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#071D36] sm:text-3xl">
                Consultation gratuite sans engagement
              </h2>
              <p className="mt-2 text-sm font-medium text-[#071D36]/65">
                Réponse sous 24h · Devis sous 48h
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center bg-[#071D36] px-7 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#172F51]"
            >
              Demander un devis
            </a>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-[#B28C20]">
        <span className="h-px w-7 bg-[#D2AD3D]" />
        {eyebrow}
      </p>
      <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-[#071D36] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-[#071D36]/60 sm:text-base">
          {description}
        </p>
      )}
    </header>
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
  services: Service[];
  featuredTitle: string;
  featuredText: string;
}) {
  return (
    <>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <article className="mt-10 grid gap-8 rounded-lg bg-[#071D36] p-6 text-white sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D2AD3D]">
            Service phare
          </p>
          <h3 className="mt-4 font-serif text-2xl font-medium leading-tight sm:text-3xl">
            {featuredTitle}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            {featuredText}
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#D2AD3D] px-6 text-sm font-black uppercase tracking-[0.1em] text-[#071D36] transition hover:bg-[#E0BC4D]"
          >
            Demander un devis
          </a>
        </div>

        <div className="grid content-center gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            "Accompagnement complet",
            "Suivi personnalisé",
            "Rapport détaillé",
            "Respect des délais",
          ].map((item) => (
            <div
              key={item}
              className="flex min-h-12 items-center gap-3 border border-white/12 px-4 text-sm font-medium text-white/75"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#D2AD3D]/50 text-[#D2AD3D]">
                <Check size={12} strokeWidth={3} />
              </span>
              {item}
            </div>
          ))}
        </div>
      </article>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map(([serviceTitle, descriptionText, Icon]) => (
          <article
            key={serviceTitle}
            className="border border-[#071D36]/10 bg-white p-6 shadow-[0_12px_30px_rgba(7,29,54,0.04)] transition hover:-translate-y-1 hover:border-[#D2AD3D]/50 hover:shadow-[0_16px_35px_rgba(7,29,54,0.08)] sm:p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center border border-[#D2AD3D]/60 text-[#B28C20]">
              <Icon size={23} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#071D36]">
              {serviceTitle}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#071D36]/55">
              {descriptionText}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}

function PricingPanel() {
  return (
    <div>
      <SectionHeading
        eyebrow="Gestion locative"
        title="Gestion locative sans tracas"
        description="Confiez-nous votre patrimoine immobilier. Nous gérons les locataires, les loyers, l'entretien et les aspects juridiques."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ["Essentiel", "6%", "Recherche locataire, bail, loyers"],
          ["Premium", "9%", "Entretien, juridique, rapport trimestriel"],
          ["Patrimoine", "Sur devis", "Gestionnaire dédié et optimisation"],
        ].map(([name, price, description]) => {
          const featured = name === "Premium";

          return (
            <article
              key={name}
              className={`border p-7 ${
                featured
                  ? "border-[#D2AD3D] bg-[#071D36] text-white"
                  : "border-[#071D36]/10 bg-white text-[#071D36]"
              }`}
            >
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="mt-4 font-serif text-4xl font-semibold text-[#D2AD3D]">
                {price}
              </p>
              <p
                className={`mt-4 min-h-12 text-sm leading-6 ${
                  featured ? "text-white/55" : "text-[#071D36]/55"
                }`}
              >
                {description}
              </p>
              <button className="mt-7 min-h-11 bg-[#D2AD3D] px-5 text-sm font-bold text-[#071D36]">
                Choisir
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ConseilPanel() {
  const conseilServices: Service[] = [
    [
      "Audit technique",
      "Diagnostic complet d'un bâtiment existant.",
      FileCheck,
    ],
    [
      "Étude de faisabilité",
      "Analyse technique, financière et réglementaire.",
      Ruler,
    ],
    [
      "Permis de construire",
      "Constitution et dépôt du dossier administratif.",
      FileCheck,
    ],
    [
      "Conseil en investissement",
      "Analyse du marché et recommandations d'acquisition.",
      Star,
    ],
  ];

  return (
    <ServicePanel
      eyebrow="Pôle conseil"
      title="Études, conseil & accompagnement"
      description="Expertise technique et juridique pour sécuriser vos décisions d'investissement immobilier et de construction."
      services={conseilServices}
      featuredTitle="Conseil immobilier & technique"
      featuredText="Une expertise professionnelle pour sécuriser vos projets avant tout engagement financier."
    />
  );
}

function TarifsPanel() {
  const rows = [
    ["Transaction immobilière", "3 à 5 %", "4-8 semaines"],
    ["Location immobilière", "1 mois loyer", "1-3 semaines"],
    ["Maîtrise d'oeuvre", "8 à 12 %", "Selon projet"],
    ["Études structurelles", "Sur devis", "2-4 semaines"],
    ["Gestion locative", "6 à 9 % / mois", "Continu"],
    ["Consultation initiale", "Gratuite", "Sous 24h"],
  ];

  return (
    <div>
      <SectionHeading
        eyebrow="Nos honoraires"
        title="Tarifs clairs & transparents"
      />

      <div className="mt-10 overflow-x-auto border border-[#071D36]/10 bg-white">
        <div className="min-w-[620px]">
          {rows.map(([service, price, delay], index) => (
            <div
              key={service}
              className={`grid grid-cols-3 gap-4 px-5 py-4 text-sm ${
                index % 2 === 0 ? "bg-white" : "bg-[#F6F5F0]"
              }`}
            >
              <p className="font-semibold text-[#071D36]">{service}</p>
              <p className="text-center font-bold text-[#B28C20]">{price}</p>
              <p className="text-center text-[#071D36]/50">{delay}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQ({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number | null;
  setOpenFaq: Dispatch<SetStateAction<number | null>>;
}) {
  const faqs = [
    [
      "Quels documents faut-il pour acheter un bien ?",
      "Une pièce d'identité valide, les justificatifs nécessaires et les documents liés au financement. L'équipe vous accompagne dans la constitution du dossier.",
    ],
    [
      "Intervenez-vous uniquement à Douala ?",
      "Non. L'entreprise peut accompagner des projets à Douala et dans d'autres villes du Cameroun selon la nature du projet.",
    ],
    [
      "Combien de temps faut-il pour obtenir un devis ?",
      "Un premier retour peut être donné sous 24h et un devis détaillé sous 48h après analyse du besoin.",
    ],
  ];

  return (
    <section className="mt-16 border-t border-[#071D36]/10 pt-14 sm:mt-20 sm:pt-16">
      <SectionHeading
        eyebrow="Questions fréquentes"
        title="Tout savoir avant de démarrer"
      />

      <div className="mt-8 border-t border-[#071D36]/10">
        {faqs.map(([question, answer], index) => {
          const isOpen = openFaq === index;

          return (
            <article key={question} className="border-b border-[#071D36]/10">
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-sm font-bold text-[#071D36] sm:text-base"
              >
                <span>{question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#071D36]/15 text-[#B28C20]">
                  <Plus
                    size={17}
                    className={`transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </span>
              </button>

              {isOpen && (
                <p className="max-w-3xl pb-6 pr-12 text-sm leading-7 text-[#071D36]/55">
                  {answer}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
