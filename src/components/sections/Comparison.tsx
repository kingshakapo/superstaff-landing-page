import { Check, X } from "lucide-react";
import { SectionHeader } from "./UseCases";

const rows = [
  { label: "Trained on YOUR business knowledge", ss: true, gen: false },
  { label: "Works directly on your website", ss: true, gen: false },
  { label: "Lead capture built-in", ss: true, gen: false },
  { label: "Branded as your company", ss: true, gen: false },
  { label: "24/7 automated conversations", ss: true, gen: false },
  { label: "Escalates to your team with context", ss: true, gen: false },
];

export function Comparison() {
  return (
    <section className="py-24 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Why Superstaff"
          title="Why not just use ChatGPT?"
          desc="Generic AI is great at general questions. Superstaff is built to actually run on your business."
        />

        <div className="mt-12 max-w-3xl mx-auto glass-strong rounded-2xl shadow-card overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] text-sm">
            <div className="p-5 border-b border-border/60" />
            <div className="p-5 border-b border-l border-border/60 text-center bg-primary/10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-medium shadow-glow">
                Superstaff
              </span>
            </div>
            <div className="p-5 border-b border-l border-border/60 text-center text-muted-foreground font-medium">
              Generic AI
            </div>

            {rows.map((r, i) => (
              <div key={r.label} className="contents">
                <div className={`p-5 ${i < rows.length - 1 ? "border-b" : ""} border-border/60`}>
                  {r.label}
                </div>
                <div
                  className={`p-5 border-l ${i < rows.length - 1 ? "border-b" : ""} border-border/60 text-center bg-primary/5`}
                >
                  {r.ss ? (
                    <Check className="h-5 w-5 mx-auto text-primary-glow" strokeWidth={3} />
                  ) : (
                    <X className="h-5 w-5 mx-auto text-muted-foreground" />
                  )}
                </div>
                <div
                  className={`p-5 border-l ${i < rows.length - 1 ? "border-b" : ""} border-border/60 text-center`}
                >
                  {r.gen ? (
                    <Check className="h-5 w-5 mx-auto text-emerald-400" />
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
