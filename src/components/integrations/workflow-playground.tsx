"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import { WindowChrome } from "@/components/shared/window-chrome";

/* ── Data ─────────────────────────────────────────────── */

const SLACK_MESSAGE = `who knows someone at OpenAI working on developer tools?`;

const SLACK_RESULTS = [
  { name: "Sarah Chen", title: "DevRel @ OpenAI", mutual: "Alex Rivera" },
  { name: "Jordan Lee", title: "API Platform @ OpenAI", mutual: "Priya Patel" },
  { name: "Nina Zhao", title: "SDK Engineer @ OpenAI", mutual: "Kim Tran" },
];

const EMAIL_SUBJECT = "Fwd: Looking for intros to Series A investors in fintech";
const EMAIL_FROM = "you@company.com";
const EMAIL_TO = "agent@happenstance.ai";
const EMAIL_BODY = `Hey team, we're raising our Series A and looking for warm intros to fintech-focused investors. Any connections would be hugely appreciated.`;

const EMAIL_RESULTS = [
  { name: "David Park", title: "Partner @ a16z Fintech", mutual: "Chris Lee", score: 0.96 },
  { name: "Elena Kovacs", title: "GP @ Ribbit Capital", mutual: "Sarah Kim", score: 0.93 },
  { name: "James Wu", title: "Principal @ QED Investors", mutual: "Mark Chen", score: 0.89 },
];

/* ── Slack window ─────────────────────────────────────── */

function SlackWindow({ active }: { active: boolean }) {
  const { displayText, isComplete } = useTypingAnimation(SLACK_MESSAGE, active, 30);
  const [showResults, setShowResults] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (isComplete) {
      setShowTyping(true);
      const t = setTimeout(() => {
        setShowTyping(false);
        setShowResults(true);
      }, 1400);
      return () => clearTimeout(t);
    } else {
      setShowResults(false);
      setShowTyping(false);
    }
  }, [isComplete]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex w-[180px] shrink-0 flex-col border-r border-brand-border bg-brand-bg/50 p-3 gap-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-5 h-5 rounded bg-brand-green/20 flex items-center justify-center">
            <span className="text-[9px] font-bold text-brand-green">H</span>
          </div>
          <span className="text-xs font-semibold text-brand-text truncate">Acme Corp</span>
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider px-1 mb-1">Channels</p>
          <div className="rounded px-2 py-1 bg-brand-bg-elevated text-xs text-brand-text"># general</div>
          <div className="rounded px-2 py-1 text-xs text-brand-muted"># engineering</div>
          <div className="rounded px-2 py-1 text-xs text-brand-muted"># sales</div>
          <div className="rounded px-2 py-1 text-xs text-brand-muted"># recruiting</div>
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider px-1 mb-1">Apps</p>
          <div className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-brand-green">
            <div className="w-2 h-2 rounded-full bg-brand-green" />
            Happenstance
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-4 pb-2 border-b border-brand-border">
          <span className="text-sm font-semibold text-brand-text"># general</span>
        </div>

        <div className="space-y-4">
          {/* User message */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-[10px] font-bold text-sky-400 shrink-0">
              Y
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-[13px] font-semibold text-brand-text">You</span>
                <span className="text-[10px] text-brand-muted">11:42 AM</span>
              </div>
              <p className="text-[13px] text-brand-text leading-relaxed">
                <span className="bg-[#1D4ED8]/20 text-[#60A5FA] rounded-[3px] px-0.5 font-medium">@happenstance</span>{" "}
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
              </p>
            </div>
          </div>

          {/* Typing indicator */}
          <AnimatePresence mode="wait">
            {showTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-green/20 flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 rounded-full bg-brand-green/50" />
                </div>
                <div className="flex items-center gap-1 pt-2.5">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
                </div>
              </motion.div>
            )}

            {/* Bot response */}
            {showResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-green/20 flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 rounded-full bg-brand-green/50" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-[13px] font-semibold text-brand-green">Happenstance</span>
                    <span className="text-[9px] bg-brand-green/10 text-brand-green rounded px-1 py-px uppercase tracking-wider font-medium">app</span>
                    <span className="text-[10px] text-brand-muted">11:42 AM</span>
                  </div>
                  <p className="text-[13px] text-brand-text mb-2.5">I found 3 connections to OpenAI developer tools:</p>
                  <div className="rounded-lg border border-brand-border overflow-hidden">
                    {SLACK_RESULTS.map((result, i) => (
                      <motion.div
                        key={result.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.12 }}
                        className={`flex items-center gap-2.5 px-3 py-2 ${i > 0 ? "border-t border-brand-border" : ""}`}
                      >
                        <div className="w-7 h-7 rounded-full bg-brand-green/15 flex items-center justify-center text-[9px] font-semibold text-brand-green shrink-0">
                          {result.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] text-brand-text font-medium truncate">{result.name}</p>
                          <p className="text-[11px] text-brand-muted truncate">{result.title}</p>
                        </div>
                        <span className="text-[10px] text-brand-muted shrink-0">via {result.mutual}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Email window ─────────────────────────────────────── */

function EmailWindow({ active }: { active: boolean }) {
  const [phase, setPhase] = useState<"composing" | "sending" | "results">("composing");
  const { displayText, isComplete } = useTypingAnimation(EMAIL_BODY, active, 20);

  useEffect(() => {
    if (!active) {
      setPhase("composing");
      return;
    }
    if (isComplete) {
      setPhase("sending");
      const t = setTimeout(() => setPhase("results"), 1600);
      return () => clearTimeout(t);
    }
  }, [isComplete, active]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex w-[160px] shrink-0 flex-col border-r border-brand-border bg-brand-bg/50 p-3 gap-1">
        <div className="rounded px-2 py-1.5 text-xs text-brand-muted flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" opacity="0.5"><rect x="1" y="2.5" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M1 4.5l5 3 5-3" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
          Inbox
        </div>
        <div className="rounded px-2 py-1.5 bg-brand-bg-elevated text-xs text-brand-text flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" opacity="0.5"><path d="M6 1l1.5 3H11L8 6.5l1 3.5L6 8l-3 2 1-3.5L1 4h3.5z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
          Sent
        </div>
        <div className="rounded px-2 py-1.5 text-xs text-brand-muted flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" opacity="0.5"><rect x="2" y="2" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
          Drafts
        </div>
      </div>

      {/* Email content */}
      <div className="flex-1 p-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {phase !== "results" ? (
            <motion.div
              key="compose"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-brand-muted w-10 shrink-0">From</span>
                  <span className="text-brand-text">{EMAIL_FROM}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-brand-muted w-10 shrink-0">To</span>
                  <span className="text-brand-green font-medium">{EMAIL_TO}</span>
                </div>
                <div className="flex items-center gap-2 text-xs pb-3 border-b border-brand-border">
                  <span className="text-brand-muted w-10 shrink-0">Subj</span>
                  <span className="text-brand-text font-medium truncate">{EMAIL_SUBJECT}</span>
                </div>
              </div>
              <p className="text-[13px] text-brand-text leading-relaxed">
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
              </p>
              {phase === "sending" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-brand-muted pt-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-3.5 h-3.5 border-[1.5px] border-brand-green/30 border-t-brand-green rounded-full"
                  />
                  Searching your network...
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-brand-muted w-10 shrink-0">From</span>
                  <span className="text-brand-green font-medium">{EMAIL_TO}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-brand-muted w-10 shrink-0">To</span>
                  <span className="text-brand-text">{EMAIL_FROM}</span>
                </div>
                <div className="flex items-center gap-2 text-xs pb-3 border-b border-brand-border">
                  <span className="text-brand-muted w-10 shrink-0">Subj</span>
                  <span className="text-brand-text font-medium truncate">Re: {EMAIL_SUBJECT}</span>
                </div>
              </div>
              <p className="text-[13px] text-brand-text">Here are your top matches for fintech investors:</p>
              <div className="space-y-2">
                {EMAIL_RESULTS.map((result, i) => (
                  <motion.div
                    key={result.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 25 }}
                    className="flex items-center gap-2.5 rounded-lg bg-brand-bg p-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-green/15 flex items-center justify-center text-[9px] font-semibold text-brand-green shrink-0">
                      {result.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] text-brand-text font-medium truncate">{result.name}</p>
                      <p className="text-[11px] text-brand-muted truncate">{result.title}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-8 h-1 rounded-full bg-brand-border overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.score * 100}%` }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                          className="h-full rounded-full bg-brand-green"
                        />
                      </div>
                      <span className="text-[9px] font-mono text-brand-green" style={{ fontVariantNumeric: "tabular-nums" }}>{result.score}</span>
                    </div>
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

/* ── Playground container ─────────────────────────────── */

const SLACK_TITLE = (
  <span className="flex items-center justify-center gap-1.5">
    <svg width="14" height="14" viewBox="0 0 40 40" fill="none" className="shrink-0">
      <path d="M9.29 24.45a3.57 3.57 0 1 1-3.57-3.57h3.57v3.57Zm1.79 0a3.57 3.57 0 1 1 7.14 0v8.93a3.57 3.57 0 1 1-7.14 0v-8.93Z" fill="#E01E5A" />
      <path d="M14.65 9.29a3.57 3.57 0 1 1 3.57-3.57v3.57h-3.57Zm0 1.79a3.57 3.57 0 1 1 0 7.14H5.72a3.57 3.57 0 1 1 0-7.14h8.93Z" fill="#36C5F0" />
      <path d="M29.81 14.65a3.57 3.57 0 1 1 3.57 3.57h-3.57v-3.57Zm-1.79 0a3.57 3.57 0 1 1-7.14 0V5.72a3.57 3.57 0 1 1 7.14 0v8.93Z" fill="#2EB67D" />
      <path d="M24.45 29.81a3.57 3.57 0 1 1-3.57 3.57v-3.57h3.57Zm0-1.79a3.57 3.57 0 1 1 0-7.14h8.93a3.57 3.57 0 1 1 0 7.14h-8.93Z" fill="#ECB22E" />
    </svg>
    Slack
  </span>
);

const EMAIL_TITLE = (
  <span className="flex items-center justify-center gap-1.5">
    <svg width="14" height="14" viewBox="0 0 40 40" fill="none" className="shrink-0">
      <rect x="4" y="8" width="32" height="24" rx="4" fill="#3B82F6" />
      <path d="M4 14l16 10 16-10" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    </svg>
    Email Agent
  </span>
);

export function WorkflowPlayground() {
  const [focused, setFocused] = useState<"slack" | "email">("slack");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isInView) setIsActive(true);
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {/* Mobile: tab switcher + single window */}
        <div className="md:hidden">
          <div className="flex gap-2 mb-3">
            {(["slack", "email"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFocused(tab)}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-medium transition-colors ${
                  focused === tab
                    ? "bg-brand-bg-card text-brand-text shadow-[0_0_0_1px_var(--brand-border)]"
                    : "text-brand-muted"
                }`}
              >
                {tab === "slack" ? SLACK_TITLE : EMAIL_TITLE}
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-brand-bg-card overflow-hidden shadow-[0_0_0_1px_var(--brand-border),0_2px_8px_rgba(0,0,0,0.08)] h-[400px]">
            <WindowChrome title={focused === "slack" ? SLACK_TITLE : EMAIL_TITLE} />
            <AnimatePresence mode="wait">
              <motion.div
                key={focused}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="h-[calc(100%-37px)]"
              >
                {focused === "slack" ? (
                  <SlackWindow active={isActive && focused === "slack"} />
                ) : (
                  <EmailWindow active={isActive && focused === "email"} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop: overlapping windows */}
        <div className="hidden md:block relative h-[400px]">
          {/* Slack window */}
          <motion.div
            onClick={() => setFocused("slack")}
            animate={{
              zIndex: focused === "slack" ? 20 : 10,
              scale: focused === "slack" ? 1 : 0.97,
              x: focused === "slack" ? 0 : -8,
              y: focused === "slack" ? 0 : 8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 w-[62%] h-full rounded-2xl bg-brand-bg-card overflow-hidden cursor-pointer"
            style={{
              boxShadow: focused === "slack"
                ? "0 0 0 1px var(--brand-border), 0 8px 32px rgba(0,0,0,0.3)"
                : "0 0 0 1px var(--brand-border), 0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <WindowChrome muted={focused !== "slack"} title={SLACK_TITLE} />
            <SlackWindow active={isActive && focused === "slack"} />
          </motion.div>

          {/* Email window */}
          <motion.div
            onClick={() => setFocused("email")}
            animate={{
              zIndex: focused === "email" ? 20 : 10,
              scale: focused === "email" ? 1 : 0.97,
              x: focused === "email" ? 0 : 8,
              y: focused === "email" ? 0 : 8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 w-[62%] h-full rounded-2xl bg-brand-bg-card overflow-hidden cursor-pointer"
            style={{
              boxShadow: focused === "email"
                ? "0 0 0 1px var(--brand-border), 0 8px 32px rgba(0,0,0,0.3)"
                : "0 0 0 1px var(--brand-border), 0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <WindowChrome muted={focused !== "email"} title={EMAIL_TITLE} />
            <EmailWindow active={isActive && focused === "email"} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
