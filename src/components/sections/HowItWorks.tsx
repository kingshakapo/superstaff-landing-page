import { Upload, Code2, Rocket } from "lucide-react";
import { SectionHeader } from "./UseCases";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Upload,
    title: "Train",
    desc: "Upload your business info, services, FAQs, and docs. Superstaff learns your brand voice in minutes.",
  },
  {
    icon: Code2,
    title: "Deploy",
    desc: "Add a single line of code to your website. Customize the look so it matches your brand perfectly.",
  },
  {
    icon: Rocket,
    title: "Scale",
    desc: "Let Superstaff handle unlimited conversations — without growing your headcount or your bills.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 relative overflow-hidden">
      <div className="orb h-96 w-96 top-10 left-1/2 -translate-x-1/2 opacity-30" style={{ background: "var(--gradient-orb-1)" }} />
      <div className="container relative">
        <SectionHeader
          eyebrow="How it works"
          title="From zero to AI staff in under 10 minutes"
          desc="No engineers required. No long onboarding. Just plug in and let Superstaff start working."
        />

        <div className="mt-16 relative">
          {/* connector */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative">
            {steps.map((s, i) => (
              <Step key={s.title} step={i + 1} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  icon: Icon,
  title,
  desc,
  step,
  index,
}: typeof steps[number] & { step: number; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={cn(
        "relative text-center transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
    >
      <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow animate-pulse-glow relative z-10">
        <Icon className="h-7 w-7 text-primary-foreground" />
      </div>
      <p className="mt-4 text-xs uppercase tracking-widest text-primary-glow font-medium">Step {step}</p>
      <h3 className="mt-1 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">{desc}</p>
    </div>
  );
}
