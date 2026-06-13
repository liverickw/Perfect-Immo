const steps = [
  "Consultation\ngratuite",
  "Étude &\nfaisabilité",
  "Planification\ndu projet",
  "Exécution\n& suivi",
  "Livraison &\ngarantie",
];

export default function Process() {
  return (
    <section className="w-full bg-[#f6f5f0] pb-[70px] pt-[50px]">
      <div className="inner">
        <p className="eyebrow">Notre méthode</p>
        <h2 className="section-title">Comment nous travaillons</h2>

        <div className="mt-[48px] grid grid-cols-2 gap-y-8 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="relative text-center">
              {index < steps.length - 1 && (
                <span className="absolute left-[70%] top-[22px] hidden h-px w-[78px] bg-[#d2ad3d]/35 md:block" />
              )}
              <span className="mx-auto flex h-[45px] w-[45px] items-center justify-center border border-[#d2ad3d] bg-white serif text-[14px] text-[#d2ad3d]">
                {index + 1}
              </span>
              <p className="mt-3 whitespace-pre-line text-[12px] font-black leading-[1.35] text-[#061b35]">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
