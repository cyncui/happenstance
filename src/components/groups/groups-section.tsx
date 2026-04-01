"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { EyebrowBadge } from "@/components/shared/eyebrow-badge";
import { CtaButton } from "@/components/shared/cta-button";
import { TeamOnboardingDemo } from "./team-onboarding-demo";
import { NetworkGraph } from "./network-graph";
import { FeatureCards } from "./feature-cards";

export function GroupsSection() {
  return (
    <SectionWrapper id="groups">
      <EyebrowBadge>For Teams</EyebrowBadge>

      <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-text">
          Your team&apos;s network,{" "}
          <span className="text-brand-green">searchable in seconds</span>
        </h2>
        <p className="mt-4 text-lg text-brand-muted">
          Set up a group with your company email domain and onboard your entire team instantly.
          Search across everyone&apos;s connections to find the right person, fast.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
      >
        <TeamOnboardingDemo />
        <div className="hidden lg:block">
          <NetworkGraph />
        </div>
      </motion.div>

      <FeatureCards />

      <motion.div variants={fadeUp} className="flex justify-center mt-12">
        <CtaButton>Create a team</CtaButton>
      </motion.div>
    </SectionWrapper>
  );
}
