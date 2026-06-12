import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#0B1F3A] text-white h-20 px-8 flex items-center justify-between border-b border-yellow-700">
      
      <div>
        <h1 className="text-lg font-bold">
          Perfect Immo <span className="text-yellow-500">&</span> Engineering
        </h1>
        <p className="text-xs text-gray-400">
          Douala, Cameroun
        </p>
      </div>

        <ul className="hidden md:flex gap-8 text-sm">
            <li>
                <Link href="/" className="hover:text-yellow-500 transition">
                    Accueil
                </Link>
            </li>

            <li>
                <Link href="/services" className="hover:text-yellow-500 transition">
                    Services
                </Link>
            </li>

            <li>
                <Link href="/realisations" className="hover:text-yellow-500 transition">
                    Réalisations
                </Link>
            </li>

            <li>
                <Link href="/projets" className="hover:text-yellow-500 transition">
                    Projets
                </Link>
            </li>

            <li>
                <Link href="/contact" className="hover:text-yellow-500 transition">
                    Contact
                </Link>
            </li>
        </ul>

        <Link
            href="/contact"
            className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
        >
            Demander un devis
        </Link>
    </nav>
  );
    }