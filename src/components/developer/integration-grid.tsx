"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const integrations = [
  { label: "POST /v1/search", tab: "search" },
  { label: "POST /v1/research", tab: "research" },
  { label: "pipx install happenstance", tab: "cli" },
  { label: "GPT Store", tab: "mcp" },
];

export function IntegrationGrid({ onSelect }: { onSelect?: (tab: string) => void }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-4">
      {integrations.map((item) => (
        <button
          key={item.label}
          onClick={() => onSelect?.(item.tab)}
          className="rounded-md border border-brand-border bg-brand-bg px-3 py-1.5 text-xs font-mono text-brand-muted hover:text-brand-green hover:border-brand-green/30 transition-colors"
        >
          {item.label}
        </button>
      ))}
    </motion.div>
  );
}
