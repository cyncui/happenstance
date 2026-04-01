"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const TEAM_MEMBERS = [
  { name: "Sarah Chen", role: "Engineering", initials: "SC", color: "bg-emerald-500" },
  { name: "Alex Rivera", role: "Design", initials: "AR", color: "bg-sky-500" },
  { name: "Jordan Park", role: "Product", initials: "JP", color: "bg-violet-500" },
  { name: "Maya Singh", role: "Data Science", initials: "MS", color: "bg-amber-500" },
  { name: "Chris Wu", role: "Engineering", initials: "CW", color: "bg-rose-500" },
  { name: "Taylor Kim", role: "Marketing", initials: "TK", color: "bg-cyan-500" },
];

type DemoState = "input" | "scanning" | "roster" | "success";

const TIMINGS = {
  input: 1500,
  scanning: 2000,
  roster: 2500,
  success: 2500,
  pause: 2000,
};

export function TeamOnboardingDemo() {
  const [state, setState] = useState<DemoState>("input");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) setStarted(true);
  }, [isInView, started]);

  useEffect(() => {
    if (!started) return;

    const cycle = () => {
      setState("input");
      const t1 = setTimeout(() => setState("scanning"), TIMINGS.input);
      const t2 = setTimeout(() => setState("roster"), TIMINGS.input + TIMINGS.scanning);
      const t3 = setTimeout(() => setState("success"), TIMINGS.input + TIMINGS.scanning + TIMINGS.roster);
      const totalDuration = TIMINGS.input + TIMINGS.scanning + TIMINGS.roster + TIMINGS.success + TIMINGS.pause;
      const t4 = setTimeout(cycle, totalDuration);
      return [t1, t2, t3, t4];
    };

    const timers = cycle();
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <div ref={ref} className="relative">
      <div className="rounded-2xl bg-brand-bg-card overflow-hidden shadow-[0_0_0_1px_var(--brand-border),0_2px_8px_rgba(0,0,0,0.08)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-brand-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-brand-muted font-mono ml-2">Happenstance</span>
        </div>

        {/* Demo content */}
        <div className="p-6 min-h-[320px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {state === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="space-y-4"
              >
                <p className="text-sm text-brand-muted">Set up your team workspace</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center rounded-lg border border-brand-border bg-brand-bg px-4 py-2.5">
                    <span className="text-brand-muted text-sm">team</span>
                    <span className="text-brand-green font-mono text-sm ml-1">@acme.com</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg bg-brand-green px-4 py-2.5 text-sm font-medium text-[#052E16] whitespace-nowrap"
                  >
                    Set up team
                  </motion.button>
                </div>
                <p className="text-xs text-brand-muted">
                  Anyone with an @acme.com email can join automatically
                </p>
              </motion.div>
            )}

            {state === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Loader2 size={32} className="text-brand-green" />
                </motion.div>
                <div className="text-center">
                  <p className="text-sm text-brand-text">Finding team members...</p>
                  <p className="text-xs text-brand-muted mt-1">Scanning @acme.com domain</p>
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
            )}

            {state === "roster" && (
              <motion.div
                key="roster"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-2"
              >
                <p className="text-xs text-brand-muted mb-3">
                  Found {TEAM_MEMBERS.length} team members
                </p>
                {TEAM_MEMBERS.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      delay: i * 0.08,
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-brand-bg-elevated transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-xs font-semibold text-white`}
                    >
                      {member.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-brand-text truncate">{member.name}</p>
                      <p className="text-xs text-brand-muted">{member.role}</p>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.08 + 0.3, type: "spring", stiffness: 300 }}
                    >
                      <Check size={14} className="text-brand-green" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {state === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex flex-col items-center gap-4 py-6"
              >
                {/* Green particle burst */}
                <div className="relative">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i * Math.PI * 2) / 12) * 60,
                        y: Math.sin((i * Math.PI * 2) / 12) * 60,
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 0.8, delay: i * 0.02 }}
                      className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-brand-green"
                    />
                  ))}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center"
                  >
                    <Check size={32} className="text-brand-green" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-brand-text">
                    Acme team created
                  </p>
                  <p className="text-sm text-brand-muted mt-1">
                    {TEAM_MEMBERS.length} members joined instantly
                  </p>
                </div>
                <div className="flex -space-x-2 mt-2">
                  {TEAM_MEMBERS.map((member, i) => (
                    <motion.div
                      key={member.name}
                      initial={{ scale: 0, x: -8 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 300 }}
                      className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-xs font-semibold text-white border-2 border-brand-bg-card`}
                    >
                      {member.initials}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
