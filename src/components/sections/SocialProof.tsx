const logos = ["Northwind", "Acme Co.", "Lumen", "Vertex", "Helix Labs", "Orbital", "Quanta", "Pioneer"];

export function SocialProof() {
  return (
    <section className="py-14 border-y border-border/60 bg-card/30">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by forward-thinking businesses
        </p>
        <div className="mt-7 overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
          />
          <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={i}
                className="text-xl md:text-2xl font-semibold text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
