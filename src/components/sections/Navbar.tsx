import { useEffect, useState } from "react";
import { Bot, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "@/components/LeadDialog";
import { cn } from "@/lib/utils";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const { openLead } = useLeadDialog();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-4 md:px-6 py-2.5 transition-all",
            scrolled ? "glass-strong shadow-card" : "glass",
          )}
          aria-label="Primary"
        >
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-primary shadow-glow">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-base">Superstaff</span>
          </a>

          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => openLead("navbar")}
              className="bg-gradient-primary text-primary-foreground btn-glow border-0 rounded-full px-5"
            >
              Hire your Superstaff
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-4 animate-fade-in-up">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm hover:bg-secondary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => {
                setOpen(false);
                openLead("navbar-mobile");
              }}
              className="w-full mt-3 bg-gradient-primary text-primary-foreground border-0"
            >
              Hire your Superstaff
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
