"use client";

import { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Banknote,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  Eye,
  FileCheck,
  FileText,
  Hammer,
  Home,
  KeyRound,
  MapPin,
  Menu,
  Plane,
  Plug,
  Plus,
  ReceiptText,
  Ruler,
  Scale,
  Send,
  ShieldCheck,
  Star,
  Store,
  Users,
  Wrench,
} from "lucide-react";
import type { ApiService, ApiServiceFaq, ServicePageSettings } from "@/lib/api/types";
import { sortByDisplayOrder } from "@/lib/services-default";
import styles from "@/app/services/services.module.css";

const iconMap = {
  BadgeCheck,
  Banknote,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  Eye,
  FileCheck,
  FileText,
  Hammer,
  Home,
  KeyRound,
  MapPin,
  Plane,
  Plug,
  ReceiptText,
  Ruler,
  Scale,
  ShieldCheck,
  Star,
  Store,
  Users,
  Wrench,
};

function iconFor(name?: string | null): LucideIcon {
  return iconMap[name as keyof typeof iconMap] || Building2;
}

function lines(value?: string | null) {
  return String(value || "").split("\n");
}

function headingWithHighlight(title?: string | null, highlight?: string | null) {
  const parts = lines(title);
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 && <br />}
        </span>
      ))}
      {highlight && (
        <>
          {parts.length > 0 && <br />}
          <em>{highlight}</em>
        </>
      )}
    </>
  );
}

export default function ServicesClient({
  services,
  pageSettings,
}: {
  services: ApiService[];
  pageSettings: ServicePageSettings;
}) {
  const orderedServices = sortByDisplayOrder(services);
  const [activeTab, setActiveTab] = useState(orderedServices[0]?.tabId || "TOPO");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const activeService = orderedServices.find((service) => service.tabId === activeTab) || orderedServices[0];

  function selectTab(id: string) {
    setActiveTab(id);
    setOpenFaq(0);
  }

  return (
    <div className={styles.site}>
      <ServicesNav />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <Link href="/">Accueil</Link>
            <span>›</span>
            <strong>Services</strong>
          </div>
          <p className={styles.eyebrow}>{pageSettings.hero.eyebrow}</p>
          <h1>
            {pageSettings.hero.titleBeforeHighlight}{" "}
            <em>{pageSettings.hero.highlightedTitle}</em>
            <br />
            {pageSettings.hero.titleAfterHighlight}
          </h1>
          <p className={styles.heroDescription}>{pageSettings.hero.description}</p>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {sortByDisplayOrder(pageSettings.stats).map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <nav className={styles.tabsBar} aria-label="Catégories de services">
        <div className={styles.tabsNav}>
          {orderedServices.map((service) => {
            const Icon = iconFor(service.icon);
            const id = service.tabId || service.slug;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectTab(id)}
                className={`${styles.tabButton} ${activeTab === id ? styles.activeTab : ""}`}
              >
                <Icon size={18} />
                {service.tabLabel || service.category || service.title}
              </button>
            );
          })}
        </div>
      </nav>

      <section className={styles.panel}>
        {activeService && <ServicePanel service={activeService} openFaq={openFaq} setOpenFaq={setOpenFaq} />}
      </section>

      {activeService && (
        <section className={styles.ctaBand}>
          <div>
            <h2>{headingWithHighlight(activeService.ctaTitle)}</h2>
            <p>{activeService.ctaSubtitle}</p>
          </div>
          <Link href={activeService.ctaHref || "/contact"} className={styles.navyButton}>
            <Send size={16} /> {activeService.ctaLabel || "Demander un devis"}
          </Link>
        </section>
      )}

      <footer className={styles.footer}>
        <p>© 2025 Perfect Immo & Engineering · Douala, Cameroun</p>
        <div>
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
          <a href="#">Sitemap</a>
        </div>
      </footer>
    </div>
  );
}

function ServicesNav() {
  return (
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
        <Link href="/" className={styles.navLink}>Accueil</Link>
        <Link href="/services" className={`${styles.navLink} ${styles.activeNavLink}`}>Services</Link>
        <Link href="/realisations" className={styles.navLink}>Réalisations</Link>
        <Link href="/projets" className={styles.navLink}>Projets</Link>
        <Link href="/contact" className={styles.navLink}>Contact</Link>
      </nav>
      <Link href="/contact" className={styles.navCta}>Devis gratuit</Link>
      <button className={styles.mobileToggle} aria-label="Menu"><Menu size={24} /></button>
    </header>
  );
}

function ServicePanel({
  service,
  openFaq,
  setOpenFaq,
}: {
  service: ApiService;
  openFaq: number | null;
  setOpenFaq: (index: number | null) => void;
}) {
  const isPricingTable = service.pricingRows.length > 0;

  if (isPricingTable) {
    return <PricingTable service={service} />;
  }

  return (
    <>
      <SectionHeading
        eyebrow={service.eyebrow || service.category || ""}
        title={headingWithHighlight(service.heroTitle || service.title, service.heroHighlight)}
        description={service.description}
      />
      {service.featuredTitle && (
        <FeaturedService
          label={service.featuredLabel || "PRESTATION PRINCIPALE"}
          title={headingWithHighlight(service.featuredTitle)}
          description={service.longDescription || service.description}
          points={sortByDisplayOrder(service.features).map((item) => item.text)}
          ctaLabel={service.featuredCtaLabel || "Demander un devis"}
          ctaHref={service.featuredCtaHref || "/contact"}
        />
      )}
      {service.cards.length > 0 && <ServiceGrid service={service} />}
      {service.pricingPlans.length > 0 && <PricingCards service={service} />}
      {service.processSteps.length > 0 && (
        <ProcessBlock title={service.processTitle || "PROCESSUS"} steps={service.processSteps} />
      )}
      {service.showTestimonials && service.testimonials.length > 0 && <Testimonials service={service} />}
      {service.showEngagements && service.engagements.length > 0 && <Engagements service={service} />}
      {service.faqs.length > 0 && (
        <FaqBlock
          title={service.faqTitle || "Questions fréquentes"}
          faqs={service.faqs}
          openFaq={openFaq}
          setOpenFaq={setOpenFaq}
        />
      )}
    </>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return (
    <header className={styles.sectionHeading}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <div>{description}</div>
    </header>
  );
}

function FeaturedService({
  label,
  title,
  description,
  points,
  ctaLabel,
  ctaHref,
}: {
  label: string;
  title: React.ReactNode;
  description: string;
  points: string[];
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <article className={styles.featuredService}>
      <div>
        <p className={styles.featuredLabel}>{label}</p>
        <h3>{title}</h3>
        <div className={styles.featuredDescription}>{description}</div>
        <Link href={ctaHref} className={styles.goldButton}>
          <Hammer size={16} /> {ctaLabel}
        </Link>
      </div>
      <div className={styles.featuredPoints}>
        {points.map((point) => (
          <div key={point}><span /><p>{point}</p></div>
        ))}
      </div>
    </article>
  );
}

function ServiceGrid({ service }: { service: ApiService }) {
  return (
    <div className={styles.serviceGrid}>
      {sortByDisplayOrder(service.cards).map(({ icon, title, description, tags }) => {
        const Icon = iconFor(icon);
        return (
          <article key={title} className={styles.serviceCard}>
            <span className={styles.serviceIcon}><Icon size={22} /></span>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={styles.tags}>
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ProcessBlock({ title, steps }: { title: string; steps: ApiService["processSteps"] }) {
  return (
    <section className={styles.processBlock}>
      <h3>{title}</h3>
      <div className={styles.steps}>
        {sortByDisplayOrder(steps).map((step) => (
          <div key={`${step.number}-${step.firstLine}`} className={styles.step}>
            <strong>{step.number}</strong>
            <p>{step.firstLine}<br />{step.secondLine}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqBlock({
  title,
  faqs,
  openFaq,
  setOpenFaq,
}: {
  title: string;
  faqs: ApiServiceFaq[];
  openFaq: number | null;
  setOpenFaq: (index: number | null) => void;
}) {
  return (
    <section className={styles.faqBlock}>
      <h3>{title}</h3>
      {sortByDisplayOrder(faqs).map((faq, index) => {
        const isOpen = openFaq === index;
        return (
          <article key={faq.question} className={`${styles.faqItem} ${isOpen ? styles.openFaq : ""}`}>
            <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
              <span>{faq.question}</span>
              <strong><Plus size={15} /></strong>
            </button>
            {isOpen && <p>{faq.answer}</p>}
          </article>
        );
      })}
    </section>
  );
}

function Testimonials({ service }: { service: ApiService }) {
  return (
    <div className={styles.testimonials}>
      {sortByDisplayOrder(service.testimonials).map((item) => (
        <article key={item.name}>
          <div>★★★★★</div>
          <p>{item.quote}</p>
          <strong>{item.name}</strong>
          <span>{item.role}</span>
        </article>
      ))}
    </div>
  );
}

function Engagements({ service }: { service: ApiService }) {
  return (
    <div className={styles.engagements}>
      {sortByDisplayOrder(service.engagements).map((item) => {
        const Icon = iconFor(item.icon);
        return (
          <article key={item.title}>
            <Icon size={26} />
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
          </article>
        );
      })}
    </div>
  );
}

function PricingCards({ service }: { service: ApiService }) {
  return (
    <div className={styles.pricingGrid}>
      {sortByDisplayOrder(service.pricingPlans).map((plan) => (
        <article key={plan.name} className={`${styles.priceCard} ${plan.featured ? styles.featuredPrice : ""}`}>
          {plan.featured && <span className={styles.priceBadge}>Recommandé</span>}
          <h3>{plan.name}</h3>
          <strong className={plan.price === "Sur devis" ? styles.smallPrice : ""}>{plan.price}</strong>
          <p>{plan.note}</p>
          <ul>
            {plan.features.map((feature) => <li key={feature}><Check size={12} /> {feature}</li>)}
          </ul>
          <Link href={service.ctaHref || "/contact"}>Choisir</Link>
        </article>
      ))}
    </div>
  );
}

function PricingTable({ service }: { service: ApiService }) {
  const headers = service.priceTableHeaders.length ? service.priceTableHeaders : ["Equipment", "Price", "Duration"];
  return (
    <>
      <SectionHeading
        eyebrow={service.eyebrow || ""}
        title={headingWithHighlight(service.heroTitle || service.title, service.heroHighlight)}
        description={service.description}
      />
      <div className={styles.priceTable}>
        <div className={`${styles.priceRow} ${styles.priceHead}`}>
          {headers.map((header) => <span key={header}>{header}</span>)}
        </div>
        {sortByDisplayOrder(service.pricingRows).map((row) => (
          <div key={row.item} className={`${styles.priceRow} ${row.highlighted ? styles.highlightRow : ""}`}>
            <span>{row.item}</span>
            <span>{row.price}</span>
            <span>{row.duration}</span>
          </div>
        ))}
      </div>
      <div className={styles.priceNote}>{service.pricingNote}</div>
    </>
  );
}
