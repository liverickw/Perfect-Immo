import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Expertise from "@/components/sections/Expertise";
import Realisations from "@/components/sections/Realisations";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Expertise />
      <Realisations />
      <About />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
  }