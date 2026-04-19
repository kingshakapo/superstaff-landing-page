import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { SectionHeader } from "./UseCases";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDemoReply, suggestedPrompts } from "@/lib/demoScript";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "bot"; text: string; id: number };

let nextId = 1;
const newId = () => nextId++;

const initial: Msg[] = [
  { id: newId(), role: "bot", text: "Hey 👋 I'm Superstaff — try me. Ask anything about pricing, setup, or how I'd work on your site." },
];

export function LiveDemo() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { id: newId(), role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    const reply = getDemoReply(trimmed);
    const delay = 800 + Math.min(1500, trimmed.length * 20);
    setTimeout(() => {
      setMessages((m) => [...m, { id: newId(), role: "bot", text: reply.text }]);
      if (reply.followUp) {
        setTimeout(() => {
          setMessages((m) => [...m, { id: newId(), role: "bot", text: reply.followUp! }]);
          setTyping(false);
        }, 900);
      } else {
        setTyping(false);
      }
    }, delay);
  };

  return (
    <section id="demo" className="py-24 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Live demo"
          title="Talk to Superstaff right now"
          desc="This is a working demo. Ask a question — see how it'd respond on your site."
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="glass-strong rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-primary shadow-glow">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-none">Superstaff Demo</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Connected
                  </p>
                </div>
              </div>
            </div>

            <div ref={scrollerRef} className="p-5 space-y-3 h-[420px] overflow-y-auto">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex items-end gap-2 animate-fade-in-up",
                    m.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <span
                    className={cn(
                      "grid place-items-center h-7 w-7 rounded-full shrink-0",
                      m.role === "user" ? "bg-secondary" : "bg-gradient-primary",
                    )}
                  >
                    {m.role === "user" ? (
                      <User className="h-3.5 w-3.5 text-foreground" />
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                    )}
                  </span>
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug",
                      m.role === "user"
                        ? "rounded-br-sm bg-secondary"
                        : "rounded-bl-sm bg-card border border-border/60",
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-end gap-2 animate-fade-in">
                  <span className="grid place-items-center h-7 w-7 rounded-full bg-gradient-primary">
                    <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                  </span>
                  <div className="rounded-2xl rounded-bl-sm bg-secondary px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-bounce [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-bounce [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-typing-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 2 && (
              <div className="px-5 pb-2 flex flex-wrap gap-2">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/20 hover:text-primary-glow border border-border/60 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="px-3 py-3 border-t border-border/60 flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Superstaff anything…"
                maxLength={300}
                className="rounded-full bg-secondary/60 border-border/60"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || typing}
                className="rounded-full bg-gradient-primary text-primary-foreground border-0 btn-glow shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
