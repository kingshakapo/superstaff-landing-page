import { SectionHeader } from "./UseCases";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does setup actually take?",
    a: "Most teams are live in under 10 minutes. Paste a single script tag into your site, upload your FAQs/docs, and Superstaff starts answering. No engineers needed — though your engineers will love how clean it is.",
  },
  {
    q: "What languages does Superstaff support?",
    a: "Superstaff speaks 50+ languages fluently and switches automatically based on what your visitor types. You can also lock it to specific languages or set a default for your region.",
  },
  {
    q: "How is my data handled? Is it private?",
    a: "All conversations and training data are encrypted in transit and at rest. We're SOC 2 aligned and GDPR-friendly. Your business knowledge is never used to train external models — it stays yours, isolated to your workspace.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All plans are monthly with no long-term contracts. Cancel from your dashboard in two clicks — no calls, no retention pressure. You keep access until the end of your billing period.",
  },
  {
    q: "What happens when Superstaff doesn't know an answer?",
    a: "Instead of guessing, Superstaff escalates to your team with the full conversation context attached — by email, Slack, or your help-desk of choice. You stay in control of the hard cases.",
  },
  {
    q: "Does it work with my existing tools?",
    a: "Yes. Native integrations with HubSpot, Salesforce, Slack, Intercom, Zendesk, and webhooks for everything else. Captured leads land directly in your CRM with full context.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered"
          desc="Everything you need to know before hiring your Superstaff."
        />

        <div className="mt-12 max-w-3xl mx-auto glass-strong rounded-2xl p-2 md:p-4 shadow-card">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-border/60 last:border-b-0"
              >
                <AccordionTrigger className="px-4 text-left text-base font-medium hover:no-underline hover:text-primary-glow">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
