"use client";

import { motion } from "framer-motion";
import { IconEnvelopeOutline24, IconMagnifierOutline24, IconPeopleNetworkOutline24 } from "nucleo-core-outline-24";
import { fadeUp } from "@/lib/animations";
import { GlowCard } from "@/components/shared/glow-card";

const features = [
  {
    icon: IconEnvelopeOutline24,
    title: "One-click onboarding",
    description:
      "Add your company email domain and your entire team gets access instantly. No invites to manage.",
  },
  {
    icon: IconMagnifierOutline24,
    title: "Shared network search",
    description:
      "Search across your team's collective network. Find warm intros through any teammate's connections.",
  },
  {
    icon: IconPeopleNetworkOutline24,
    title: "Group discovery",
    description:
      "Browse and join groups for your company, alumni network, or community. See who's already there.",
  },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
      {features.map((feature) => (
        <GlowCard key={feature.title}>
          <motion.div variants={fadeUp}>
            <feature.icon size={24} className="text-brand-green mb-4" />
            <h3 className="text-base font-semibold text-brand-text mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        </GlowCard>
      ))}
    </div>
  );
}
