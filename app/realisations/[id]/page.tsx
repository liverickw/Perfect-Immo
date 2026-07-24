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

  const year = new Date(project.completionDate || project.createdAt).getFullYear();
  const primaryService = project.servicesUsed[0] || "Realisation";

  return (
    <main className={styles.pageCenter}>
      <div className={styles.site}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>&rsaquo;</span>
              <Link href="/realisations">Realisations</Link>
              <span>&rsaquo;</span>
              <strong>{project.title}</strong>
            </div>
            <p className={styles.eyebrow}>
              {primaryService} · {year}
            </p>
            <h1>{project.title}</h1>
            <p className={styles.heroDescription}>{project.description}</p>
          </div>
        </section>

        <section className={styles.gallery}>
          <article className={styles.projectCard}>
            <div className={styles.projectImage}>
              <span className={styles.projectPattern} />
              <span className={styles.typeBadge}>{primaryService}</span>
              <span className={styles.yearBadge}>{year}</span>
            </div>
            <div className={styles.projectBody}>
              <h2>{project.title}</h2>
              <p className={styles.location}>
                <MapPin size={13} /> {project.location || "Cameroun"}
              </p>
              <p>{project.description}</p>
              <div className={styles.projectFooter}>
                <Link href="/contact">
                  Demarrer un projet similaire <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
