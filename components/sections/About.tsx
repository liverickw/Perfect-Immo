export default function About() {
  return (
    <section className="bg-[#0B1F3A] py-24">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase tracking-[4px] text-yellow-500 text-sm font-semibold">
            Qui sommes-nous
          </p>
    
          <h2 className="mt-4 text-2xl lg:text-5xl font-bold text-white leading-tight">
            Construire la confiance,
            <br />
            projet après{" "}
            <span className="text-yellow-500 italic">projet</span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-8">
            Fondée à Douala, Perfect Immo & Engineering réunit des ingénieurs,
            architectes et experts immobiliers au service de vos ambitions.
            Notre approche allie rigueur technique et accompagnement
            personnalisé.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4 border border-yellow-500/20 p-5 rounded-xl">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <p className="text-gray-200">
                Intégrité et transparence dans chaque transaction
              </p>
            </div>

            <div className="flex items-center gap-4 border border-yellow-500/20 p-5 rounded-xl">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <p className="text-gray-200">
                Excellence technique et respect des délais
              </p>
            </div>

            <div className="flex items-center gap-4 border border-yellow-500/20 p-5 rounded-xl">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <p className="text-gray-200">
                Innovation au service du développement camerounais
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {[
            ["15", "Années d'expérience", "dans l'immobilier & l'ingénierie au Cameroun"],
            ["12", "Ingénieurs certifiés", "génie civil, structure, VRD et bâtiment"],
            ["98%", "Taux de satisfaction", "mesuré auprès de nos clients depuis 2020"],
          ].map(([number, title, text]) => (
            <div
              key={title}
              className="border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/50 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-yellow-500 text-5xl font-bold">{number}</h3>
              <p className="mt-2 text-white text-xl font-semibold">{title}</p>
              <p className="text-gray-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
    }