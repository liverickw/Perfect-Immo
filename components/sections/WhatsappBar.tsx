import { MessageCircle } from "lucide-react";

export default function WhatsappBar() {
  return (
    <section className="bg-[#0B1F3A] px-6 lg:px-12 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-green-500 rounded-2xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <MessageCircle size={28} className="text-white" />
            </div>

            <div>
              <h3 className="text-white text-lg font-bold">
                Besoin d'informations ?
              </h3>
              <p className="text-green-100 text-sm">
                Contactez-nous directement sur WhatsApp
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 px-5 py-2 rounded-full font-semibold hover:bg-green-50 transition"
          >
            Discuter maintenant
          </a>
        </div>
      </div>
    </section>
  );
    }