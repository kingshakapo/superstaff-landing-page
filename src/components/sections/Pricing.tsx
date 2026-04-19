import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./UseCases";
import { useLeadDialog } from "@/components/LeadDialog";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    desc: "Perfect for small sites and solo founders.",
    features: [
      "Basic AI responses",
      "Up to 500 conversations/mo",
      "Limited training data (10 docs)",
      "Email support",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    desc: "For growing teams ready to scale conversations.",
    features: [
      "Advanced AI responses",
      "Unlimited conversations",
      "Lead capture + CRM handoff",
      "Up to 200 training docs",
      "Priority support",
    ],
    cta: "Start growing",
    highlight: true,
  },
  {
    name: "Pro",
    price: "$399",
    period: "/mo",
    desc: "Full business intelligence at peak performance.",
    features: [
      "Full business intelligence",
      "Priority response times",
      "Unlimited training data",
      "Custom branding & domains",
      "Dedicated success manager",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

export function Pricing() {
  const { openLead } = useLeadDialog();
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="orb h-[500px] w-[500px] top-20 -right-32 opacity-40" style={{ background: "var(--gradient-orb-1)" }} />
      <div className="container relative">
        <SectionHeader
          eyebrow="Pricing"
          title="Hire your AI staff (for less than a salary)"
          desc="Pay monthly. Cancel anytime. No setup fees."
        />
        <p className="mt-3 text-center text-sm text-primary-glow flex items-center justify-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Costs less than hiring a single staff member
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1",
                t.highlight
                  ? "glass-strong border-2 border-primary/60 shadow-glow-strong scale-[1.02]"
                  : "glass hover:shadow-glow",
              )}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t.price}</span>
                <span className="text-muted-foreground text-sm">{t.period}</span>
              </div>

              <Button
                onClick={() => openLead(`pricing-${t.name.toLowerCase()}`, t.name)}
                className={cn(
                  "w-full mt-5 h-11 rounded-full border-0",
                  t.highlight
                    ? "bg-gradient-primary text-primary-foreground btn-glow"
                    : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors",
                )}
              >
                {t.cta}
              </Button>

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 grid place-items-center h-4 w-4 rounded-full bg-primary/20 text-primary-glow shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
