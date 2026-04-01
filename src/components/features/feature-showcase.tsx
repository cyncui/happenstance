"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { GlowCard } from "@/components/shared/glow-card";

const FEATURES = [
  {
    title: "Natural language search",
    description:
      'Just describe who you\'re looking for — like "a fintech PM in NYC" — and we\'ll search across your networks using AI.',
    demo: "search",
  },
  {
    title: "AI-powered people search",
    description:
      "We use LLMs and embedding search to understand intent and find the best people — from Google to Twitter and beyond.",
    demo: "ai",
  },
  {
    title: "Search with your friends",
    description:
      "Share your network with friends and groups to expand your reach and find people you can trust.",
    demo: "social",
  },
];

function SearchDemo() {
  return (
    <div className="flex flex-col gap-2.5 p-4">
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 25 }}
        className="self-end rounded-xl rounded-br-sm bg-brand-bg-elevated border border-brand-border px-3.5 py-2.5 max-w-[85%]"
      >
        <p className="text-xs text-brand-text">
          Looking for an AI founder in SF — ideally Stanford alum, pre-seed.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 25 }}
        className="self-start flex items-center gap-2"
      >
        <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
          <span className="text-[10px]">☘</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-brand-green"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function AiDemo() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="text-4xl"
        >
          ☘️
        </motion.div>
        {/* Orbiting dots */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: i * 1 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformOrigin: "center" }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-brand-green/60"
              style={{ transform: `translateY(-28px)` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SocialDemo() {
  const items = [
    { icon: "🏢", text: "Group invitation" },
    { icon: "👋", text: "Friend request" },
    { icon: "☘️", text: "New friend" },
  ];

  return (
    <div className="flex flex-col gap-1.5 p-4">
      {items.map((n, i) => (
        <motion.div
          key={n.text}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 200, damping: 25 }}
          className="flex items-center gap-2.5 rounded-lg bg-brand-bg-elevated border border-brand-border px-3 py-2"
        >
          <span className="text-sm">{n.icon}</span>
          <span className="text-xs text-brand-text">{n.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function FeatureShowcase() {
  return (
    <SectionWrapper>
      <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-text">
          Turn your network into your unfair advantage
        </h2>
        <p className="mt-4 text-lg text-brand-muted">
          Deep search across everyone you know.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURES.map((feature) => (
          <GlowCard key={feature.title} className="p-0 overflow-hidden">
            <motion.div variants={fadeUp}>
              <div className="h-[160px] border-b border-brand-border">
                {feature.demo === "search" && <SearchDemo />}
                {feature.demo === "ai" && <AiDemo />}
                {feature.demo === "social" && <SocialDemo />}
              </div>
              <div className="p-5">
                <h3 className="text-sm font-semibold text-brand-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          </GlowCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
