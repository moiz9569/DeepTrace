import HeroSection from "@/components/landingPage/hero";
import TrustIndicators from "@/components/landingPage/trust";
import FeaturesSection from "@/components/landingPage/features";
import CTASection from "@/components/landingPage/cta";
import Footer from "@/components/landingPage/footer";
import StrategySection from "@/components/landingPage/strategy";
import Animate from "@/components/landingPage/animate";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <StrategySection />
      <Animate />
      <TrustIndicators />
      <CTASection />
      <Footer />
    </div>
  );
}
