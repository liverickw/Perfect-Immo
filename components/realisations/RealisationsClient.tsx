"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Building2, MapPin, Menu, Phone, Plus, Send, X } from "lucide-react";
import type { ApiRealisation } from "@/lib/api/types";
import { realisationFilters, type RealisationCategory, type RealisationFilter } from "@/lib/realisations-default";
import styles from "@/app/realisations/realisations.module.css";

type Sort = "recent" | "oldest" | "surface";

function categoryOf(project: ApiRealisation): RealisationCategory {
  const value = (project.category || project.categoryLabel || project.servicesUsed?.[0] || "").toLowerCase();
  if (value.includes("gnss") || value.includes("géod") || value.includes("geod")) return "geodesy";
  if (value.includes("sig") || value.includes("cart")) return "gis";
  if (value.includes("arch")) return "architecture";
  if (value.includes("equip") || value.includes("équip")) return "equipment";
  return "topography";
}

function categoryLabel(project: ApiRealisation) {
  const category = categoryOf(project);
  return project.categoryLabel || realisationFilters.find((option) => option.id === category)?.label || "Topographie";
}

function yearOf(project: ApiRealisation) {
  return project.year || new Date(project.completionDate || project.createdAt).getFullYear();
}

function metricsOf(project: ApiRealisation): [string, string][] {
  if (project.metrics?.length) {
    return [...project.metrics]
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .slice(0, 3)
      .map((metric) => [metric.label, metric.value]);
  }

  return [
    ["Année", String(yearOf(project))],
    ["Mission", project.servicesUsed?.[0] || categoryLabel(project)],
    ["Résultat", project.result || "Livré"],
  ];
}

function tagsOf(project: ApiRealisation) {
  return project.technicalTags?.length ? project.technicalTags : project.servicesUsed?.length ? project.servicesUsed : [categoryLabel(project), "PIE"];
}

function featuresOf(project: ApiRealisation) {
  return project.features?.length ? project.features : tagsOf(project);
}

export default function RealisationsClient({ realisations }: { realisations: ApiRealisation[] }) {
  const [filter, setFilter] = useState<RealisationFilter>("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [selectedProject, setSelectedProject] = useState<ApiRealisation | null>(null);

  const counts = useMemo(
    () =>
      realisationFilters.reduce<Record<RealisationFilter, number>>(
        (result, option) => {
          result[option.id] =
            option.id === "all"
              ? realisations.length
              : realisations.filter((project) => categoryOf(project) === option.id).length;
          return result;
        },
        { all: 0, topography: 0, geodesy: 0, gis: 0, architecture: 0, equipment: 0 },
      ),
    [realisations],
  );

  const visibleProjects = useMemo(() => {
    const filtered =
      filter === "all"
        ? [...realisations]
        : realisations.filter((project) => categoryOf(project) === filter);

    return filtered.sort((a, b) => {
      if (sort === "oldest") return yearOf(a) - yearOf(b);
      if (sort === "surface") return (b.surfaceValue ?? 0) - (a.surfaceValue ?? 0);
      return yearOf(b) - yearOf(a);
    });
  }, [filter, realisations, sort]);

  return (
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
              <div key={label}><strong>{number}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <nav className={styles.filterBar} aria-label="Filtres des réalisations">
        <div className={styles.filterTabs}>
          {realisationFilters.map((option) => (
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
          <p>Affichage : <strong>{visibleProjects.length}</strong> projets</p>
          <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} aria-label="Trier les projets">
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
          <Plus size={16} /> Voir plus de projets (2015-2018) <ArrowRight size={14} />
        </Link>
      </div>

      <Testimonials />

      <section className={styles.cta}>
        <div>
          <h2>Confiez votre prochain<br />projet à nos experts</h2>
          <p>Étude gratuite • Réponse rapide • Intervention partout au Cameroun</p>
        </div>
        <Link href="/contact" className={styles.navyButton}><Send size={16} /> Demander un devis</Link>
      </section>

      <footer className={styles.footer}>
        <p>© 2025 Perfect Immo & Engineering · Douala, Cameroun</p>
        <div><a href="#">Mentions légales</a><a href="#">Confidentialité</a><a href="#">Sitemap</a></div>
      </footer>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

function PortfolioNav() {
  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoMark}>PI</span>
        <span>
          <span className={styles.logoText}>Perfect Immo <em>&</em> Engineering</span>
          <span className={styles.logoSub}>Douala, Cameroun</span>
        </span>
      </Link>
      <nav className={styles.navLinks} aria-label="Navigation principale">
        <Link href="/" className={styles.navLink}>Accueil</Link>
        <Link href="/services" className={styles.navLink}>Services</Link>
        <Link href="/realisations" className={`${styles.navLink} ${styles.activeNavLink}`}>Réalisations</Link>
        <Link href="/projets" className={styles.navLink}>Projets</Link>
        <Link href="/contact" className={styles.navLink}>Contact</Link>
      </nav>
      <Link href="/contact" className={styles.navCta}>Devis gratuit</Link>
      <button className={styles.mobileToggle} aria-label="Menu"><Menu size={24} /></button>
    </header>
  );
}

function ProjectImage({ project }: { project: ApiRealisation }) {
  if (project.imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.imageUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  }
  return <span className={styles.projectPattern} />;
}

function ProjectCard({ project, featured, onOpen }: { project: ApiRealisation; featured?: boolean; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className={`${styles.projectCard} ${featured ? styles.featuredProject : ""}`}>
      <div className={styles.projectImage} style={{ backgroundColor: project.color || "#1E3A64" }}>
        <ProjectImage project={project} />
        <span className={styles.projectOverlay} />
        <span className={styles.typeBadge}>{categoryLabel(project)}</span>
        <span className={styles.yearBadge}>{yearOf(project)}</span>
        {project.result && <span className={styles.award}><Award size={13} /> {project.result}</span>}
      </div>
      <div className={styles.projectBody}>
        <h2>{project.title}</h2>
        <p className={styles.location}><MapPin size={13} /> {project.location || "Cameroun"}</p>
        <div className={styles.projectMeta}>
          {metricsOf(project).map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
        <div className={styles.projectFooter}>
          <div>{tagsOf(project).slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <strong>Voir <ArrowRight size={13} /></strong>
        </div>
      </div>
    </button>
  );
}

function Testimonials() {
  const testimonials = [
    {
      initials: "JN",
      quote: "PIE a réalisé le levé topographique de notre site industriel avec une grande précision. Les livrables étaient conformes aux délais et parfaitement exploitables.",
      name: "Jean-Paul Nzambe",
      role: "Chef de projet - Entreprise BTP",
    },
    {
      initials: "MN",
      quote: "Grâce à leur expertise en cartographie SIG, nous disposons aujourd'hui d'une base de données géospatiale fiable qui facilite la gestion de nos infrastructures.",
      name: "Marie Ndzie",
      role: "Responsable SIG - Collectivité locale",
    },
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsInner}>
        <header><p className={styles.eyebrow}>Ce que disent nos clients</p><h2>Témoignages sur nos réalisations</h2></header>
        <div className={styles.testimonialGrid}>
          {testimonials.map((item) => (
            <article key={item.name}>
              <div className={styles.stars}>★★★★★</div>
              <p>{item.quote}</p>
              <footer><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.role}</small></div></footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: ApiRealisation; onClose: () => void }) {
  return (
    <div className={styles.modalOverlay} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <header>
          <div><p>{categoryLabel(project)} · {yearOf(project)}</p><h2>{project.title}</h2></div>
          <button type="button" onClick={onClose} aria-label="Fermer"><X size={17} /></button>
        </header>
        <div className={styles.modalImage} style={{ backgroundColor: project.color || "#1E3A64" }}>
          <ProjectImage project={project} />
        </div>
        <div className={styles.modalBody}>
          <h3>{project.title}</h3>
          <p className={styles.modalLocation}><MapPin size={13} /> {project.location || "Cameroun"}</p>
          <div className={styles.modalSpecs}>
            {metricsOf(project).map(([label, value]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <h4>Description</h4>
          <p className={styles.modalDescription}>{project.description}</p>
          <div className={styles.modalFeatures}>{featuresOf(project).map((feature) => <span key={feature}>{feature}</span>)}</div>
          <div className={styles.modalActions}>
            <Link href="/contact"><Send size={15} /> Démarrer un projet similaire</Link>
            <Link href="/contact"><Phone size={15} /> Être rappelé</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
