import { Star, Quote } from "lucide-react";
import { SectionHeader } from "./UseCases";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Superstaff handles 80% of our support tickets before they reach a human. Our team finally focuses on real problems instead of repeating answers.",
    name: "Amara Okafor",
    role: "Head of CX",
    company: "Northwind Retail",
  },
  {
    quote:
      "We deployed it in an afternoon. Within a week we'd captured 140 qualified leads we would have missed. It pays for itself many times over.",
    name: "David Chen",
    role: "Founder",
    company: "Lumen Studio",
  },
  {
    quote:
      "Our internal team uses it more than our customers do. SOPs, pricing, policies — everyone gets instant, accurate answers.",
    name: "Priya Shah",
    role: "COO",
    company: "Vertex Logistics",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Testimonials"
          title="Teams ship more with Superstaff"
          desc="Real results from operators who put Superstaff to work on day one."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={t.name} index={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  quote,
  name,
  role,
  company,
  index,
}: typeof testimonials[number] & { index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={cn(
        "glass rounded-2xl p-7 transition-all duration-700 hover:-translate-y-1 hover:shadow-glow flex flex-col",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <Quote className="h-6 w-6 text-primary-glow opacity-70" />
      <p className="mt-3 text-sm leading-relaxed text-foreground/90 flex-1">"{quote}"</p>

      <div className="flex gap-0.5 mt-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-primary-glow text-primary-glow" />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/60 flex items-center gap-3">
        <span className="h-9 w-9 rounded-full bg-gradient-primary shrink-0 grid place-items-center text-primary-foreground text-xs font-semibold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div>
          <p className="text-sm font-semibold leading-tight">{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {role} · {company}
          </p>
        </div>
      </div>
    </div>
  );
}
