"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";

export function SectionWrapper({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("px-8 md:px-12 py-24 md:py-32", className)}
    >
      {children}
    </motion.section>
  );
}
