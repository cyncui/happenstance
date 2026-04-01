"use client";

import { motion } from "framer-motion";
import { IconApiOutline24, IconBrainOutline24, IconConsoleOutline24, IconChatBotOutline24 } from "nucleo-core-outline-24";
import { fadeUp } from "@/lib/animations";
import { GlowCard } from "@/components/shared/glow-card";
import { CreditBadge } from "@/components/shared/credit-badge";

const integrations = [
  {
    icon: IconApiOutline24,
    title: "Search API",
    description: "Natural language people search across your network and groups.",
    endpoint: "POST /v1/search",
    credits: 2,
  },
  {
    icon: IconBrainOutline24,
    title: "Research API",
    description: "AI-compiled profiles with employment, education, projects, and more.",
    endpoint: "POST /v1/research",
    credits: 1,
  },
  {
    icon: IconConsoleOutline24,
    title: "CLI",
    description: "Search and research from your terminal. Pipe results into any workflow.",
    endpoint: "pipx install happenstance",
  },
  {
    icon: IconChatBotOutline24,
    title: "ChatGPT",
    description: "Search your network directly from ChatGPT. Available in the GPT Store.",
    endpoint: "GPT Store",
  },
];

export function IntegrationGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
      {integrations.map((item) => (
        <GlowCard key={item.title}>
          <motion.div variants={fadeUp} className="space-y-3">
            <div className="flex items-center justify-between">
              <item.icon size={20} className="text-brand-green" />
              {item.credits && <CreditBadge credits={item.credits} />}
            </div>
            <h3 className="text-sm font-semibold text-brand-text">{item.title}</h3>
            <p className="text-xs text-brand-muted leading-relaxed">{item.description}</p>
            <code className="block text-xs font-mono text-brand-muted/70 truncate">
              {item.endpoint}
            </code>
          </motion.div>
        </GlowCard>
      ))}
    </div>
  );
}
