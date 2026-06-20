import Container from "@/components/layout/Container";

const testimonials = [
  {
    initials: "JE",
    name: "Jean-Marc Essomba",
    role: "PDG, Groupe Essomba",
    text: "Perfect Immo a livré notre immeuble de bureaux dans les délais et au budget convenu. Une équipe rigoureuse et professionnelle.",
  },
  {
    initials: "MN",
    name: "Marie Ngo Biyong",
    role: "Promotrice, SCI Palmier",
    text: "Leur expertise en VRD a transformé notre lotissement. Qualité irréprochable et suivi de chantier exemplaire tout au long du projet.",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-[#fbfbf8] py-16 lg:py-24">
      <Container>
        <p className="eyebrow">Ils nous font confiance</p>
        <h2 className="section-title">Témoignages clients</h2>

        <div className="mt-[37px] grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="border border-[#dfddd6] bg-white px-[25px] py-[24px]"
            >
              <p className="serif -mt-4 text-[45px] leading-none text-[#f1e9cf]">
                &ldquo;
              </p>
              <p className="-mt-3 text-[13px] tracking-[3px] text-[#d2ad3d]">
                ★★★★★
              </p>
              <p className="mt-3 min-h-[67px] border-b border-[#dfddd6] pb-4 text-[13px] font-medium italic leading-[1.8] text-[#514b46]">
                {item.text}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#071d36] text-[13px] font-black text-[#d2ad3d]">
                  {item.initials}
                </span>
                <span>
                  <strong className="block text-[13px] text-[#061b35]">
                    {item.name}
                  </strong>
                  <span className="text-[12px] font-medium text-[#8a8178]">
                    {item.role}
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
