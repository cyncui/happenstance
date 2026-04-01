"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

export function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -4,
        boxShadow: "0 0 0 1px rgba(34,197,94,0.2), 0 4px 24px rgba(34,197,94,0.08)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      className={cn(
        "rounded-2xl bg-brand-bg-card p-6",
        "shadow-[0_0_0_1px_var(--brand-border),0_1px_2px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
