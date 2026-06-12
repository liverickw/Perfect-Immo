import {
  Building2,
  Home,
  Hammer,
  Ruler,
  KeyRound,
  FileCheck,
} from "lucide-react";

const expertises = [
  {
    icon: Home,
    title: "Immobilier résidentiel",
    description:
      "Vente et location de villas, appartements et duplex à Douala et environs.",
  },
  {
    icon: Building2,
    title: "Immobilier commercial",
    description:
      "Bureaux, commerces, entrepôts et espaces professionnels en vente ou location.",
  },
  {
    icon: Hammer,
    title: "Maîtrise d'œuvre",
    description:
      "Pilotage complet de vos chantiers : planning, budget, qualité et conformité.",
  },
  {
    icon: Ruler,
    title: "Études & ingénierie",
    description:
      "Études structurelles, VRD, audits techniques et assistance à maîtrise d'ouvrage.",
  },
  {
    icon: KeyRound,
    title: "Gestion locative",
    description:
      "Gestion complète de votre patrimoine locatif : loyers, entretien et suivi.",
  },
  {
    icon: FileCheck,
    title: "Permis & conseil",
    description:
      "Accompagnement pour les permis de construire, la faisabilité et l'investissement.",
  },
];

export default function Expertise() {
  return (
    <section className="bg-[#F8F8F5] py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold">
            Ce que nous faisons
          </p>

          <h2 className="mt-4 text-3xl lg:text-5xl font-bold text-[#0B1F3A] leading-tight">
            Nos domaines
            <br />
            d'expertise
          </h2>

          <p className="mt-5 text-gray-600 text-lg leading-8">
            De la conception architecturale à la gestion locative,
            nous couvrons l'ensemble de la chaîne de valeur immobilière
            et d'ingénierie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {expertises.map((item) => {
            const Icon = item.icon;
        
            return (
              <div
                key={item.title}
                className="
                    group
                    bg-white
                    rounded-2xl
                    p-7
                    shadow-sm
                    border
                    border-gray-100
                    hover:bg-[#0B1F3A]
                    hover:-translate-y-2
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    "
                >
                <div className="w-14 h-14 border border-gray-200 flex items-center justify-center mb-6 group-hover:border-yellow-500/40 group-hover:bg-yellow-500/10 transition">
                  <Icon className="text-[#0B1F3A] group-hover:text-yellow-500" size={34} />
                </div>

                <h3 className="text-xl font-bold text-[#0B1F3A] group-hover:text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-500 group-hover:text-gray-300 leading-7">
                  {item.description}
                </p>

                <div className="mt-6 text-yellow-600 font-semibold">
                  →
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
        }