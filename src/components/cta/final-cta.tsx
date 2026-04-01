"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { CtaButton } from "@/components/shared/cta-button";

export function FinalCta() {
  return (
    <SectionWrapper>
      <motion.div
        variants={fadeUp}
        className="rounded-3xl bg-brand-bg-card p-12 md:p-20 text-center shadow-[0_0_0_1px_var(--brand-border),0_4px_16px_rgba(0,0,0,0.06)]"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-brand-text">
          Ready to start creating your own luck?
        </h2>
        <p className="mt-4 text-base text-brand-muted max-w-lg mx-auto">
          Join hundreds of thousands of professionals who use Happenstance to
          unlock the full potential of their network.
        </p>
        <div className="mt-8">
          <CtaButton className="px-8 py-3.5">Search for free</CtaButton>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
