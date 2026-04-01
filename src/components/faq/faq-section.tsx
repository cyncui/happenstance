"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { IconArrowDownOutline24 } from "nucleo-core-outline-24";

const FAQ_ITEMS = [
  { q: "What is Happenstance?", a: "Happenstance is an AI-powered people search tool that helps you find anyone through your professional network. Connect your email, social accounts, and more to build a searchable graph of everyone you know." },
  { q: "How does the search work?", a: "Just describe who you're looking for in natural language. Our AI uses LLMs and embedding search to understand your intent and find the best matches across your entire network." },
  { q: "What networks can I connect?", a: "You can connect Gmail, Google Calendar, Instagram, Twitter, LinkedIn, and more. Each connection expands the people you can search through." },
  { q: "What are friends?", a: "Friends are people you trust who share their network with you. When you become friends on Happenstance, you can search across each other's connections." },
  { q: "What are groups?", a: "Groups let teams and communities share their collective network. Set up a group with your company email domain and your entire team gets access instantly." },
  { q: "What is research?", a: "Research generates AI-compiled profiles about specific individuals, including employment history, education, projects, writings, and more — all with source URLs." },
  { q: "What integrations are available?", a: "We offer a Slack bot, email agent, REST API, CLI tool, MCP for Claude, and a ChatGPT integration. Bring Happenstance into any workflow." },
  { q: "Does Happenstance have an API?", a: "Yes! Our API includes Search and Research endpoints. We also offer a CLI, MCP server for Claude, and a ChatGPT integration. Visit developer.happenstance.ai to get started." },
  { q: "Is this free?", a: "Happenstance offers a free tier with limited searches. Paid plans unlock unlimited searches, API access, and team features." },
  { q: "Is my data secure?", a: "Yes. We use enterprise-grade encryption and never share your data with third parties. Your network data is only used to power your own searches." },
  { q: "Is Happenstance affiliated with third-party services?", a: "We integrate with third-party services like Gmail and Slack to import your connections, but we are an independent company and do not share your data." },
];

function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={fadeUp} className="border-b border-brand-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium text-brand-text">{item.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-brand-muted shrink-0 ml-4"
        >
          <IconArrowDownOutline24 size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-brand-muted leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  return (
    <SectionWrapper className="mx-auto max-w-2xl">
      <motion.div variants={fadeUp} className="text-center mb-12">
        <h2 className="text-3xl font-semibold tracking-tight text-brand-text">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-base text-brand-muted">
          Get answers to common questions about Happenstance.
        </p>
      </motion.div>

      <div>
        {FAQ_ITEMS.map((item) => (
          <FaqItem key={item.q} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}
