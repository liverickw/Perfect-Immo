export default function CTA() {
  return (
    <section className="bg-[#0B1F3A] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[4px] text-yellow-500 text-sm font-semibold">
          Démarrons votre projet
        </p>

        <h2 className="mt-4 text-4xl lg:text-6xl font-bold text-white leading-tight">
          Transformons vos idées
          <br />
          en réalisations concrètes
        </h2>

        <p className="mt-8 text-gray-300 text-lg max-w-3xl mx-auto leading-8">
          Que vous souhaitiez construire, investir, vendre ou développer
          un projet immobilier, notre équipe est prête à vous accompagner
          à chaque étape.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <button className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition">
            Demander un devis
          </button>

          <button className="border border-gray-500 text-white px-8 py-4 rounded-xl hover:border-yellow-500 hover:text-yellow-500 transition">
            Nous contacter
          </button>

        </div>

      </div>
    </section>
  );
    }