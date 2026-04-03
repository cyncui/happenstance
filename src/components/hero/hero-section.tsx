"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { CtaButton } from "@/components/shared/cta-button";
import { IconUserOutline24, IconCloverOutline24 } from "nucleo-core-outline-24";

export function HeroSection() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl px-6 pt-32 pb-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div>
          <motion.div variants={fadeUp} className="mb-6">
            <a
              href="#developers"
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-border px-3 py-1 text-xs font-mono uppercase tracking-wider text-brand-muted hover:text-brand-text hover:border-brand-green/30 transition-colors"
            >
              <span className="text-brand-green">&lt;/&gt;</span> Try our API &rsaquo;
            </a>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-brand-text"
          >
            Make your
            <br />
            own luck
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-brand-muted max-w-md"
          >
            Search your network with AI. For sales, hiring, fundraising, and more.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <CtaButton className="py-3.5">Search for free</CtaButton>
          </motion.div>
        </div>

        {/* Right: Network graph illustration */}
        <motion.div variants={fadeUp} className="hidden lg:block overflow-visible">
          <NetworkGraphHero />
        </motion.div>
      </div>
    </motion.section>
  );
}

function NetworkGraphHero() {
  const nodes = [
    { id: "you", x: 80, y: 175, label: "You", isYou: true },
    { id: "friend", x: 230, y: 65, label: "Your friend" },
    { id: "teammate", x: 230, y: 285, label: "Your teammate" },
    { id: "gmail", x: 380, y: 25, label: "700 contacts", color: "#EA4335", letter: "M" },
    { id: "cal", x: 380, y: 120, label: "2.2k attendees", color: "#4285F4", letter: "31" },
    { id: "ig", x: 380, y: 215, label: "1.2k followers", color: "#E1306C", letter: "IG" },
    { id: "tw", x: 380, y: 315, label: "174k followers", color: "#1DA1F2", letter: "X" },
  ];

  const edges = [
    { from: "you", to: "friend" },
    { from: "you", to: "teammate" },
    { from: "friend", to: "gmail" },
    { from: "friend", to: "cal" },
    { from: "friend", to: "ig" },
    { from: "teammate", to: "ig" },
    { from: "teammate", to: "tw" },
  ];

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 520 350" className="w-full overflow-visible">
      <defs>
        {edges.map((e, i) => (
          <linearGradient key={`grad-${i}`} id={`edge-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--brand-green)" stopOpacity="0.6">
              <animate attributeName="stopOpacity" values="0.6;0.2;0.6" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="var(--brand-green)" stopOpacity="0.3">
              <animate attributeName="offset" values="0.2;0.8;0.2" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="var(--brand-border)" stopOpacity="0.4" />
          </linearGradient>
        ))}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map((e, i) => {
        const from = nodeMap[e.from];
        const to = nodeMap[e.to];
        return (
          <g key={`${e.from}-${e.to}`}>
            <motion.line
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke="var(--brand-green)"
              strokeWidth={2}
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.15 }}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.8, ease: "easeOut" }}
            />
            <motion.line
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={`url(#edge-grad-${i})`}
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.8, ease: "easeOut" }}
            />
            <circle r="2" fill="var(--brand-green)" opacity="0.8">
              <animateMotion dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${1.5 + i * 0.2}s`} path={`M${from.x},${from.y} L${to.x},${to.y}`} />
              <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${1.5 + i * 0.2}s`} />
            </circle>
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 20, delay: i * 0.1 }}
        >
          {node.isYou && (
            <circle cx={node.x} cy={node.y} r={34} fill="var(--brand-green)" opacity="0.08">
              <animate attributeName="r" values="34;40;34" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.08;0.15;0.08" dur="3s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Node circle — uses theme-aware colors */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.isYou ? 28 : node.color ? 22 : 24}
            fill={node.isYou ? "var(--brand-green)" : "var(--brand-bg-card)"}
            opacity={1}
            stroke={node.isYou ? "var(--brand-green)" : node.color || "var(--brand-border)"}
            strokeWidth={1}
          />

          {node.color && (
            <circle cx={node.x} cy={node.y} r={22} fill={node.color} opacity={0.15} />
          )}

          {node.isYou && (
            <foreignObject x={node.x - 9} y={node.y - 9} width={18} height={18}>
              <IconCloverOutline24 size={18} className="text-white" />
            </foreignObject>
          )}
          {!node.isYou && !node.color && (
            <foreignObject x={node.x - 7} y={node.y - 7} width={14} height={14}>
              <IconUserOutline24 size={14} className="text-brand-muted" />
            </foreignObject>
          )}
          {node.color && (
            <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="central" fill={node.color} fontSize={10} fontWeight={700} fontFamily="system-ui">{node.letter}</text>
          )}

          <text
            x={node.color ? node.x + 30 : node.x}
            y={node.color ? node.y + 1 : node.y + 42}
            textAnchor={node.color ? "start" : "middle"}
            dominantBaseline="central"
            fill="var(--brand-muted)"
            fontSize={12}
            fontFamily="system-ui"
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
