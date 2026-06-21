"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Globe,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import styles from "./contact.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--contact-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--contact-sans",
  display: "swap",
});

const services = [
  "Achat immobilier",
  "Location",
  "Maîtrise d'oeuvre",
  "Études & ingénierie",
  "Gestion locative",
  "Permis de construire",
  "Estimation bien",
  "Autre demande",
];

const budgets = [
  "< 10M FCFA",
  "10-50M FCFA",
  "50-100M FCFA",
  "100-500M FCFA",
  "> 500M FCFA",
  "Non défini",
];

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [serviceError, setServiceError] = useState(false);

  function toggleService(service: string) {
    setServiceError(false);
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    if (selectedServices.length === 0) {
      setServiceError(true);
      return;
    }

    setReference(`PIE-2025-${Math.floor(Math.random() * 9000) + 1000}`);
    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false);
    setSelectedServices([]);
    setSelectedBudget("");
    setServiceError(false);
    setFormKey((current) => current + 1);
  }

  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <div className={styles.site}>
        <ContactNav />

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>›</span>
              <strong>Contact</strong>
            </div>
            <p className={styles.eyebrow}>Parlons de votre projet</p>
            <h1>
              Contactez <em>notre équipe</em>
            </h1>
            <p>
              Notre équipe vous répond sous 24h ouvrées. Consultation initiale
              gratuite et sans engagement.
            </p>
          </div>
        </section>

        <section className={styles.quickBar}>
          <div className={styles.quickInner}>
            <QuickLink
              href="tel:+237676438342"
              icon={Phone}
              label="Téléphone"
              value="+237 676 438 342"
            />
            <QuickLink
              href="mailto:contact@perfectimmo.cm"
              icon={Mail}
              label="Email"
              value="contact@perfectimmo.cm"
            />
            <QuickLink
              href="#map"
              icon={MapPin}
              label="Adresse"
              value="Bonanjo, Douala"
            />
          </div>
        </section>

        <section className={styles.urgency}>
          <div className={styles.urgencyInner}>
            <span className={styles.urgencyDot} />
            <p>3 consultations gratuites disponibles cette semaine</p>
            <span className={styles.urgencyBadge}>Délai de réponse : 24h</span>
          </div>
        </section>

        <section className={styles.contactLayout}>
          <div className={styles.formSide}>
            <h2>Envoyez-nous un message</h2>
            <p className={styles.formSubtitle}>
              Tous les champs marqués d&apos;un <em>*</em> sont obligatoires
            </p>

            {submitted ? (
              <SuccessMessage reference={reference} onReset={resetForm} />
            ) : (
              <form key={formKey} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <Field
                    label="Prénom"
                    name="firstName"
                    placeholder="Jean-Marc"
                    required
                  />
                  <Field
                    label="Nom"
                    name="lastName"
                    placeholder="Essomba"
                    required
                  />
                </div>

                <Field
                  label="Adresse email"
                  name="email"
                  type="email"
                  placeholder="jean.essomba@email.com"
                  required
                />

                <div className={styles.formRow}>
                  <Field
                    label="Téléphone"
                    name="phone"
                    type="tel"
                    placeholder="+237 6XX XXX XXX"
                    required
                  />
                  <SelectField label="Ville" name="city">
                    <option value="">Sélectionner...</option>
                    <option>Douala</option>
                    <option>Yaoundé</option>
                    <option>Bafoussam</option>
                    <option>Kribi</option>
                    <option>Autre ville</option>
                  </SelectField>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Service concerné <em>*</em>
                  </label>
                  <div className={styles.serviceChips}>
                    {services.map((service) => (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={
                          selectedServices.includes(service)
                            ? styles.selectedChip
                            : ""
                        }
                        aria-pressed={selectedServices.includes(service)}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {serviceError && (
                    <p className={styles.fieldError}>
                      Veuillez sélectionner au moins un service.
                    </p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Budget estimé</label>
                  <div className={styles.budgetGrid}>
                    {budgets.map((budget) => (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => setSelectedBudget(budget)}
                        className={
                          selectedBudget === budget ? styles.selectedChip : ""
                        }
                        aria-pressed={selectedBudget === budget}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <SelectField label="Objet de votre demande" name="subject">
                  <option value="">Choisir l&apos;objet...</option>
                  <option>Demande de devis</option>
                  <option>Demande de visite</option>
                  <option>Consultation technique</option>
                  <option>Partenariat</option>
                  <option>Information générale</option>
                  <option>Réclamation</option>
                </SelectField>

                <div className={styles.formGroup}>
                  <label htmlFor="message">
                    Votre message <em>*</em>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Décrivez votre projet ou votre demande avec le maximum de détails (localisation souhaitée, superficie, délai, contraintes particulières...)"
                  />
                </div>

                <SelectField
                  label="Comment avez-vous entendu parler de nous ?"
                  name="source"
                >
                  <option value="">Sélectionner...</option>
                  <option>Google / Recherche web</option>
                  <option>Recommandation d&apos;un ami</option>
                  <option>Réseaux sociaux</option>
                  <option>Panneau publicitaire</option>
                  <option>Partenaire professionnel</option>
                  <option>Autre</option>
                </SelectField>

                <label className={styles.rgpd}>
                  <input type="checkbox" required />
                  <span>
                    J&apos;accepte que mes données soient traitées par Perfect
                    Immo & Engineering pour traiter ma demande, conformément à
                    la <a href="#">politique de confidentialité</a>. Ces données
                    ne seront jamais revendues à des tiers. <em>*</em>
                  </span>
                </label>

                <button type="submit" className={styles.submitButton}>
                  <Send size={16} />
                  Envoyer ma demande
                  <span>→</span>
                </button>
                <p className={styles.formNote}>
                  <Lock size={12} /> Formulaire sécurisé · Réponse garantie sous
                  24h ouvrées
                </p>
              </form>
            )}
          </div>

          <aside id="map" className={styles.infoSide}>
            <MapPlaceholder />
            <ContactInfo />
            <OpeningHours />

            <a
              href="https://wa.me/237676438342"
              className={styles.whatsappButton}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={24} />
              <span>
                <strong>Écrire sur WhatsApp</strong>
                <small>Réponse en moins de 2h</small>
              </span>
            </a>

            <section className={styles.infoBlock}>
              <h3>Nos réseaux sociaux</h3>
              <div className={styles.socials}>
                {[MessageCircle, Globe, Mail, Phone].map((Icon, index) => (
                  <a key={index} href="#" aria-label={`Réseau social ${index + 1}`}>
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </section>

            <section className={styles.consultation}>
              <h3>Consultation gratuite</h3>
              <p>
                Premier rendez-vous offert pour tout nouveau projet de
                construction ou d&apos;acquisition immobilière.
              </p>
              <strong>
                <Calendar size={14} /> Prenez RDV dès aujourd&apos;hui
              </strong>
            </section>
          </aside>
        </section>

        <footer className={styles.footer}>
          <p>© 2025 Perfect Immo & Engineering · Douala, Cameroun</p>
          <div>
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Sitemap</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

function ContactNav() {
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
        <Link href="/" className={styles.navLink}>
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
        <Link
          href="/contact"
          className={`${styles.navLink} ${styles.activeNavLink}`}
        >
          Contact
        </Link>
      </nav>
      <a href="tel:+237676438342" className={styles.navCta}>
        +237 676 438 342
      </a>
      <button className={styles.mobileToggle} aria-label="Menu">
        <Menu size={24} />
      </button>
    </header>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <a href={href} className={styles.quickItem}>
      <span>
        <Icon size={19} />
      </span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>
        {label} {required && <em>*</em>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name}>
        {children}
      </select>
    </div>
  );
}

function SuccessMessage({
  reference,
  onReset,
}: {
  reference: string;
  onReset: () => void;
}) {
  return (
    <div className={styles.success}>
      <CheckCircle2 size={42} />
      <h3>Message envoyé avec succès !</h3>
      <p>
        Un conseiller vous contactera dans les 24h ouvrées.
        <br />
        Référence : <strong>#{reference}</strong>
      </p>
      <button type="button" onClick={onReset}>
        Envoyer un autre message
      </button>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <a
      href="https://www.google.com/maps/search/?api=1&query=Bonanjo+Douala+Cameroun"
      target="_blank"
      rel="noreferrer"
      className={styles.map}
    >
      <span className={styles.mapGrid} />
      <span className={styles.mapMarker}>
        <i />
        <b />
      </span>
      <strong>Bonanjo, Douala</strong>
      <small>Voir sur Google Maps</small>
    </a>
  );
}

function ContactInfo() {
  return (
    <section className={styles.infoBlock}>
      <h3>Nos coordonnées</h3>
      <InfoItem
        icon={MapPin}
        label="Adresse"
        content={
          <>
            Immeuble PI&E, Avenue de la Liberté
            <br />
            Bonanjo - Douala, Cameroun
          </>
        }
      />
      <InfoItem
        icon={Phone}
        label="Téléphone"
        content={
          <>
            <a href="tel:+237676438342">+237 676 438 342</a>
            <br />
            <small>+237 233 XX XX XX (bureau)</small>
          </>
        }
      />
      <InfoItem
        icon={Mail}
        label="Email"
        content={
          <>
            <a href="mailto:contact@perfectimmo.cm">
              contact@perfectimmo.cm
            </a>
            <br />
            <small>info@perfectimmo.cm</small>
          </>
        }
      />
      <InfoItem
        icon={Globe}
        label="Site web"
        content={<em>www.perfectimmo.cm</em>}
      />
    </section>
  );
}

function InfoItem({
  icon: Icon,
  label,
  content,
}: {
  icon: typeof Phone;
  label: string;
  content: React.ReactNode;
}) {
  return (
    <div className={styles.infoItem}>
      <span>
        <Icon size={17} />
      </span>
      <div>
        <small>{label}</small>
        <p>{content}</p>
      </div>
    </div>
  );
}

function OpeningHours() {
  return (
    <section className={styles.infoBlock}>
      <h3>Horaires d&apos;ouverture</h3>
      <div className={styles.hours}>
        <p>
          <span>Lun - Ven</span>
          <strong>08h00 - 18h00</strong>
        </p>
        <p>
          <span>Samedi</span>
          <strong>09h00 - 14h00</strong>
        </p>
        <p>
          <span>Dimanche</span>
          <em>Fermé</em>
        </p>
      </div>
      <small className={styles.emergency}>
        Urgences chantier : disponible 7j/7 par WhatsApp
      </small>
    </section>
  );
}
