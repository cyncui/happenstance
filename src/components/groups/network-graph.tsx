"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  isTeam: boolean;
  isDiscovered?: boolean;
}

interface Edge {
  from: string;
  to: string;
}

const NODES: Node[] = [
  // Team members (green, larger)
  { id: "t1", x: 200, y: 140, label: "SC", isTeam: true },
  { id: "t2", x: 120, y: 240, label: "AR", isTeam: true },
  { id: "t3", x: 280, y: 240, label: "JP", isTeam: true },
  { id: "t4", x: 200, y: 320, label: "MS", isTeam: true },
  // Connections (smaller, zinc)
  { id: "c1", x: 60, y: 120, label: "DL", isTeam: false },
  { id: "c2", x: 340, y: 100, label: "KT", isTeam: false },
  { id: "c3", x: 40, y: 320, label: "RJ", isTeam: false },
  { id: "c4", x: 360, y: 320, label: "LM", isTeam: false },
  { id: "c5", x: 100, y: 60, label: "AW", isTeam: false },
  { id: "c6", x: 320, y: 60, label: "NP", isTeam: false },
  { id: "c7", x: 60, y: 200, label: "BG", isTeam: false },
  { id: "c8", x: 360, y: 200, label: "YZ", isTeam: false },
  // Discovered connections (will highlight)
  { id: "d1", x: 160, y: 40, label: "EF", isTeam: false, isDiscovered: true },
  { id: "d2", x: 380, y: 160, label: "HK", isTeam: false, isDiscovered: true },
  { id: "d3", x: 200, y: 400, label: "WR", isTeam: false, isDiscovered: true },
];

const EDGES: Edge[] = [
  // Team interconnections
  { from: "t1", to: "t2" },
  { from: "t1", to: "t3" },
  { from: "t2", to: "t4" },
  { from: "t3", to: "t4" },
  { from: "t1", to: "t4" },
  // Team to connections
  { from: "t1", to: "c1" },
  { from: "t1", to: "c2" },
  { from: "t1", to: "c5" },
  { from: "t1", to: "c6" },
  { from: "t1", to: "d1" },
  { from: "t2", to: "c3" },
  { from: "t2", to: "c7" },
  { from: "t3", to: "c4" },
  { from: "t3", to: "c8" },
  { from: "t3", to: "d2" },
  { from: "t4", to: "c3" },
  { from: "t4", to: "d3" },
  // Cross connections
  { from: "c5", to: "c6" },
  { from: "c1", to: "c7" },
  { from: "c4", to: "c8" },
];

const CENTER_X = 200;
const CENTER_Y = 220;

export function NetworkGraph() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pulseComplete, setPulseComplete] = useState(false);

  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  const isEdgeHighlighted = (edge: Edge) => {
    if (!hoveredNode) return false;
    return edge.from === hoveredNode || edge.to === hoveredNode;
  };

  const isEdgeDiscovered = (edge: Edge) => {
    if (!pulseComplete) return false;
    const fromNode = nodeMap[edge.from];
    const toNode = nodeMap[edge.to];
    return fromNode?.isDiscovered || toNode?.isDiscovered;
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 440"
      className="w-full h-full"
      style={{ maxHeight: 440 }}
    >
      {/* Edges */}
      {EDGES.map((edge, i) => {
        const from = nodeMap[edge.from];
        const to = nodeMap[edge.to];
        if (!from || !to) return null;
        const highlighted = isEdgeHighlighted(edge);
        const discovered = isEdgeDiscovered(edge);
        return (
          <motion.line
            key={`${edge.from}-${edge.to}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isInView
                ? { pathLength: 1, opacity: highlighted ? 0.8 : discovered ? 0.6 : 0 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { delay: 1.2 + i * 0.04, duration: 0.4, ease: "easeOut" },
              opacity: { duration: 0.2 },
            }}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={highlighted || discovered ? "var(--brand-green)" : "var(--brand-muted)"}
            strokeWidth={highlighted ? 2 : 1}
          />
        );
      })}

      {/* Search pulse */}
      {isInView && (
        <motion.circle
          cx={CENTER_X}
          cy={CENTER_Y}
          initial={{ r: 0, opacity: 0.4 }}
          animate={{ r: 250, opacity: 0 }}
          transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }}
          fill="none"
          stroke="var(--brand-green)"
          strokeWidth={2}
          onAnimationComplete={() => setPulseComplete(true)}
        />
      )}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const isHovered = hoveredNode === node.id;
        const r = node.isTeam ? 22 : node.isDiscovered ? 16 : 14;
        const showDiscovered = pulseComplete && node.isDiscovered;

        return (
          <motion.g
            key={node.id}
            initial={{ scale: 0, x: CENTER_X - node.x, y: CENTER_Y - node.y, opacity: 0 }}
            animate={
              isInView
                ? { scale: 1, x: 0, y: 0, opacity: 1 }
                : { scale: 0, x: CENTER_X - node.x, y: CENTER_Y - node.y, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15,
              delay: i * 0.06,
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Glow ring for discovered nodes */}
            {showDiscovered && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r + 6}
                fill="none"
                stroke="var(--brand-green)"
                strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              />
            )}
            {/* Hover ring */}
            {isHovered && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r + 4}
                fill="none"
                stroke="var(--brand-green)"
                strokeWidth={1.5}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={r}
              fill={
                node.isTeam
                  ? "var(--brand-green)"
                  : showDiscovered
                  ? "var(--brand-green)"
                  : "var(--brand-bg-card)"
              }
              opacity={node.isTeam || showDiscovered ? 1 : 0.8}
              stroke={node.isTeam || showDiscovered ? "none" : "var(--brand-border)"}
              strokeWidth={1}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={node.isTeam || showDiscovered ? "#052E16" : "var(--brand-muted)"}
              fontSize={node.isTeam ? 10 : 8}
              fontWeight={600}
              fontFamily="system-ui, sans-serif"
            >
              {node.label}
            </text>

            {/* Tooltip */}
            {isHovered && (
              <g>
                {(() => {
                  const label = node.isTeam ? "Team member" : "12 shared connections";
                  const pillWidth = node.isTeam ? 90 : 136;
                  return (
                    <>
                      <rect
                        x={node.x - pillWidth / 2}
                        y={node.y - r - 32}
                        width={pillWidth}
                        height={24}
                        rx={6}
                        fill="var(--brand-bg-card)"
                        stroke="var(--brand-border)"
                        strokeWidth={1}
                      />
                      <text
                        x={node.x}
                        y={node.y - r - 17}
                        textAnchor="middle"
                        fill="var(--brand-muted)"
                        fontSize={9}
                        fontFamily="system-ui, sans-serif"
                      >
                        {label}
                      </text>
                    </>
                  );
                })()}
              </g>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
