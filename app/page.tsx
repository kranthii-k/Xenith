import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#09090B] min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <Footer />
    </main>
  );
}
