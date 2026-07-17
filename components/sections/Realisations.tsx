import Container from "@/components/layout/Container";

const realisations = [
  {
    tag: "Résidentiel · 2024",
    title: "Résidence Les Palmiers - Bastos",
    meta: "Yaoundé · 24 appartements · 3 800 m²",
    large: true,
  },
  {
    tag: "Commercial · 2023",
    title: "Tour Bonanjo Business",
    meta: "Douala · 8 étages · 5 200 m²",
  },
  {
    tag: "Infrastructure · 2023",
    title: "Route Ndokoti - VRD",
    meta: "Douala · 4,2 km · Voirie & réseaux",
  },
];

export default function Realisations() {
  return (
    <section className="w-full bg-[#f6f5f0] py-16 lg:py-24">
      <Container>
        <p className="eyebrow">Notre portfolio</p>
        <h2 className="section-title">
          Réalisations
          <br />
          récentes
        </h2>

        <div className="mt-[38px] grid grid-cols-1 md:grid-cols-2">
          {realisations.map((item) => (
            <article
              key={item.title}
              className={`diamond-dark flex min-h-[126px] flex-col justify-end border border-white/60 p-5 ${
                item.large ? "md:col-span-2 min-h-[226px]" : ""
              }`}
            >
              <p className="mb-2 w-fit border border-[#d2ad3d]/25 bg-[#d2ad3d]/10 px-3 py-[5px] text-[11px] font-black uppercase tracking-[2px] text-[#d2ad3d]">
                {item.tag}
              </p>
              <h3 className="serif text-[22px] leading-tight text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-[12px] font-bold text-[#8fa0b7]">
                {item.meta}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-[25px] text-center">
          <a href="/realisations" className="btn btn-primary">
            Voir toutes les réalisations →
          </a>
        </div>
      </Container>
    </section>
  );
}
