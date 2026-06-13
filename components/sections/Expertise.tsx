const expertises = [
  [
    "Immobilier résidentiel",
    "Vente et location de villas, appartements et duplex à Douala et environs.",
  ],
  [
    "Immobilier commercial",
    "Bureaux, commerces, entrepôts et espaces industriels en vente ou location.",
  ],
  [
    "Maîtrise d'oeuvre",
    "Pilotage complet de vos chantiers : planning, budget, qualité et conformité.",
  ],
  [
    "Études & ingénierie",
    "Études structurelles, VRD, audits techniques et assistance à maîtrise d'ouvrage.",
  ],
  [
    "Gestion locative",
    "Gestion complète de votre patrimoine locatif : loyers, entretien, baux.",
  ],
  [
    "Permis & conseil",
    "Obtention de permis de construire, faisabilité et conseil en investissement.",
  ],
];
  
export default function Expertise() {
  return (
    <section className="w-full bg-[#fbfbf8] pb-[50px] pt-[52px]">
      <div className="inner">
        <div className="max-w-[430px]">
          <p className="eyebrow">Ce que nous faisons</p>
          <h2 className="section-title">
            Nos domaines
            <br />
            d&apos;expertise
          </h2>
          <p className="mt-5 text-[14px] leading-[1.8] text-[#665f57]">
            De la conception architecturale à la gestion locative, nous couvrons
            l&apos;ensemble de la chaîne de valeur immobilière et d&apos;ingénierie.
          </p>
        </div>

        <div className="mt-[34px] grid grid-cols-3 md:grid-cols-3">
          {expertises.map(([title, description], index) => (
            <article
              key={title}
              className={`min-h-[217px] border-[#dedbd3] px-5 py-[25px] ${
                index < 3 ? "border-b" : ""
              } ${index % 3 !== 0 ? "md:border-l" : ""}`}
            >
              <span className="block h-[47px] w-[47px] border border-[#dedbd3] bg-white" />
              <h3 className="mt-[19px] text-[16px] font-black text-[#061b35]">
                {title}
              </h3>
              <p className="mt-2 text-[13px] font-medium leading-[1.65] text-[#8a8178]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
