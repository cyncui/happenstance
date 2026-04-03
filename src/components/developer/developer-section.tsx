"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { EyebrowBadge } from "@/components/shared/eyebrow-badge";
import { CtaButton } from "@/components/shared/cta-button";
import { ApiPlayground } from "./api-playground";
import { IconArrowRightOutline24 } from "nucleo-core-outline-24";

const TAB_COPY: Record<string, { heading: string; description: string; endpoint: string }> = {
  search: {
    heading: "Search API",
    description:
      "Natural language people search across your entire network. Find anyone by role, company, location, or skill \u2014 in a single API call.",
    endpoint: "POST /v1/search",
  },
  research: {
    heading: "Research API",
    description:
      "AI-compiled dossiers with employment history, education, projects, and mutual connections. Deep context on any person.",
    endpoint: "POST /v1/research",
  },
  cli: {
    heading: "CLI",
    description:
      "Search and research from your terminal. Pipe results into scripts, CSV exports, or any automation workflow.",
    endpoint: "pipx install happenstance",
  },
  mcp: {
    heading: "MCP",
    description:
      "Connect Happenstance to Claude Code, Cursor, or any MCP-compatible client. Search your network from your IDE.",
    endpoint: "GPT Store",
  },
};

export function DeveloperSection() {
  const [activeTab, setActiveTab] = useState("search");
  const copy = TAB_COPY[activeTab];

  return (
    <SectionWrapper id="developers">
      <EyebrowBadge>Developer Platform</EyebrowBadge>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-12 items-start mt-8">
        {/* Left column: copy + CTA */}
        <motion.div variants={fadeUp} className="flex flex-col">
          <div className="min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-brand-text">
                  {copy.heading}
                </h2>
                <p className="mt-3 text-base text-brand-muted leading-relaxed">
                  {copy.description}
                </p>
                <code className="inline-block mt-4 rounded-md border border-brand-border bg-brand-bg px-3 py-1.5 text-xs font-mono text-brand-muted">
                  {copy.endpoint}
                </code>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <CtaButton>Get API key</CtaButton>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-text transition-colors"
            >
              Read the docs
              <IconArrowRightOutline24 size={14} />
            </motion.a>
          </div>
        </motion.div>

        {/* Right column: playground */}
        <motion.div variants={fadeUp}>
          <ApiPlayground activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
