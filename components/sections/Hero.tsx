import Link from "next/link";
import Container from "@/components/layout/Container";
  
function BuildingPlaceholder() {
  return (
    <div className="relative h-[450px] w-full">
      <div className="absolute left-1/2 top-[96px] h-[51px] w-[63px] -translate-x-1/2 border border-[#d2ad3d]/15 bg-white/5" />
      <div className="absolute left-1/2 top-[146px] h-[162px] w-[100px] -translate-x-1/2 border border-[#d2ad3d]/20 bg-white/5">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-[12px] w-[15px] border border-[#0B1F3A] bg-[#d2ad3d]/10"
            style={{
              left: index % 2 === 0 ? 15 : 68,
              top: 24 + Math.floor(index / 2) * 28,
            }}
          />
        ))}
      </div>
      <p className="absolute left-1/2 top-[319px] -translate-x-1/2 text-[12px] font-semibold uppercase tracking-[2px] text-yellow-400">
        Photo HD ici
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <main className="w-full bg-[#071D36] pattern-dark">
      <Container>
        <section className="grid min-h-[500px] grid-cols-1 border-t border-white/5 md:grid-cols-[55%_45%]">
        <div className="py-14 md:pr-10 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-[#d2ad3d]/35 px-4 py-[6px] text-[11px] font-bold uppercase tracking-[2.5px] text-[#d2ad3d]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#d2ad3d]/50" />
            Nouveau programme - Bonanjo 2025
          </div>
  
          <p className="mt-[24px] flex items-center gap-3 text-[11px] font-bold uppercase tracking-[5px] text-[#d2ad3d]">
            <span className="h-px w-6 bg-[#d2ad3d]" />
            Immobilier & Ingénierie
          </p>

          <h1 className="serif mt-[25px] text-[38px] font-semibold leading-[1.24] text-white md:text-[39px]">
            L&apos;Excellence au
            <br />
            Coeur de <span className="text-yellow-400">vos Projets</span>
          </h1>
  
          <p className="mt-[22px] max-w-[350px] text-[15px] font-semibold leading-[1.72] text-gray-300">
            Votre partenaire de confiance à Douala pour la vente, la location
            et la maîtrise d&apos;oeuvre de vos projets immobiliers.
          </p>
  
          <div className="mt-[29px] flex flex-wrap gap-4">
            <Link href="/projets" className="btn btn-primary">
              <button className="bg-yellow-400 text-black px-8 py-4 font-semibold rounded-none hover:bg-yellow-400 transition">
                Voir nos projets
              </button>  →
            </Link>
            <Link href="/contact" className="btn">
              <button className="border border-gray-400 px-8 py-4 rounded-none hover:border-yellow-500 hover:text-yellow-400 transition">
                Nous contacter
              </button>
            </Link>
          </div>
  
          <div className="mt-[30px] grid grid-cols-4 border-t border-white/10 pt-[25px]">
            {[
              ["120+", "Projets"],
              ["15", "Années"],
              ["500+", "Clients"],
              ["85k", "m² bâtis"],
            ].map(([number, label], index) => (
              <div
                key={label}
                className={`text-center ${
                  index > 0 ? "border-l border-white/12" : ""
                }`}
              >
                <p className="serif text-[24px] font-bold leading-none text-yellow-400">
                  {number}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[1px] text-[#8192ab]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
  
        <div className="flex items-center justify-center border-t border-white/10 bg-[#172f51] px-8 md:border-l md:border-t-0">
          <BuildingPlaceholder />
        </div>
      </section>
      </Container>
    </main>
  );
}
