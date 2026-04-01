"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function CtaButton({
  children,
  href = "#",
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      className={cn(
        "inline-flex items-center rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-[#052E16]",
        "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(34,197,94,0.2)]",
        "hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_24px_rgba(34,197,94,0.25)]",
        "transition-shadow duration-200",
        className
      )}
    >
      {children}
    </motion.a>
  );
}
