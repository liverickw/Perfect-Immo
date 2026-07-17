import Container from "@/components/layout/Container";

export default function WhatsappBar() {
  return (
    <section className="w-full bg-[#fbfbf8] py-6">
      <Container>
        <div className="border border-[#9be7b1] bg-[#e7f8e9] px-5 py-4 sm:px-7">
        <p className="text-[20px] font-bold text-[#02d64f]">
          WhatsApp - Réponse en moins de 2h
        </p>
        <p className="text-[15px] text-[#65c888]">
          +237 676 438 342 · Lun-Sam 8h-18h
        </p>
      </div>
      </Container>
    </section>
  );
}
