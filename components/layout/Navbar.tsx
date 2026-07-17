import Link from "next/link";
import Container from "@/components/layout/Container";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Projets", href: "/projets" },
  { label: "Blog", href: "/blog" },
];
  
export default function Navbar() {
  return (
    <header className="w-full bg-[#071d36]">
      <Container className="flex h-[70px] items-center justify-between text-white">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-[#d2ad3d] font-serif text-sm text-[#d2ad3d]">
            PI
          </span>
          <span>
            <span className="serif block text-[16px] leading-[18px]">
              Perfect Immo <span className="text-[#d2ad3d]">&</span>
              <br />
              Engineering
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[2px] text-[#8494a8]">
              Douala, Cameroun
            </span>
          </span>
        </Link>

        <ul className="hidden h-full items-center gap-6 md:flex">
          {links.map((link, index) => (
            <li key={link.label} className="h-full">
              <Link
                href={link.href}
                className={`flex h-full items-center border-b-2 px-3 text-[13px] font-bold uppercase tracking-[0.5px] transition ${
                  index === 0
                    ? "border-[#d2ad3d] text-[#d2ad3d]"
                    : "border-transparent text-[#aeb9c8] hover:text-[#d2ad3d]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
  
        <Link
          href="/contact"
          className="bg-[#d2ad3d] px-5 py-[14px] text-[15px] font-black lowerercase tracking-[0.8px] text-[#03152a]"
        >
          Contact
        </Link>
      </Container>
    </header>
  );
}
