const values = [
  "Intégrité et transparence dans chaque transaction",
  "Excellence technique et respect des délais",
  "Innovation au service du développement camerounais",
];

const stats = [
  ["15", "Années d'expérience", "dans l'immobilier & l'ingénierie au Cameroun"],
  ["12", "Ingénieurs certifiés", "génie civil, structure, VRD et bâtiment"],
  ["98%", "Taux de satisfaction", "mesuré auprès de nos clients depuis 2020"],
];

export default function About() {
  return (
    <section className="w-full bg-[#0a2039] py-[49px]">
      <div className="inner grid gap-10 grid-cols-2">
        <div>
          <p className="eyebrow">Qui sommes-nous</p>
          <h2 className="serif mt-[17px] text-[31px] leading-[1.35] text-white">
            Construire la confiance,
            <br />
            projet après <span className="gold">projet</span>
          </h2>
          <p className="mt-3 text-[14px] font-semibold leading-[1.85] text-[#91a2ba]">
            Fondée à Douala, Perfect Immo & Engineering réunit des ingénieurs,
            architectes et experts immobiliers au service de vos ambitions.
            Notre approche allie rigueur technique et accompagnement
            personnalisé.
          </p>
    
          <div className="mt-[27px] space-y-[10px]">
            {values.map((value) => (
              <div
                key={value}
                className="flex min-h-[39px] items-center gap-3 border border-white/12 px-4 text-[13px] font-bold text-[#dce5f0]"
              >
                <span className="h-[7px] w-[7px] bg-[#d2ad3d]" />
                {value}
              </div>
            ))}
          </div>
        </div>
  
        <div className="space-y-[13px] pt-[56px] h-[400px]">
          {stats.map(([number, title, text]) => (
            <article
              key={title}
              className="grid grid-cols-[54px_1fr] items-center gap-5 border border-white/12 px-5 py-[20px]"
            >
              <p className="serif text-[27px] font-bold text-[#d2ad3d]">
                {number}
              </p>
              <div>
                <h3 className="text-[14px] font-black text-[#e6edf8]">
                  {title}
                </h3>
                <p className="text-[13px] font-semibold leading-[1.45] text-[#6f8099]">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
  