import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { api } from "@/lib/api/client";
import styles from "../projets.module.css";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await api.getProject(id).catch(() => null);

  if (!project) notFound();

  const year = new Date(project.createdAt).getFullYear();

  return (
    <main className={styles.pageCenter}>
      <div className={styles.site}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>›</span>
              <Link href="/projets">Projets</Link>
              <span>›</span>
              <strong>{project.title}</strong>
            </div>
            <p className={styles.eyebrow}>
              {project.category || "Projet"} · {year}
            </p>
            <h1>{project.title}</h1>
            <p>
              <MapPin size={15} /> Cameroun
            </p>
          </div>
        </section>

        <section className={styles.listing}>
          <article className={styles.programme}>
            <p className={styles.eyebrow}>{project.category || "Projet"}</p>
            <h2>{project.title}</h2>
            <p className={styles.programmeDescription}>
              {project.description}
            </p>
            <div className={styles.programmeDetails}>
              {[
                [String(year), "Année"],
                [project.category || "Non précisée", "Catégorie"],
                ["Sur devis", "Budget"],
                ["Disponible", "Statut"],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className={styles.programmeActions}>
              <Link href="/contact">
                Demander un devis <ArrowRight size={14} />
              </Link>
              <Link href="/projets">Retour aux projets</Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
