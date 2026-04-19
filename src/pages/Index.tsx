import { LeadDialogProvider } from "@/components/LeadDialog";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { UseCases } from "@/components/sections/UseCases";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Comparison } from "@/components/sections/Comparison";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <LeadDialogProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <SocialProof />
          <UseCases />
          <HowItWorks />
          <LiveDemo />
          <Comparison />
          <Pricing />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LeadDialogProvider>
  );
};

export default Index;
