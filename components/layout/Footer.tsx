export default function Footer() {
  return (
    <footer className="bg-[#07162C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
    
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">
        
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold">
              Perfect Immo{" "}
              <span className="text-yellow-500">& Engineering</span>
            </h3>

            <p className="mt-5 text-gray-400 leading-7">
              Votre partenaire de confiance pour l'immobilier,
              l'ingénierie et la gestion de projets à Douala
              et partout au Cameroun.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-5">
              Navigation
            </h4>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-yellow-500 transition">
                  Accueil
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-yellow-500 transition">
                  Services
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-yellow-500 transition">
                  Réalisations
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-yellow-500 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-5">
              Nos services
            </h4>

            <ul className="space-y-3 text-gray-400">
              <li>Immobilier résidentiel</li>
              <li>Immobilier commercial</li>
              <li>Gestion locative</li>
              <li>Maîtrise d'œuvre</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-5">
              Contact
            </h4>

            <ul className="space-y-3 text-gray-400">
              <li>Douala, Cameroun</li>
              <li>+237 6XX XX XX XX</li>
              <li>contact@perfectimmo.cm</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © 2025 Perfect Immo & Engineering. Tous droits réservés.
          </p>

          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Conçu avec excellence au Cameroun 🇨🇲
          </p>

        </div>

      </div>
    </footer>
  );
    }