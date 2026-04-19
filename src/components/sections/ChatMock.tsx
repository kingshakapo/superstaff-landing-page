import { useEffect, useState } from "react";
import { Bot, User, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg =
  | { kind: "user"; text: string }
  | { kind: "bot"; text: string }
  | { kind: "lead"; text: string };

const script: Msg[] = [
  { kind: "user", text: "Hi! Do you handle international shipping?" },
  {
    kind: "bot",
    text: "Yes — we ship to 40+ countries with tracked delivery in 3–7 business days. Where would you like it sent?",
  },
  { kind: "user", text: "Berlin. Also, can I get a discount for bulk orders?" },
  {
    kind: "bot",
    text: "Absolutely. Orders over €500 qualify for 15% off, and over €2,000 for 22%. Want me to put a quote together?",
  },
  { kind: "user", text: "Yes please." },
  {
    kind: "lead",
    text: "Lead captured · Berlin · Bulk inquiry · Forwarded to sales",
  },
];

const TypingDots = () => (
  <div className="flex items-center gap-1 px-3 py-2.5">
    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-bounce [animation-delay:0ms]" />
    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-bounce [animation-delay:150ms]" />
    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-bounce [animation-delay:300ms]" />
  </div>
);

export function ChatMock() {
  const [shown, setShown] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (i >= script.length) {
        // restart loop
        setTimeout(() => {
          if (cancelled) return;
          setShown([]);
          i = 0;
          tick();
        }, 4000);
        return;
      }
      const next = script[i];
      const isBotLike = next.kind !== "user";
      if (isBotLike) {
        setTyping(true);
        setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setShown((s) => [...s, next]);
          i++;
          setTimeout(tick, next.kind === "lead" ? 1800 : 1100);
        }, 1100);
      } else {
        setTimeout(() => {
          if (cancelled) return;
          setShown((s) => [...s, next]);
          i++;
          tick();
        }, 700);
      }
    };
    tick();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative">
      {/* glow orbs */}
      <div className="orb h-72 w-72 -top-10 -right-10 bg-gradient-orb-1" style={{ background: "var(--gradient-orb-1)" }} />
      <div className="orb h-60 w-60 -bottom-10 -left-10" style={{ background: "var(--gradient-orb-2)" }} />

      <div className="relative glass-strong rounded-2xl shadow-card overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-primary shadow-glow">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none">Superstaff</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online · replies instantly
              </p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
        </div>

        {/* messages */}
        <div className="p-4 space-y-3 min-h-[420px] flex flex-col">
          {shown.map((m, idx) => (
            <Bubble key={idx} msg={m} />
          ))}
          {typing && (
            <div className="flex items-end gap-2 animate-fade-in">
              <span className="grid place-items-center h-7 w-7 rounded-full bg-gradient-primary">
                <Bot className="h-3.5 w-3.5 text-primary-foreground" />
              </span>
              <div className="rounded-2xl rounded-bl-sm bg-secondary">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="px-4 py-3 border-t border-border/60 flex items-center gap-2">
          <div className="flex-1 h-9 rounded-full bg-secondary/60 px-3 flex items-center text-xs text-muted-foreground">
            Type a message…
          </div>
          <span className="h-9 w-9 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground text-xs">
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  if (msg.kind === "lead") {
    return (
      <div className="self-center mt-1 animate-fade-in-up">
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary-glow">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {msg.text}
        </div>
      </div>
    );
  }
  const isUser = msg.kind === "user";
  return (
    <div
      className={cn(
        "flex items-end gap-2 animate-fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <span
        className={cn(
          "grid place-items-center h-7 w-7 rounded-full shrink-0",
          isUser ? "bg-secondary" : "bg-gradient-primary",
        )}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5 text-foreground" />
        ) : (
          <Bot className="h-3.5 w-3.5 text-primary-foreground" />
        )}
      </span>
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug",
          isUser
            ? "rounded-br-sm bg-secondary text-foreground"
            : "rounded-bl-sm bg-card border border-border/60 text-foreground",
        )}
      >
        {msg.text}
      </div>
    </div>
  );
}
