export default function Testimonials() {
  const testimonials = [
    {
      name: "Jean-Pierre M.",
      role: "Investisseur immobilier",
      text: "Perfect Immo & Engineering nous a accompagnés de l'acquisition du terrain jusqu'à la livraison finale. Une équipe sérieuse et professionnelle.",
    },
    {
      name: "Sophie N.",
      role: "Directrice d'entreprise",
      text: "Nous avions besoin d'un bâtiment commercial moderne. Le projet a été livré dans les délais avec un excellent niveau de qualité.",
    },
    {
      name: "Eric T.",
      role: "Propriétaire",
      text: "Leur expertise technique et leur transparence nous ont permis de mener notre projet en toute confiance.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold">
            Témoignages
          </p>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[#0B1F3A]">
            Ce que disent nos clients
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            La satisfaction de nos clients est au cœur de notre engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-[#F8F8F5] rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-yellow-500 text-xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-700 leading-8 italic min-h-[160px]">
                "{item.text}"
              </p>
    
              <div className="mt-8 border-t border-gray-200 pt-5">
                <h4 className="font-bold text-[#0B1F3A]">
                  {item.name}
                </h4>

                <p className="text-gray-500 text-sm">
                  {item.role}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
    }