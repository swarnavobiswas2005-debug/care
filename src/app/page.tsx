import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ExperienceTypes } from "@/components/ExperienceTypes";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductPreview } from "@/components/ProductPreview";
import { TrustSection } from "@/components/TrustSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-wine text-primary-ivory selection:bg-accent-rose selection:text-white">
      <Navbar />
      <Hero />
      <ExperienceTypes />
      <HowItWorks />
      <ProductPreview />
      <TrustSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
