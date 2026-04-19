// Scripted intelligent responses for the live chat demo.
// Matches keywords to canned answers; falls back to a smart generic reply.

export type DemoReply = {
  text: string;
  followUp?: string;
};

const rules: { match: RegExp; reply: DemoReply }[] = [
  {
    match: /(price|pricing|cost|how much|fee)/i,
    reply: {
      text: "Our plans start at $49/mo. Most teams pick Growth at $149/mo — it includes lead capture, advanced training, and priority responses.",
      followUp: "Want me to send the full pricing breakdown to your email?",
    },
  },
  {
    match: /(hour|open|available|24|when)/i,
    reply: {
      text: "I'm online 24/7 — including weekends and holidays. No queues, no wait times, no sick days.",
    },
  },
  {
    match: /(demo|try|test|see it)/i,
    reply: {
      text: "You're already chatting with one! I'm trained on Superstaff's product info. Ask me about features, pricing, or how setup works.",
    },
  },
  {
    match: /(setup|install|integrate|deploy|website)/i,
    reply: {
      text: "Setup takes about 5 minutes: paste a single script tag into your site, upload your FAQs/docs, and you're live.",
    },
  },
  {
    match: /(lead|capture|email|contact)/i,
    reply: {
      text: "I qualify visitors naturally during conversation, then hand off name + email + intent straight to your CRM or inbox.",
      followUp: "Want me to capture your details so a human can follow up?",
    },
  },
  {
    match: /(train|knowledge|data|upload|document)/i,
    reply: {
      text: "Upload PDFs, paste URLs, or sync your help center. I'll learn your business in minutes — products, policies, SOPs, everything.",
    },
  },
  {
    match: /(human|agent|person|talk to|escalate)/i,
    reply: {
      text: "I can answer ~85% of questions on my own. For the rest, I escalate to your team with full conversation context attached.",
    },
  },
  {
    match: /(language|spanish|french|multilingual)/i,
    reply: {
      text: "I speak 50+ languages fluently and switch automatically based on what your visitor types.",
    },
  },
  {
    match: /(security|gdpr|privacy|data)/i,
    reply: {
      text: "Conversations are encrypted in transit and at rest. We're SOC 2 aligned and GDPR-friendly — your data is never used to train external models.",
    },
  },
  {
    match: /(hi|hello|hey|yo|greetings)/i,
    reply: {
      text: "Hey there 👋 I'm Superstaff. Ask me anything about pricing, setup, or how I'd work on your site.",
    },
  },
];

const fallback: DemoReply = {
  text: "Great question. On a real deployment I'd answer this from your business knowledge base. Try asking about pricing, setup, or 24/7 availability to see me in action.",
};

export function getDemoReply(input: string): DemoReply {
  for (const r of rules) if (r.match.test(input)) return r.reply;
  return fallback;
}

export const suggestedPrompts = [
  "How much does it cost?",
  "How do I set it up?",
  "Do you capture leads?",
  "Are you available 24/7?",
];
