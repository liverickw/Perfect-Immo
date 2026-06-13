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
    <footer className="w-full bg-[#061120] text-white h-[400px]">
      <div className="inner py-[40px]">
        <div className="grid gap-10 md:grid-cols-[1.6fr_0.8fr_1fr]">
          <div>
            <h3 className="serif text-[20px]">Perfect Immo & Engineering</h3>
            <p className="mt-3 max-w-[360px] text-[13px] font-semibold leading-[1.7] text-[#65748a]">
              Votre partenaire immobilier et d&apos;ingénierie de confiance à
              Douala, Cameroun. Excellence, rigueur et innovation.
            </p>
            <p className="mt-5 text-[13px] font-bold text-[#8392a8]">
              Bonanjo, Douala, Cameroun
            </p>
            <p className="mt-3 text-[13px] font-black text-[#d2ad3d]">
              +237 6XX XXX XXX
            </p>
            <p className="mt-2 text-[13px] font-black text-[#d2ad3d]">
              contact@perfectimmo.cm
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[3px] text-[#d2ad3d]">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3 text-[13px] font-semibold text-[#6f7f97]">
              {navigation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[3px] text-[#d2ad3d]">
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-[13px] font-semibold text-[#6f7f97]">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[38px] flex flex-col gap-5 border-t border-white/10 pt-5 text-[12px] font-semibold text-[#4c5d73] md:flex-row md:items-center md:justify-between">
          <p>© 2025 Perfect Immo & Engineering · Tous droits réservés · Mentions légales</p>
          <div className="flex gap-[10px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className="block h-[35px] w-[35px] border border-white/15"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
