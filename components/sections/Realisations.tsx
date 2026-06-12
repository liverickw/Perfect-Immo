import Image from "next/image";
import { MapPin } from "lucide-react";

const realisations = [
  {
    title: "Résidence Les Palmiers",
    category: "Résidentiel · 2024",
    location: "Bonapriso, Douala",
    image: "/images/realisation-1.jpg",
  },
  {
    title: "Tour Bonanjo Business",
    category: "Commercial · 2023",
    location: "Bonanjo, Douala",
    image: "/images/realisation-2.avif",
  },
  {
    title: "Projet VRD Yassa",
    category: "Infrastructure · 2023",
    location: "Yassa, Douala",
    image: "/images/realisation-3.jpg",
  },
];
    
export default function Realisations() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="uppercase tracking-[4px] text-yellow-600 text-sm font-semibold">
            Notre portfolio
          </p>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-[#0B1F3A]">
            Réalisations récentes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {realisations.map((item, index) => (
            <div
              key={item.title}
              className={`relative overflow-hidden rounded-2xl h-[320px] group ${
                index === 0 ? "md:col-span-2 h-[420px]" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="inline-block bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {item.category}
                </p>

                <h3 className="text-white text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-300 flex items-center gap-2 mt-2">
                  <MapPin size={16} />
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
            Voir toutes les réalisations
          </button>
        </div>
      </div>
    </section>
  );
    }