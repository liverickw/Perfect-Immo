export default function Process() {
  const steps = [
    "Consultation gratuite",
    "Étude & faisabilité",
    "Planification du projet",
    "Exécution & suivi",
    "Livraison & garantie",
  ];
    
  return (
    <section className="bg-[#F4F3EF] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold">
            Notre méthode
          </p>

          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
            Comment nous travaillons
          </h2>
        </div>
    
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={step} className="relative text-center">
              {index !== 0 && (
                <div className="hidden md:block absolute top-6 -left-1/2 w-full h-[1px] bg-yellow-500/40" />
              )}
    
              <div className="relative z-10 mx-auto w-16 h-16 rounded-full border-2 border-yellow-500 bg-white flex items-center justify-center text-yellow-600 font-bold text-xl">
                {index + 1}
              </div>

              <h3 className="mt-5 text-[#0B1F3A] font-semibold text-lg leading-snug">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
    }