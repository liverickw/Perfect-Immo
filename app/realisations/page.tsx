"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Quote, Star } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";

const filters = [
  "Tous",
  "Résidentiel",
  "Commercial",
  "Industriel",
  "Infrastructures",
];

const projects = [
  {
    title: "Tour Bonanjo Business Center",
    category: "Commercial",
    year: "2024",
    location: "Bonanjo, Douala",
    surface: "5 200 m²",
    budget: "850M FCFA",
    duration: "22 mois",
  },
  {
    title: "Villa Prestige - Bastos",
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
    title: "Route Ndokoti - VRD",
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

const testimonials = [
  {
    name: "Jean-Marc Essomba",
    role: "Promoteur immobilier",
    text: "Perfect Immo & Engineering a livré notre immeuble dans les délais avec un excellent niveau de finition.",
  },
  {
    name: "Marie Ngo Biyong",
    role: "Investisseuse",
    text: "Leur accompagnement technique et leur transparence nous ont permis d'avancer avec confiance.",
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

      <main className="bg-[#F6F5F0]">
        <section className="bg-[#071D36] text-white">
          <Container className="py-16 sm:py-20 lg:py-24">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#D2AD3D]">
              <span className="h-px w-7 bg-[#D2AD3D]" />
              Notre portfolio
            </p>

            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.12] sm:text-5xl lg:text-[58px]">
              Nos{" "}
              <span className="italic text-[#D2AD3D]">réalisations</span>
              <br />
              parlent pour nous
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Plus de 120 projets livrés à Douala, Yaoundé et dans les grandes
              villes du Cameroun. Chaque projet démontre notre exigence, notre
              rigueur et notre savoir-faire.
            </p>

            <div className="mt-12 grid grid-cols-2 border-y border-white/10 sm:grid-cols-4">
              {[
                ["120+", "Projets livrés"],
                ["85k", "M² construits"],
                ["15", "Ans d'expérience"],
                ["98%", "Satisfaction client"],
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
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/45 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b border-[#071D36]/10 bg-white">
          <Container>
            <div className="flex justify-start overflow-x-auto md:justify-center">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    type="button"
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`min-h-16 shrink-0 border-b-2 px-5 text-xs font-bold uppercase tracking-[0.1em] transition sm:px-6 ${
                      isActive
                        ? "border-[#D2AD3D] text-[#071D36]"
                        : "border-transparent text-[#071D36]/45 hover:text-[#071D36]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="bg-[#F6F5F0] py-16 lg:py-24">
          <Container>
            <div className="mb-8 flex flex-col justify-between gap-2 border-b border-[#071D36]/10 pb-5 text-sm sm:flex-row sm:items-center">
              <p className="text-[#071D36]/55">
                Affichage :{" "}
                <span className="font-bold text-[#071D36]">
                  {filteredProjects.length}
                </span>{" "}
                projets
              </p>
              <p className="text-[#071D36]/45">
                Filtre :{" "}
                <span className="font-semibold text-[#B28C20]">
                  {activeFilter}
                </span>
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[#071D36] py-16 text-white lg:py-24">
          <Container>
            <header className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-[#D2AD3D]">
                <span className="h-px w-7 bg-[#D2AD3D]" />
                Ils nous font confiance
              </p>
              <h2 className="mt-5 font-serif text-3xl font-medium sm:text-4xl">
                La satisfaction au coeur de chaque projet
              </h2>
            </header>

            <div className="mt-9 grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="relative border border-[#D2AD3D]/25 bg-[#172F51]/35 p-6 sm:p-8"
                >
                  <Quote
                    size={36}
                    className="absolute right-6 top-6 text-[#D2AD3D]/15"
                  />
                  <div className="flex gap-1 text-[#D2AD3D]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-5 max-w-xl text-sm italic leading-7 text-white/65 sm:text-base">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-[#D2AD3D]/20 pt-5">
                    <h3 className="text-sm font-bold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="mt-1 text-xs text-white/40">
                      {testimonial.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[#D2AD3D]">
          <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:py-12 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#071D36] sm:text-3xl">
                Prêt à lancer votre projet ?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#071D36]/65">
                Discutons de vos besoins et construisons ensemble une solution
                adaptée.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center bg-[#071D36] px-7 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#172F51]"
            >
              Demander un devis
            </Link>
          </Container>
        </section>

        <section className="border-t border-[#071D36]/15 bg-[#D2AD3D] py-16 lg:py-24">
          <Container className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#071D36]/70">
              Démarrons votre projet
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#071D36] sm:text-4xl lg:text-5xl">
              Prêt à construire quelque chose d&apos;exceptionnel ?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#071D36]/65 sm:text-base">
              Que ce soit pour un projet immobilier, une étude technique ou une
              maîtrise d&apos;oeuvre complète, notre équipe est prête à vous
              accompagner.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center bg-[#071D36] px-7 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#172F51]"
              >
                Demander un devis
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center border border-[#071D36] px-7 text-sm font-black uppercase tracking-[0.1em] text-[#071D36] transition hover:bg-[#071D36] hover:text-white"
              >
                Nous contacter
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#071D36]/10 bg-white shadow-[0_12px_32px_rgba(7,29,54,0.05)] transition hover:-translate-y-1 hover:border-[#D2AD3D]/45 hover:shadow-[0_18px_40px_rgba(7,29,54,0.09)]">
      <div className="relative flex h-60 flex-col justify-between overflow-hidden bg-[#071D36] p-5 sm:h-64 sm:p-6">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.045)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.045)_50%,rgba(255,255,255,0.045)_75%,transparent_75%,transparent)] bg-[length:34px_34px] opacity-30" />

        <div className="relative flex items-start justify-between gap-4">
          <span className="border border-[#D2AD3D]/45 bg-[#172F51] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D2AD3D]">
            {project.category}
          </span>
          <span className="border border-white/15 bg-black/15 px-3 py-1.5 text-xs font-semibold text-white/70">
            {project.year}
          </span>
        </div>

        <div className="relative">
          <h2 className="font-serif text-2xl font-medium leading-tight text-white sm:text-[28px]">
            {project.title}
          </h2>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/55">
            <MapPin size={15} className="text-[#D2AD3D]" />
            {project.location}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-3 border-b border-[#071D36]/10 pb-5">
          <ProjectMetric label="Surface" value={project.surface} />
          <ProjectMetric label="Budget" value={project.budget} />
          <ProjectMetric label="Durée" value={project.duration} />
        </div>

        <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            <span className="border border-[#071D36]/10 bg-[#F6F5F0] px-3 py-1.5 text-xs text-[#071D36]/50">
              Maîtrise d&apos;oeuvre
            </span>
            <span className="border border-[#071D36]/10 bg-[#F6F5F0] px-3 py-1.5 text-xs text-[#071D36]/50">
              Suivi complet
            </span>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-[#B28C20] transition hover:text-[#071D36]">
            Voir
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#071D36]/35">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-[#071D36]">{value}</p>
    </div>
  );
}
