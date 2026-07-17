import Link from "next/link";
import Container from "@/components/layout/Container";

export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a2039] py-16 text-center lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

      <Container className="relative">
        <p className="text-[11px] font-black uppercase tracking-[4px] text-[#d2ad3d] h-[40px]">
          Démarrez dès aujourd&apos;hui
        </p>
        <h2 className="serif mx-auto mt-[19px] max-w-[390px] text-[31px] leading-[1.35] text-white">
          Prêt à concrétiser
          <br />
          votre <span className="gold">projet ?</span>
        </h2>
        <p className="mt-4 text-[14px] font-bold text-[#8fa0b7] h-[50px]">
          Consultation gratuite · Devis sous 48h · Accompagnement de A à Z
        </p>
        <div className="mt-[29px] flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn btn-primary">
            Demander un devis gratuit →
          </Link>
          <Link href="/services" className="btn">
            Découvrir l&apos;entreprise
          </Link>
        </div>
      </Container>
    </section>
  );
}
