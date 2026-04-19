
## Superstaff — Modern SaaS Landing Page

A premium, conversion-focused single-page site with a **violet + deep navy** futuristic aesthetic, glassmorphism, soft gradients, and Framer Motion-style micro-animations.

### Design system
- **Palette**: deep navy `#0A0B1E` base, electric violet `#7C3AED` primary, soft indigo glow accents, near-white text on dark / charcoal text on light sections
- **Typography**: Inter (body) + tight, large display weights for headlines
- **Effects**: gradient orbs/blobs, subtle grid background, glass cards (backdrop-blur + semi-transparent borders), hover scale + glow on CTAs, fade-up on scroll
- All tokens added as HSL variables in `index.css` and exposed in `tailwind.config.ts` (no hardcoded colors in components)

### Page sections (all built as reusable components in `src/components/sections/`)

1. **Navbar** — sticky, glass blur, logo + anchor links + "Hire Your Superstaff" CTA
2. **Hero** — split layout
   - Left: headline, subheadline, two CTAs ("Hire Your Superstaff" primary, "Try Live Demo" ghost), trust micro-line
   - Right: animated chat mock-up with auto-playing scripted conversation (customer Q → typing dots → Superstaff reply → lead capture bubble), glass card on gradient orb background
3. **Social proof strip** — "Trusted by forward-thinking businesses" + 5–6 monochrome placeholder logos with subtle marquee
4. **What Superstaff Does** — 3 glass cards (Customer Support / Sales Assistant / Internal Assistant) with Lucide icons, hover lift
5. **How It Works** — 3-step horizontal timeline (Train → Deploy → Scale) with numbered glowing circles and connector line
6. **Live Demo (interactive)** — real input box; user types, scripted intelligent replies with realistic typing delay (800–1500ms) and dot animation; suggested-prompt chips; matches keywords to canned answers, falls back to a smart generic reply
7. **Why Not Just ChatGPT?** — comparison table, Superstaff column highlighted in violet with check marks, generic AI column with dashes
8. **Pricing** — 3 tiers (Starter / Growth / Pro), Growth highlighted as "Most popular", "Costs less than hiring a single staff" note, each card → opens lead form
9. **Final CTA** — full-width gradient band, big headline, single CTA
10. **Footer** — minimal: logo, links, "Powered by Superstaff Intelligence" (no IAM.ng mention per brand requirement)

### Lead capture
- Reusable `<LeadDialog />` triggered by every primary CTA
- Fields: Name, Work Email, Company, (optional) Website
- **Zod validation** (trim, email, length limits), inline errors, success toast
- Stored via **Lovable Cloud** in a `leads` table with RLS (insert allowed for anon, select restricted)

### Animations & micro-interactions
- Tailwind keyframes: `fade-in-up`, `float`, `pulse-glow`, `typing-dots`, `marquee`
- IntersectionObserver hook (`useInView`) to trigger section reveals
- Buttons: gradient shimmer on hover, scale-on-press
- Chat bubbles: staggered enter animations

### Technical
- Mobile-first responsive (stacks hero, collapses nav to sheet menu, pricing cards stack)
- Semantic HTML (`<header>`, `<main>`, `<section>` with proper headings)
- SEO: `<title>`, meta description, OG tags, canonical, JSON-LD SoftwareApplication, single H1
- Lazy-load below-the-fold sections, optimized SVG icons via lucide-react
- All sections composed in `src/pages/Index.tsx`; each section is self-contained and reusable

### File structure
```
src/
  components/
    sections/ (Navbar, Hero, ChatMock, SocialProof, UseCases, HowItWorks, LiveDemo, Comparison, Pricing, FinalCTA, Footer)
    LeadDialog.tsx
    ui/ (existing shadcn)
  hooks/useInView.ts
  lib/demoScript.ts (canned chat responses)
  pages/Index.tsx
  index.css + tailwind.config.ts (design tokens)
```

### Out of scope (can add later)
- Real auth / dashboard
- Payment processing on pricing tiers
- Real LLM-powered chat
