import { Headphones, TrendingUp, BookOpen } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "Answers FAQs instantly, 24/7. Resolves common questions before they reach your team — and escalates the rest with full context.",
  },
  {
    icon: TrendingUp,
    title: "Sales Assistant",
    desc: "Engages visitors at the right moment, recommends the right product, and converts them into qualified leads in your inbox.",
  },
  {
    icon: BookOpen,
    title: "Internal Assistant",
    desc: "Knows your company info, SOPs, pricing, and policies. Becomes the single source of truth for your whole team.",
  },
];

export function UseCases() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container">
        <SectionHeader
          eyebrow="What Superstaff does"
          title="One AI hire. Three full-time roles."
          desc="Superstaff replaces hours of repetitive work across support, sales, and internal ops — without the overhead."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Card key={it.title} index={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, desc, index }: typeof items[number] & { index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 100}ms` }}
      className={cn(
        "group relative glass rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
  light = false,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <p
        className={cn(
          "text-xs uppercase tracking-[0.2em] font-medium",
          light ? "text-primary" : "text-primary-glow",
        )}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground leading-relaxed">{desc}</p>}
    </div>
  );
}
