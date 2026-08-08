import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { api } from "@/lib/api/client";
import styles from "../realisations.module.css";

export default async function RealisationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await api.getRealisation(id).catch(() => null);

  if (!project) notFound();

  const year = project.year || new Date(project.completionDate || project.createdAt).getFullYear();
  const primaryService = project.categoryLabel || project.servicesUsed[0] || "Réalisation";
  const metrics = project.metrics?.length
    ? project.metrics.map((metric) => [metric.label, metric.value] as const)
    : [
        ["Année", String(year)] as const,
        ["Mission", primaryService] as const,
        ["Résultat", project.result || "Livré"] as const,
      ];

  return (
    <main className={styles.pageCenter}>
      <div className={styles.site}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>&rsaquo;</span>
              <Link href="/realisations">Réalisations</Link>
              <span>&rsaquo;</span>
              <strong>{project.title}</strong>
            </div>
            <p className={styles.eyebrow}>{primaryService} · {year}</p>
            <h1>{project.title}</h1>
            <p className={styles.heroDescription}>{project.description}</p>
          </div>
        </section>

        <section className={styles.gallery}>
          <article className={styles.projectCard}>
            <div className={styles.projectImage} style={{ backgroundColor: project.color || "#1E3A64" }}>
              {project.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.imageUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span className={styles.projectPattern} />
              )}
              <span className={styles.typeBadge}>{primaryService}</span>
              <span className={styles.yearBadge}>{year}</span>
            </div>
            <div className={styles.projectBody}>
              <h2>{project.title}</h2>
              <p className={styles.location}><MapPin size={13} /> {project.location || "Cameroun"}</p>
              <div className={styles.projectMeta}>
                {metrics.slice(0, 3).map(([label, value]) => (
                  <div key={label}><span>{label}</span><strong>{value}</strong></div>
                ))}
              </div>
              <p>{project.description}</p>
              <div className={styles.projectFooter}>
                <div>
                  {(project.technicalTags?.length ? project.technicalTags : project.servicesUsed).slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link href="/contact">Démarrer un projet similaire <ArrowRight size={13} /></Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
