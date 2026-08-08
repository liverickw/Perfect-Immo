import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  DraftingCompass,
  Globe,
  Hammer,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Ruler,
} from "lucide-react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { api, safeApi } from "@/lib/api/client";
import type { HomepageContent } from "@/lib/api/types";
import { byDisplayOrder, defaultHomepageContent } from "@/lib/homepage-default";
import styles from "./home.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--home-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--home-sans",
  display: "swap",
});

const iconMap = {
  BadgeCheck,
  Banknote,
  Building2,
  DraftingCompass,
  Hammer,
  Home,
  KeyRound,
  Ruler,
};

function iconFor(name: string) {
  return iconMap[name as keyof typeof iconMap] || Building2;
}

export default async function HomePage() {
  const homepage = await safeApi<HomepageContent>(
    () => api.getHomepage(),
    defaultHomepageContent,
  );
  const heroStats = byDisplayOrder(homepage.hero.stats);
  const services = byDisplayOrder(homepage.expertise.services);
  const projects = byDisplayOrder(homepage.portfolio.projects);
  const values = byDisplayOrder(homepage.about.values);
  const aboutStats = byDisplayOrder(homepage.about.stats);
  const steps = byDisplayOrder(homepage.process.steps);
  const testimonials = byDisplayOrder(homepage.testimonials.items);
  const posts = byDisplayOrder(homepage.blog.posts);

  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <div className={styles.site}>
        <header className={styles.navbar}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>PI</span>
            <span>
              <span className={styles.logoText}>
                Perfect Immo <em>&</em> Engineering
              </span>
              <span className={styles.logoSub}>Douala, Cameroun</span>
            </span>
          </Link>

          <nav className={styles.navLinks} aria-label="Navigation principale">
            <Link href="/" className={`${styles.navLink} ${styles.activeLink}`}>
              Accueil
            </Link>
            <Link href="/services" className={styles.navLink}>
              Services
            </Link>
            <Link href="/realisations" className={styles.navLink}>
              Réalisations
            </Link>
            <Link href="/projets" className={styles.navLink}>
              Projets
            </Link>
            <Link href="/#blog" className={styles.navLink}>
              Blog
            </Link>
            <Link href="/parametres" className={styles.navLink}>
              Paramètres
            </Link>
          </nav>

          <Link href="/contact" className={styles.navCta}>
            Contact
          </Link>
          <button className={styles.mobileToggle} aria-label="Menu">
            <Menu size={24} />
          </button>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroGrid} />
          <div className={styles.heroGeo} />
          <div className={styles.heroImageZone}>
            <div className={styles.heroImagePlaceholder}>
              {homepage.hero.mediaUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={homepage.hero.mediaUrl} alt={homepage.hero.mediaAlt || ""} />
              ) : (
                <BuildingPlaceholder />
              )}
              <span className={styles.buildingLabel}>{homepage.hero.mediaAlt || "Photo HD ici"}</span>
            </div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.newBadge}>
              <span className={styles.newDot} />
              <span>{homepage.hero.badge}</span>
            </div>
            <p className={styles.eyebrow}>{homepage.hero.eyebrow}</p>
            <h1 className={styles.heroTitle}>
              {homepage.hero.titlePrefix}
              <br />
              {homepage.hero.titleSuffix} <em>{homepage.hero.highlightedTitle}</em>
            </h1>
            <p className={styles.heroDescription}>
              {homepage.hero.description}
            </p>
            <div className={styles.heroActions}>
              <Link href={homepage.hero.primaryCtaHref} className={styles.goldButton}>
                {homepage.hero.primaryCtaLabel} <ArrowRight size={15} />
              </Link>
              <Link href={homepage.hero.secondaryCtaHref} className={styles.outlineButton}>
                {homepage.hero.secondaryCtaLabel}
              </Link>
            </div>
            <div className={styles.heroStats}>
              {heroStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className={styles.heroStat}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <a
          href={homepage.whatsapp.href}
          className={styles.whatsappBar}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={24} />
          <span>
            <strong>{homepage.whatsapp.label}</strong>
            <small>{homepage.whatsapp.detail}</small>
          </span>
        </a>

        <section className={`${styles.section} ${styles.whiteSection}`}>
          <SectionHeader
            eyebrow={homepage.expertise.eyebrow}
            title={
              <>
                {homepage.expertise.titleLine1}
                <br />
                {homepage.expertise.titleLine2}
              </>
            }
            description={homepage.expertise.description}
          />
          <div className={styles.servicesGrid}>
            {services.map(({ icon, title, description }) => {
              const Icon = iconFor(icon);
              return (
                <article key={title} className={styles.serviceCard}>
                  <span className={styles.serviceIcon}>
                    <Icon size={24} />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ArrowRight className={styles.serviceArrow} size={19} />
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader
            eyebrow={homepage.portfolio.eyebrow}
            title={
              <>
                {homepage.portfolio.titleLine1}
                <br />
                {homepage.portfolio.titleLine2}
              </>
            }
          />
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <article
                key={project.name}
                className={`${styles.projectCard} ${
                  project.featured ? styles.featuredProject : ""
                }`}
              >
                <div className={styles.projectPattern} />
                <div className={styles.projectOverlay}>
                  <span className={styles.projectTag}>{project.tag}</span>
                  <h3>{project.name}</h3>
                  <p>
                    <MapPin size={12} /> {project.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.centerAction}>
            <Link href={homepage.portfolio.ctaHref} className={styles.goldButton}>
              {homepage.portfolio.ctaLabel} <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <section id="a-propos" className={styles.about}>
          <div className={styles.aboutGrid}>
            <div>
              <p className={styles.eyebrow}>{homepage.about.eyebrow}</p>
              <h2 className={styles.aboutTitle}>
                {homepage.about.titleLine1}
                <br />
                {homepage.about.titleLine2} <em>{homepage.about.highlightedTitle}</em>
              </h2>
              <p className={styles.aboutDescription}>
                {homepage.about.description}
              </p>
              <div className={styles.valueList}>
                {values.map((value) => (
                  <div key={value.text} className={styles.valueItem}>
                    <span />
                    {value.text}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.aboutStats}>
              {aboutStats.map((stat) => (
                <article key={stat.label} className={styles.aboutStat}>
                  <strong>{stat.value}</strong>
                  <div>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.process}>
          <div className={styles.processHeader}>
            <p className={styles.centeredEyebrow}>{homepage.process.eyebrow}</p>
            <h2>{homepage.process.title}</h2>
          </div>
          <div className={styles.processSteps}>
            {steps.map((step, index) => (
              <div key={step.number} className={styles.processStep}>
                {index > 0 && <span className={styles.stepLine} />}
                <strong>{step.number}</strong>
                <p>
                  {step.firstLine}
                  <br />
                  {step.secondLine}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.whiteSection}`}>
          <SectionHeader
            eyebrow={homepage.testimonials.eyebrow}
            title={homepage.testimonials.title}
          />
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className={styles.testimonialCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.quote}>{testimonial.quote}</p>
                <div className={styles.author}>
                  <span>{testimonial.initials}</span>
                  <div>
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="blog" className={styles.section}>
          <SectionHeader eyebrow={homepage.blog.eyebrow} title={homepage.blog.title} />
          <div className={styles.blogGrid}>
            {posts.map(({ icon, category, title, date }) => {
              const Icon = iconFor(icon);
              return (
                <article key={title} className={styles.blogCard}>
                  <div className={styles.blogImage}>
                    <Icon size={36} />
                  </div>
                  <div className={styles.blogBody}>
                    <p className={styles.blogCategory}>{category}</p>
                    <h3>{title}</h3>
                    <time>{date}</time>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.finalCta}>
          <p className={styles.ctaEyebrow}>{homepage.finalCta.eyebrow}</p>
          <h2>
            {homepage.finalCta.titleLine1}
            <br />
            {homepage.finalCta.titleLine2} <em>{homepage.finalCta.highlightedTitle}</em>
          </h2>
          <p className={styles.ctaDescription}>
            {homepage.finalCta.description}
          </p>
          <div className={styles.ctaActions}>
            <Link href={homepage.finalCta.primaryCtaHref} className={styles.goldButton}>
              {homepage.finalCta.primaryCtaLabel} <ArrowRight size={15} />
            </Link>
            <Link href={homepage.finalCta.secondaryCtaHref} className={styles.outlineButton}>
              {homepage.finalCta.secondaryCtaLabel}
            </Link>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <div>
              <h2 className={styles.footerLogo}>
                Perfect Immo <em>&</em> Engineering
              </h2>
              <p className={styles.footerTagline}>
                Votre partenaire immobilier et d&apos;ingénierie de confiance à
                Douala, Cameroun. Excellence, rigueur et innovation.
              </p>
              <div className={styles.footerContact}>
                <p>
                  <MapPin size={13} /> Bonanjo, Douala, Cameroun
                </p>
                <a href="tel:+237676438342">
                  <Phone size={13} /> +237 676 438 342
                </a>
                <a href="mailto:contact@perfectimmo.cm">
                  <Mail size={13} /> contact@perfectimmo.cm
                </a>
              </div>
            </div>
            <FooterColumn
              title="Navigation"
              links={[
                ["Accueil", "/"],
                ["À propos", "/#a-propos"],
                ["Services", "/services"],
                ["Réalisations", "/realisations"],
                ["Projets", "/projets"],
                ["Blog", "/#blog"],
                ["Contact", "/contact"],
                ["Paramètres", "/parametres"],
              ]}
            />
            <FooterColumn
              title="Services"
              links={[
                ["Vente immobilière", "/services"],
                ["Location", "/services"],
                ["Maîtrise d'oeuvre", "/services"],
                ["Études VRD", "/services"],
                ["Gestion locative", "/services"],
                ["Conseil & audit", "/services"],
              ]}
            />
          </div>
          <div className={styles.footerBottom}>
            <p>
              © 2025 Perfect Immo & Engineering · Tous droits réservés ·
              Mentions légales
            </p>
            <div className={styles.socials}>
              {[MessageCircle, Globe, Mail, Phone].map((Icon, index) => (
                <a key={index} href="#" aria-label={`Réseau social ${index + 1}`}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function BuildingPlaceholder() {
  return (
    <div className={styles.building}>
      <div className={styles.buildingTop} />
      <div className={styles.buildingBody}>
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className={styles.buildingWindow} />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <header className={styles.sectionHeader}>
      <p className={styles.sectionEyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className={styles.sectionDescription}>{description}</p>}
    </header>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className={styles.footerColumnTitle}>{title}</h3>
      <ul className={styles.footerLinks}>
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
