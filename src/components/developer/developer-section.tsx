"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { EyebrowBadge } from "@/components/shared/eyebrow-badge";
import { CtaButton } from "@/components/shared/cta-button";
import { ApiPlayground } from "./api-playground";
import { IntegrationGrid } from "./integration-grid";
import { IconArrowRightOutline24 } from "nucleo-core-outline-24";

export function DeveloperSection() {
  return (
    <SectionWrapper id="developers">
      <EyebrowBadge>Developer Platform</EyebrowBadge>

      <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-text">
          Build on the{" "}
          <span className="text-brand-green">people graph</span>
        </h2>
        <p className="mt-4 text-lg text-brand-muted">
          Search API, Research API, CLI, MCP, and ChatGPT — find anyone, from anywhere.
        </p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <ApiPlayground />
      </motion.div>

      <IntegrationGrid />

      <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mt-12">
        <CtaButton>Get API key</CtaButton>
        <motion.a
          href="#"
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-text transition-colors"
        >
          Read the docs
          <IconArrowRightOutline24 size={14} />
        </motion.a>
      </motion.div>
    </SectionWrapper>
  );
}
