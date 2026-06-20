import Container from "@/components/layout/Container";

const posts = [
  ["Marché", "Immobilier à Douala : tendances 2025", "14 mai 2025"],
  ["Ingénierie", "Construire durable au Cameroun", "2 avril 2025"],
  ["Conseils", "Investir dans l'immobilier locatif", "18 mars 2025"],
];
  
export default function Blog() {
  return (
    <section className="w-full bg-[#f6f5f0] py-16 lg:py-24">
      <Container>
        <p className="eyebrow">Actualités & conseil</p>
        <h2 className="section-title">Notre blog</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map(([category, title, date]) => (
            <article key={title} className="border border-[#dfddd6] bg-white">
              <div className="h-[89px] bg-[#172f51]" />
              <div className="min-h-[119px] px-4 py-4">
                <p className="text-[11px] font-bold uppercase tracking-[2.3px] text-[#d2ad3d]">
                  {category}
                </p>
                <h3 className="serif mt-2 text-[16px] leading-[1.45] text-[#061b35]">
                  {title}
                </h3>
                <p className="mt-2 text-[12px] text-[#8a8178]">{date}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
