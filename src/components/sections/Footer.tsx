import { Bot } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10 mt-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-primary shadow-glow">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </span>
          <div>
            <p className="text-sm font-semibold leading-none">Superstaff</p>
            <p className="text-[11px] text-muted-foreground mt-1">Powered by Superstaff Intelligence</p>
          </div>
        </div>
        <ul className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
          <li><a href="#features" className="hover:text-foreground">Features</a></li>
          <li><a href="#how" className="hover:text-foreground">How it works</a></li>
          <li><a href="#demo" className="hover:text-foreground">Demo</a></li>
          <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
        </ul>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Superstaff. All rights reserved.</p>
      </div>
    </footer>
  );
}
