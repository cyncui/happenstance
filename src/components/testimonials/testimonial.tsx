"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import Image from "next/image";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image?: string;
}

export function Testimonial({ quote, name, title, image }: TestimonialProps) {
  return (
    <SectionWrapper className="mx-auto max-w-3xl py-16 md:py-16">
      <motion.div variants={fadeUp} className="text-center">
        <blockquote className="text-lg md:text-xl font-serif italic text-brand-muted leading-relaxed">
          {quote}
        </blockquote>
        <div className="flex items-center justify-center gap-3 mt-6">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border border-brand-border"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-bg-card border border-brand-border flex items-center justify-center text-xs font-semibold text-brand-muted">
              {name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}
          <div className="text-left">
            <p className="text-sm font-medium text-brand-text">{name}</p>
            <p className="text-xs text-brand-muted">{title}</p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
