"use client";

import { cn } from "@/lib/utils";

/**
 * Wraps a section in the visible grid system.
 * Adds left/right vertical border rails and a top horizontal line.
 * Content sits inside the bordered container.
 */
export function GridSection({
  children,
  className,
  noBorderTop,
}: {
  children: React.ReactNode;
  className?: string;
  noBorderTop?: boolean;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div
        className={cn(
          "border-x border-brand-grid",
          !noBorderTop && "border-t border-brand-grid",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * The bottom cap of the grid — closes off the last section.
 */
export function GridEnd() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="border-x border-b border-brand-grid h-8" />
    </div>
  );
}
