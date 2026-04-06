"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import { WindowChrome } from "@/components/shared/window-chrome";


type Tab = "search" | "research" | "cli" | "mcp";

const TABS: { id: Tab; label: string }[] = [
  { id: "search", label: "Search API" },
  { id: "research", label: "Research API" },
  { id: "cli", label: "CLI" },
  { id: "mcp", label: "MCP" },
];

const SEARCH_CODE = `curl -X POST https://api.happenstance.ai/v1/search \\
  -H "Authorization: Bearer hpn_sk_\u2022\u2022\u2022\u2022\u2022\u2022" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "AI infrastructure engineers in SF"}'`;

const RESEARCH_CODE = `curl -X POST https://api.happenstance.ai/v1/research \\
  -H "Authorization: Bearer hpn_sk_\u2022\u2022\u2022\u2022\u2022\u2022" \\
  -H "Content-Type: application/json" \\
  -d '{"description": "Sarah Chen, Anthropic"}'`;

const CLI_INPUT = `$ pipx install happenstance
\u2713 installed happenstance 1.2.0

$ hpn search "distributed systems engineers" --groups "YC W24"`;

const MCP_CONFIG = `{
  "mcpServers": {
    "happenstance": {
      "type": "url",
      "url": "https://happenstance.ai/mcp"
    }
  }
}`;

const SEARCH_RESULTS = [
  { name: "Sarah Chen", title: "Staff ML Infra @ Anthropic", score: 0.95 },
  { name: "Alex Rivera", title: "SRE Lead @ Vercel", score: 0.91 },
  { name: "Priya Patel", title: "Infra Engineer @ Databricks", score: 0.88 },
];

const CLI_RESULTS = [
  { name: "Sarah Chen", title: "Staff ML Infra @ Anthropic", score: "0.95" },
  { name: "Alex Rivera", title: "SRE Lead @ Vercel", score: "0.91" },
  { name: "Priya Patel", title: "Infra Eng @ Databricks", score: "0.88" },
  { name: "Kim Tran", title: "Platform @ Railway", score: "0.85" },
];

const RESEARCH_PROFILE = {
  name: "Sarah Chen",
  title: "Staff ML Infrastructure Engineer",
  company: "Anthropic",
  location: "San Francisco, CA",
  education: "Stanford University, MS Computer Science",
  skills: ["Distributed Systems", "ML Ops", "Kubernetes", "PyTorch", "Go"],
  experience: [
    { role: "Staff ML Infra", company: "Anthropic", years: "2023-present" },
    { role: "Senior SRE", company: "Google Brain", years: "2020-2023" },
    { role: "Backend Engineer", company: "Stripe", years: "2018-2020" },
  ],
};

const MCP_CHAT = [
  { role: "user" as const, text: "Find React engineers in SF who've worked at startups" },
  {
    role: "assistant" as const,
    text: "I found 8 React engineers in SF from your network. Here are the top matches:",
    results: [
      { name: "Jordan Lee", title: "Senior Frontend @ Linear" },
      { name: "Nina Zhao", title: "Staff Engineer @ Vercel" },
      { name: "Mark Davis", title: "Lead Frontend @ Resend" },
    ],
  },
];

function SyntaxLine({ text, type }: { text: string; type: "bash" | "json" | "terminal" }) {
  if (type === "terminal") {
    if (text.startsWith("$")) {
      return (
        <span>
          <span className="text-brand-green">$ </span>
          <span className="text-white">{text.slice(2)}</span>
        </span>
      );
    }
    if (text.startsWith("\u2713")) {
      return (
        <span>
          <span className="text-brand-green">{"\u2713"} </span>
          <span className="text-brand-muted">{text.slice(2)}</span>
        </span>
      );
    }
    return <span className="text-brand-muted">{text}</span>;
  }

  if (type === "json") {
    const highlighted = text
      .replace(/"([^"]+)"(?=\s*:)/g, '"<key>$1</key>"')
      .replace(/:\s*"([^"]+)"/g, ': "<val>$1</val>"')
      .replace(/:\s*(true|false|null|\d+\.?\d*)/g, ': <num>$1</num>');

    const parts = highlighted.split(/(<key>.*?<\/key>|<val>.*?<\/val>|<num>.*?<\/num>)/);
    return (
      <span>
        {parts.map((part, i) => {
          if (part.startsWith("<key>"))
            return <span key={i} className="text-brand-green">{part.replace(/<\/?key>/g, "")}</span>;
          if (part.startsWith("<val>"))
            return <span key={i} className="text-brand-text">{part.replace(/<\/?val>/g, "")}</span>;
          if (part.startsWith("<num>"))
            return <span key={i} className="text-amber-400">{part.replace(/<\/?num>/g, "")}</span>;
          return <span key={i} className="text-brand-muted">{part}</span>;
        })}
      </span>
    );
  }

  // bash
  let result = text;
  if (text.startsWith("curl")) {
    return (
      <span>
        <span className="text-brand-green">curl</span>
        <span className="text-brand-muted">{text.slice(4)}</span>
      </span>
    );
  }
  if (text.includes("-H") || text.includes("-d") || text.includes("-X")) {
    const flagMatch = result.match(/^\s*(-[A-Za-z])\s/);
    if (flagMatch) {
      return (
        <span>
          <span className="text-brand-muted">{text.slice(0, text.indexOf(flagMatch[1]))}</span>
          <span className="text-sky-400">{flagMatch[1]}</span>
          <span className="text-brand-muted">{text.slice(text.indexOf(flagMatch[1]) + flagMatch[1].length)}</span>
        </span>
      );
    }
  }
  return <span className="text-brand-muted">{text}</span>;
}

function SearchTab({ active }: { active: boolean }) {
  const { displayText, isComplete } = useTypingAnimation(SEARCH_CODE, active, 25);
  const [showResults, setShowResults] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (isComplete) {
      setShowSpinner(true);
      const t = setTimeout(() => {
        setShowSpinner(false);
        setShowResults(true);
      }, 1200);
      return () => clearTimeout(t);
    } else {
      setShowResults(false);
      setShowSpinner(false);
    }
  }, [isComplete]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x divide-brand-border h-[300px] overflow-hidden">
      {/* Request */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">Request</span>
          <span className="text-xs font-mono text-brand-green">POST</span>
        </div>
        <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-all text-brand-muted">
          {displayText}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-brand-green"
            >
              |
            </motion.span>
          )}
        </pre>
      </div>
      {/* Response */}
      <div className="p-5 border-t md:border-t-0 border-brand-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">Response</span>
          {showResults && <span className="text-xs font-mono text-brand-green">200 OK</span>}
        </div>
        <AnimatePresence mode="wait">
          {showSpinner && (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-brand-muted py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-brand-green/30 border-t-brand-green rounded-full"
              />
              Searching...
            </motion.div>
          )}
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {SEARCH_RESULTS.map((result, i) => (
                <motion.div
                  key={result.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 25 }}
                  className="flex items-center gap-3 rounded-lg bg-brand-bg p-3"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-green/20 flex items-center justify-center text-xs font-semibold text-brand-green">
                    {result.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-brand-text font-medium truncate">{result.name}</p>
                    <p className="text-xs text-brand-muted truncate">{result.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1.5 rounded-full bg-brand-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score * 100}%` }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                        className="h-full rounded-full bg-brand-green"
                      />
                    </div>
                    <span className="text-xs font-mono text-brand-green" style={{ fontVariantNumeric: "tabular-nums" }}>{result.score}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResearchTab({ active }: { active: boolean }) {
  const { displayText, isComplete } = useTypingAnimation(RESEARCH_CODE, active, 25);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (isComplete) {
      const t = setTimeout(() => setShowProfile(true), 1000);
      return () => clearTimeout(t);
    } else {
      setShowProfile(false);
    }
  }, [isComplete]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x divide-brand-border h-[300px] overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">Request</span>
          <span className="text-xs font-mono text-brand-green">POST</span>
        </div>
        <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-all text-brand-muted">
          {displayText}
          {!isComplete && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-brand-green">|</motion.span>
          )}
        </pre>
      </div>
      <div className="p-5 border-t md:border-t-0 border-brand-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">Profile</span>
          {showProfile && <span className="text-xs font-mono text-brand-green">compiled</span>}
        </div>
        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green to-emerald-700 flex items-center justify-center text-sm font-bold text-white">
                  SC
                </div>
                <div>
                  <p className="text-base font-semibold text-brand-text">{RESEARCH_PROFILE.name}</p>
                  <p className="text-sm text-brand-muted">{RESEARCH_PROFILE.title} @ {RESEARCH_PROFILE.company}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-brand-muted"><span className="text-brand-text">Location:</span> {RESEARCH_PROFILE.location}</p>
                <p className="text-brand-muted"><span className="text-brand-text">Education:</span> {RESEARCH_PROFILE.education}</p>
              </div>
              <div>
                <p className="text-xs text-brand-text mb-2">Experience</p>
                <div className="space-y-1.5">
                  {RESEARCH_PROFILE.experience.map((exp, i) => (
                    <motion.div
                      key={exp.company}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                      <span className="text-brand-text">{exp.role}</span>
                      <span className="text-brand-muted">@ {exp.company}</span>
                      <span className="text-brand-muted ml-auto">{exp.years}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {RESEARCH_PROFILE.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-brand-border px-2 py-0.5 text-[10px] text-brand-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CliTab({ active }: { active: boolean }) {
  const { displayText, isComplete } = useTypingAnimation(CLI_INPUT, active, 30);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (isComplete) {
      const t = setTimeout(() => setShowTable(true), 800);
      return () => clearTimeout(t);
    } else {
      setShowTable(false);
    }
  }, [isComplete]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x divide-brand-border h-[300px] overflow-hidden">
      <div className="p-5 bg-[#0D0D0D] rounded-bl-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">Terminal</span>
        </div>
        <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
          {displayText.split("\n").map((line, i) => (
            <div key={i}>
              <SyntaxLine text={line} type="terminal" />
            </div>
          ))}
          {!isComplete && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-brand-green">|</motion.span>
          )}
        </pre>
      </div>
      <div className="p-5 border-t md:border-t-0 border-brand-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">Output</span>
        </div>
        <AnimatePresence>
          {showTable && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-xs font-mono">
                <div className="flex text-brand-muted border-b border-brand-border pb-1 mb-2">
                  <span className="w-28">NAME</span>
                  <span className="flex-1">TITLE</span>
                  <span className="w-12 text-right">SCORE</span>
                </div>
                {CLI_RESULTS.map((r, i) => (
                  <motion.div
                    key={r.name}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 25 }}
                    className="flex py-1.5 hover:bg-brand-bg-elevated/50 rounded transition-colors"
                  >
                    <span className="w-28 text-brand-text truncate">{r.name}</span>
                    <span className="flex-1 text-brand-muted truncate">{r.title}</span>
                    <span className="w-12 text-right text-brand-green" style={{ fontVariantNumeric: "tabular-nums" }}>{r.score}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function McpTab({ active }: { active: boolean }) {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setShowChat(true), 800);
      return () => clearTimeout(t);
    } else {
      setShowChat(false);
    }
  }, [active]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x divide-brand-border h-[300px] overflow-hidden">
      <div className="p-5 overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">Config</span>
          <span className="text-xs font-mono text-brand-muted truncate">claude_desktop_config.json</span>
        </div>
        <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
          {MCP_CONFIG.split("\n").map((line, i) => (
            <div key={i}>
              <SyntaxLine text={line} type="json" />
            </div>
          ))}
        </pre>
      </div>
      <div className="p-5 border-t md:border-t-0 border-brand-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider">Claude Code</span>
          <span className="text-xs text-brand-green">connected</span>
        </div>
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {MCP_CHAT.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3, type: "spring", stiffness: 200, damping: 25 }}
                  className={`rounded-lg p-3 text-sm ${
                    msg.role === "user"
                      ? "bg-brand-bg ml-4"
                      : "bg-brand-bg-elevated mr-4"
                  }`}
                >
                  <p className="text-xs text-brand-muted mb-1">
                    {msg.role === "user" ? "You" : "Claude"}
                  </p>
                  <p className="text-brand-text text-sm">{msg.text}</p>
                  {"results" in msg && msg.results && (
                    <div className="mt-2 space-y-1.5">
                      {msg.results.map((r, j) => (
                        <motion.div
                          key={r.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + j * 0.1 }}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                          <span className="text-brand-text">{r.name}</span>
                          <span className="text-brand-muted">{r.title}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ApiPlayground({
  activeTab: controlledTab,
  onTabChange,
}: {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}) {
  const [internalTab, setInternalTab] = useState<Tab>("search");
  const activeTab = (controlledTab as Tab) ?? internalTab;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isInView) setIsActive(true);
  }, [isInView]);

  const handleTabClick = (tab: Tab) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="rounded-2xl bg-brand-bg-card overflow-hidden shadow-[0_0_0_1px_var(--brand-border),0_2px_8px_rgba(0,0,0,0.08)]"
      >
        <WindowChrome title="Happenstance API" className="py-3" />

        {/* Tab bar */}
        <div className="flex border-b border-brand-border px-2 sm:px-4 relative overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative px-3 sm:px-4 py-3 text-sm font-medium transition-colors shrink-0"
            >
              <span className={activeTab === tab.id ? "text-brand-text" : "text-brand-muted hover:text-brand-text"}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "search" && <SearchTab active={isActive && activeTab === "search"} />}
            {activeTab === "research" && <ResearchTab active={isActive && activeTab === "research"} />}
            {activeTab === "cli" && <CliTab active={isActive && activeTab === "cli"} />}
            {activeTab === "mcp" && <McpTab active={isActive && activeTab === "mcp"} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
