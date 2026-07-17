import Container from "@/components/layout/Container";

const navigation = [
  "Accueil",
  "À propos",
  "Services",
  "Réalisations",
  "Projets",
  "Blog",
  "Contact",
];

const services = [
  "Vente immobilière",
  "Location",
  "Maîtrise d'oeuvre",
  "Études VRD",
  "Gestion locative",
  "Conseil & audit",
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#071D36] text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_0.8fr_1fr]">
          <div>
            <h3 className="font-serif text-xl">
              Perfect Immo & Engineering
            </h3>
            <p className="mt-3 max-w-[360px] text-[13px] font-medium leading-6 text-white/45">
              Votre partenaire immobilier et d&apos;ingénierie de confiance à
              Douala, Cameroun. Excellence, rigueur et innovation.
            </p>
            <p className="mt-5 text-[13px] font-semibold text-white/55">
              Bonanjo, Douala, Cameroun
            </p>
            <p className="mt-3 text-[13px] font-bold text-[#D2AD3D]">
              +237 6XX XXX XXX
            </p>
            <p className="mt-2 text-[13px] font-bold text-[#D2AD3D]">
              contact@perfectimmo.cm
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D2AD3D]">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3 text-[13px] font-medium text-white/45">
              {navigation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D2AD3D]">
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-[13px] font-medium text-white/45">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-5 text-xs font-medium text-white/30 md:flex-row md:items-center md:justify-between">
          <p>
            © 2025 Perfect Immo & Engineering · Tous droits réservés · Mentions
            légales
          </p>
          <div className="flex gap-2.5">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className="block h-9 w-9 border border-white/15"
              />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
