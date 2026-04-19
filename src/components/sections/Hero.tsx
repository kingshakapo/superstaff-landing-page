import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "@/components/LeadDialog";
import { ChatMock } from "./ChatMock";

export function Hero() {
  const { openLead } = useLeadDialog();
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* background layers */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div
        className="absolute inset-x-0 top-0 h-[700px] pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="orb h-[420px] w-[420px] -top-20 -left-32" style={{ background: "var(--gradient-orb-1)" }} />
      <div className="orb h-[380px] w-[380px] top-40 -right-24" style={{ background: "var(--gradient-orb-2)" }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI digital employee · works 24/7
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              Hire a smart AI staff that{" "}
              <span className="text-gradient">never sleeps</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Superstaff works on your website 24/7 — answering customers, capturing leads, and supporting
              your business — for less than the cost of one employee.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => openLead("hero-primary")}
                className="bg-gradient-primary text-primary-foreground btn-glow border-0 h-12 px-6 rounded-full text-base"
              >
                Hire your Superstaff
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-6 rounded-full text-base bg-card/40 backdrop-blur border-border"
              >
                <a href="#demo">
                  <PlayCircle className="h-4 w-4" />
                  Try live demo
                </a>
              </Button>
            </div>

            <div className="mt-7 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent"
                  />
                ))}
              </div>
              <span>Trusted by teams shipping faster every day</span>
            </div>
          </div>

          {/* Right */}
          <div className="animate-fade-in-up [animation-delay:120ms]">
            <ChatMock />
          </div>
        </div>
      </div>
    </section>
  );
}
