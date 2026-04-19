import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "@/components/LeadDialog";

export function FinalCTA() {
  const { openLead } = useLeadDialog();
  return (
    <section className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-band shadow-glow-strong">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div
            className="absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl opacity-50"
            style={{ background: "hsl(var(--primary-glow) / 0.6)" }}
          />
          <div className="relative px-6 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-primary-foreground">
              Your next best employee isn't human
            </h2>
            <p className="mt-4 text-base md:text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Deploy your Superstaff in minutes. Pay less than a single salary. Scale without limits.
            </p>
            <Button
              size="lg"
              onClick={() => openLead("final-cta")}
              className="mt-8 h-12 px-7 rounded-full text-base bg-background text-foreground hover:bg-background/90"
            >
              Hire your Superstaff now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
