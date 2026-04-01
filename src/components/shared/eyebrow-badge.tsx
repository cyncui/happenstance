"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function EyebrowBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="flex justify-center mb-6">
      <span className="inline-flex items-center rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-medium font-mono uppercase tracking-wider text-brand-green">
        {children}
      </span>
    </motion.div>
  );
}
