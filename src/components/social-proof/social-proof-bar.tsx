"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const LOGOS = [
  { name: "Perplexity", style: "font-medium tracking-tight" },
  { name: "THRIVE CAPITAL", style: "text-[11px] font-bold tracking-[0.15em]" },
  { name: "Lovable", style: "font-semibold tracking-tight" },
  { name: "Y Combinator", style: "font-medium", hasIcon: true },
  { name: "Greylock", style: "font-normal tracking-wide font-serif italic" },
  { name: "Brex", style: "font-bold tracking-tight" },
  { name: "Accel", style: "font-bold tracking-tight lowercase" },
  { name: "AngelList", style: "font-semibold tracking-tight" },
];

export function SocialProofBar() {
  return (
    <SectionWrapper className="py-12 md:py-12">
      <motion.p
        variants={fadeUp}
        className="text-center text-sm text-brand-muted mb-8"
      >
        Loved by 300,000+ users and trusted by teams at
      </motion.p>
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        {LOGOS.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-brand-bg-card/50 border border-brand-border/30 text-brand-muted/50 hover:text-brand-muted/80 transition-colors whitespace-nowrap"
          >
            {logo.hasIcon && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-current text-[9px] font-bold leading-none">
                <span style={{ color: "var(--logo-invert)" }}>Y</span>
              </span>
            )}
            <span className={`text-xs ${logo.style}`}>{logo.name}</span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
