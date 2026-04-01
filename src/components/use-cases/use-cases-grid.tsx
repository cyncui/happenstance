"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { GlowCard } from "@/components/shared/glow-card";
import {
  IconTargetOutline24,
  IconHandHoldingMoneyOutline24,
  IconChartBarTrendUpOutline24,
  IconRocketOutline24,
  IconGraduationCapOutline24,
  IconPeopleNetworkOutline24,
} from "nucleo-core-outline-24";

const USE_CASES = [
  { title: "Sales", description: "Find decision-makers through warm intros", icon: IconTargetOutline24 },
  { title: "Recruiting", description: "Source referral candidates from your network", icon: IconPeopleNetworkOutline24 },
  { title: "Fundraising", description: "Find investors and get warm introductions", icon: IconHandHoldingMoneyOutline24 },
  { title: "Investors", description: "Surface deals through portfolio connections", icon: IconChartBarTrendUpOutline24 },
  { title: "Founders", description: "Tap your network for hires, customers, and capital", icon: IconRocketOutline24 },
  { title: "Alumni Networks", description: "Reconnect and leverage your shared communities", icon: IconGraduationCapOutline24 },
];

export function UseCasesGrid() {
  return (
    <SectionWrapper>
      <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-text">
          Built for every team
        </h2>
        <p className="mt-4 text-lg text-brand-muted">
          See how teams use Happenstance to unlock their network.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {USE_CASES.map((uc) => (
          <GlowCard key={uc.title} className="text-center">
            <motion.div variants={fadeUp} className="py-2">
              <div className="flex justify-center mb-3 text-brand-muted">
                <uc.icon size={24} />
              </div>
              <h3 className="text-sm font-semibold text-brand-text mb-1">{uc.title}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{uc.description}</p>
            </motion.div>
          </GlowCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
