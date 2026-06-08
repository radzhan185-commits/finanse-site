import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PainSection from "./components/PainSection";
import ServicesSection from "./components/ServicesSection";
import CasesSection from "./components/CasesSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import StickyContact from "./components/StickyContact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PainSection />
      <ServicesSection />
      <CasesSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <StickyContact />
    </main>
  );
}