"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { GlowCard } from "@/components/shared/glow-card";
import { WorkflowPlayground } from "./workflow-playground";

const INTEGRATIONS = [
  {
    title: "Bot for Slack",
    description:
      "Tag @happenstance in any Slack channel to search your team\u2019s networks.",
    href: "/slack",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M9.29 24.45a3.57 3.57 0 1 1-3.57-3.57h3.57v3.57Zm1.79 0a3.57 3.57 0 1 1 7.14 0v8.93a3.57 3.57 0 1 1-7.14 0v-8.93Z" fill="#E01E5A" />
        <path d="M14.65 9.29a3.57 3.57 0 1 1 3.57-3.57v3.57h-3.57Zm0 1.79a3.57 3.57 0 1 1 0 7.14H5.72a3.57 3.57 0 1 1 0-7.14h8.93Z" fill="#36C5F0" />
        <path d="M29.81 14.65a3.57 3.57 0 1 1 3.57 3.57h-3.57v-3.57Zm-1.79 0a3.57 3.57 0 1 1-7.14 0V5.72a3.57 3.57 0 1 1 7.14 0v8.93Z" fill="#2EB67D" />
        <path d="M24.45 29.81a3.57 3.57 0 1 1-3.57 3.57v-3.57h3.57Zm0-1.79a3.57 3.57 0 1 1 0-7.14h8.93a3.57 3.57 0 1 1 0 7.14h-8.93Z" fill="#ECB22E" />
      </svg>
    ),
  },
  {
    title: "Email agent",
    description:
      "Forward emails to agent@happenstance.ai to run searches automatically.",
    href: "/email",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="24" rx="4" fill="#3B82F6" />
        <path d="M4 14l16 10 16-10" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export function IntegrationsSection() {
  return (
    <SectionWrapper id="integrations">
      <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-text">
          Integrate with your workflow
        </h2>
        <p className="mt-4 text-lg text-brand-muted">
          Bring Happenstance to where you work.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mb-12">
        <WorkflowPlayground />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {INTEGRATIONS.map((item) => (
          <GlowCard key={item.title}>
            <a href={item.href} className="block space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-text">{item.title}</h3>
                <p className="mt-1 text-xs text-brand-muted leading-relaxed">{item.description}</p>
              </div>
              <span className="inline-flex items-center rounded-md border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-text transition-colors">
                Learn more
              </span>
            </a>
          </GlowCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
