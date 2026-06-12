import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#0B1F3A] text-white min-h-[calc(100vh-80px)] flex items-center py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <span className="uppercase tracking-[4px] text-yellow-500 text-sm">
            Immobilier & Ingénierie
          </span>

          <h1 className="mt-6 text-4xl lg:text-6xl font-bold leading-tight">
            L'Excellence au
            <br />
            Cœur de vos
            <span className="text-yellow-500"> Projets</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-8 max-w-xl">
            Votre partenaire de confiance à Douala pour la vente,
            la location et la maîtrise d'œuvre de vos projets
            immobiliers.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-yellow-500 text-black px-6 py-3 font-semibold rounded-lg hover:bg-yellow-400 transition">
              Voir nos projets
            </button>

            <button className="border border-gray-400 px-6 py-3 rounded-lg hover:border-yellow-500 hover:text-yellow-500 transition">
              Nous contacter
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-14">
            <div>
              <h3 className="text-yellow-500 text-4xl font-bold">
                120+
              </h3>
              <p className="text-sm text-gray-400">
                Projets
              </p>
            </div>

            <div>
              <h3 className="text-yellow-500 text-4xl font-bold">
                15
              </h3>
              <p className="text-sm text-gray-400">
                Années
              </p>
            </div>

            <div>
              <h3 className="text-yellow-500 text-4xl font-bold">
                500+
              </h3>
              <p className="text-sm text-gray-400">
                Clients
              </p>
            </div>

            <div>
              <h3 className="text-yellow-500 text-4xl font-bold">
                85k
              </h3>
              <p className="text-sm text-gray-400">
                m² bâtis
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">

          <div className="relative w-[420px] h-[520px] rounded-2xl overflow-hidden border border-yellow-500/20 shadow-2xl">

            <Image
              src="/images/hero-building-2.jpg"
              alt="Perfect Immo Project"
              fill
              className="object-cover rounded-2xl"
              priority
            />x
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
                    <p className="text-yellow-400 text-sm font-semibold">
                        Projet en vedette
                    </p>

                    <h3 className="text-white font-bold">
                        Résidence Moderne Bonapriso
                    </h3>

                    <p className="text-gray-300 text-sm">
                         Douala • 2025
                    </p>
                </div>

          </div>

        </div>

      </div>
    </section>
  );
    }