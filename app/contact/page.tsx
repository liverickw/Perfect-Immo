"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Send,
  Lock,
  Calendar,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
    
  return (
    <>
      <Navbar />

      <main>
        <section className="bg-[#0B1F3A] text-white py-20 border-b border-yellow-500/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-sm text-gray-400 mb-8">
              Accueil <span className="text-yellow-500 mx-2">›</span>
              <span className="text-yellow-500">Contact</span>
            </div>

            <p className="uppercase tracking-[4px] text-yellow-500 text-sm font-semibold">
              Parlons de votre projet
            </p>

            <h1 className="mt-5 text-5xl lg:text-6xl font-bold leading-tight">
              Contactez{" "}
              <span className="text-yellow-500 italic">notre équipe</span>
            </h1>

            <p className="mt-6 text-gray-300 max-w-2xl text-lg leading-8">
              Notre équipe vous répond sous 24h ouvrées. Consultation initiale
              gratuite et sans engagement.
            </p>
          </div>
        </section>

        <section className="bg-[#152B4E] border-b border-yellow-500/20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3">
            <QuickItem icon={<Phone />} label="Téléphone" value="+237 6XX XXX XXX" />
            <QuickItem icon={<Mail />} label="Email" value="contact@perfectimmo.cm" />
            <QuickItem icon={<MapPin />} label="Adresse" value="Bonanjo, Douala" />
          </div>
        </section>

        <section className="bg-[#F8F8F5] border-b border-yellow-500/20">
          <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center text-sm">
            <p className="text-yellow-700">
              ● 3 consultations gratuites disponibles cette semaine
            </p>

            <span className="hidden md:block border border-yellow-500/30 px-4 py-1 text-yellow-700">
              Délai de réponse : 24h
            </span>
          </div>
        </section>

        <section className="bg-[#F8F8F5]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.7fr_1fr] border-x border-gray-200">
            <div className="p-8 lg:p-12 border-r border-gray-200">
              <h2 className="text-3xl font-bold text-[#0B1F3A]">
                Envoyez-nous un message
              </h2>

              <p className="mt-2 text-gray-500">
                Tous les champs marqués d'un{" "}
                <span className="text-yellow-600">*</span> sont obligatoires
              </p>

              <form className="mt-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Prénom" placeholder="Jean-Marc" required />
                  <Field label="Nom" placeholder="Essomba" required />
                </div>

                <Field
                  label="Adresse email"
                  placeholder="jean.essomba@email.com"
                  required
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Téléphone" placeholder="+237 6XX XXX XXX" required />

                  <div>
                    <label className="font-semibold text-[#0B1F3A]">
                      Ville
                    </label>
                    <select className="mt-2 w-full border border-gray-200 bg-white px-4 py-4 outline-none">
                      <option>Sélectionner...</option>
                      <option>Douala</option>
                      <option>Yaoundé</option>
                      <option>Kribi</option>
                      <option>Bafoussam</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#0B1F3A]">
                    Service concerné <span className="text-yellow-600">*</span>
                  </label>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {[
                      "Achat immobilier",
                      "Location",
                      "Maîtrise d'œuvre",
                      "Études & ingénierie",
                      "Gestion locative",
                      "Permis de construire",
                      "Estimation bien",
                      "Autre demande",
                    ].map((service) => (
                      <button
                        type="button"
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className={`px-5 py-3 border text-sm transition ${
                          selectedService === service
                            ? "border-yellow-500 bg-yellow-500/10 text-[#0B1F3A]"
                            : "border-gray-200 bg-white text-gray-600 hover:border-yellow-500"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#0B1F3A]">
                    Budget estimé
                  </label>

                  <div className="mt-3 grid md:grid-cols-3 gap-3">
                    {[
                      "< 10M FCFA",
                      "10–50M FCFA",
                      "50–100M FCFA",
                      "100–500M FCFA",
                      "> 500M FCFA",
                      "Non défini",
                    ].map((budget) => (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => setSelectedBudget(budget)}
                        className={`px-4 py-3 border text-sm transition ${
                          selectedBudget === budget
                            ? "border-yellow-500 bg-yellow-500/10 text-[#0B1F3A]"
                            : "border-gray-200 bg-white text-gray-600 hover:border-yellow-500"
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#0B1F3A]">
                    Objet de votre demande
                  </label>
                  <select className="mt-2 w-full border border-gray-200 bg-white px-4 py-4 outline-none">
                    <option>Choisir l'objet...</option>
                    <option>Demande de devis</option>
                    <option>Demande de visite</option>
                    <option>Consultation technique</option>
                    <option>Information générale</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#0B1F3A]">
                    Votre message <span className="text-yellow-600">*</span>
                  </label>
                  <textarea
                    className="mt-2 w-full min-h-[220px] border border-gray-200 bg-white px-4 py-4 outline-none"
                    placeholder="Décrivez votre projet ou votre demande avec le maximum de détails (localisation souhaitée, superficie, délai, contraintes particulières...)"
                  />
                </div>
    
                <div>
                  <label className="font-semibold text-[#0B1F3A]">
                    Comment avez-vous entendu parler de nous ?
                  </label>
                  <select className="mt-2 w-full border border-gray-200 bg-white px-4 py-4 outline-none">
                    <option>Sélectionner...</option>
                    <option>Google</option>
                    <option>Réseaux sociaux</option>
                    <option>Recommandation</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="flex gap-4 bg-white border-l-4 border-yellow-500 p-5 text-sm text-gray-600">
                  <input type="checkbox" className="mt-1" />
                  <p>
                    J'accepte que mes données soient traitées par Perfect Immo &
                    Engineering pour traiter ma demande, conformément à la
                    politique de confidentialité.{" "}
                    <span className="text-yellow-600">*</span>
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full bg-yellow-500 text-[#0B1F3A] py-4 font-bold tracking-widest uppercase flex justify-center items-center gap-3 hover:bg-yellow-400 transition"
                >
                  <Send size={18} />
                  Envoyer ma demande
                </button>

                <p className="text-center text-gray-400 text-sm flex justify-center gap-2 items-center">
                  <Lock size={14} />
                  Formulaire sécurisé · Réponse garantie sous 24h ouvrées
                </p>
              </form>
            </div>

            <aside className="p-8 lg:p-10 bg-white">
              <div className="h-[220px] bg-[#0B1F3A] relative overflow-hidden mb-10 border border-gray-200 flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.08)_1px,transparent_1px)] bg-[length:35px_35px]" />
                <div className="relative text-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mx-auto mb-4 border-2 border-white" />
                  <p className="text-gray-300">Bonanjo, Douala</p>
                  <button className="mt-4 border border-yellow-500/40 text-yellow-500 px-5 py-2 text-xs uppercase tracking-widest">
                    Voir sur Google Maps
                  </button>
                </div>
              </div>

              <InfoBlock />

              <div className="mt-10">
                <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold mb-5">
                  Horaires d'ouverture
                </p>

                <Hour day="Lun — Ven" time="08h00 – 18h00" />
                <Hour day="Samedi" time="09h00 – 14h00" />
                <Hour day="Dimanche" time="Fermé" muted />

                <p className="text-sm text-gray-500 mt-4">
                  Urgences chantier : disponible 7j/7 par WhatsApp
                </p>
              </div>

              <button className="mt-8 w-full border border-green-400/30 bg-green-50 py-4 text-green-700 font-semibold">
                Écrire sur WhatsApp
                <br />
                <span className="font-normal text-sm">
                  Réponse en moins de 2h
                </span>
              </button>

              <div className="mt-10">
                <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold mb-5">
                  Nos réseaux sociaux
                </p>
    
                <div className="flex gap-4">
                  {[MessageCircle, Globe, Mail, Phone].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-yellow-500 transition"
                    >
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 border border-yellow-500/30 bg-yellow-500/5 p-6">
                <p className="uppercase tracking-[3px] text-yellow-600 text-sm font-semibold">
                  Consultation gratuite
                </p>

                <p className="mt-4 text-gray-600">
                  Premier rendez-vous offert pour tout nouveau projet de
                  construction ou d'acquisition immobilière.
                </p>

                <p className="mt-4 font-semibold text-[#0B1F3A] flex items-center gap-2">
                  <Calendar size={16} className="text-yellow-600" />
                  Prenez RDV dès aujourd'hui
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function QuickItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-8 py-5 border-r border-yellow-500/10">
      <div className="w-12 h-12 border border-yellow-500/30 text-yellow-500 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  required,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-semibold text-[#0B1F3A]">
        {label} {required && <span className="text-yellow-600">*</span>}
      </label>
      <input
        className="mt-2 w-full border border-gray-200 bg-white px-4 py-4 outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}

function InfoBlock() {
  return (
    <div>
      <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold mb-5">
        Nos coordonnées
      </p>

      <InfoItem
        icon={<MapPin />}
        label="Adresse"
        value="Immeuble PI&E, Avenue de la Liberté Bonanjo — Douala, Cameroun"
      />
      <InfoItem
        icon={<Phone />}
        label="Téléphone"
        value="+237 6XX XXX XXX · +237 2XX XXX XXX"
      />
      <InfoItem
        icon={<Mail />}
        label="Email"
        value="contact@perfectimmo.cm · info@perfectimmo.cm"
      />
      <InfoItem icon={<Globe />} label="Site web" value="www.perfectimmo.cm" />
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-[#0B1F3A] shrink-0">
        {icon}
      </div>

      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-[#0B1F3A] font-semibold leading-6">{value}</p>
      </div>
    </div>
  );
}

function Hour({
  day,
  time,
  muted,
}: {
  day: string;
  time: string;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-200">
      <span className="text-gray-600">{day}</span>
      <span className={muted ? "text-gray-400 italic" : "font-semibold"}>
        {time}
      </span>
    </div>
  );
    }