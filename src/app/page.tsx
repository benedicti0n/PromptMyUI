import { AppShell } from "@/components/appShell";
import { HeroSection } from "@/components/heroSection";
import { HowItWorksSection } from "@/components/howItWorksSection";
import { FeatureGrid } from "@/components/featureGrid";
import { WhoItIsForSection } from "@/components/whoItIsForSection";

export default function HomePage() {
  return (
    <AppShell>
      <HeroSection />
      <HowItWorksSection />
      <FeatureGrid />
      <WhoItIsForSection />
    </AppShell>
  );
}
