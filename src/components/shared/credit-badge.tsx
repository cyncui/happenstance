import { cn } from "@/lib/utils";

export function CreditBadge({
  credits,
  className,
}: {
  credits: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-green/15 px-2.5 py-0.5 text-xs font-medium text-brand-green",
        className
      )}
    >
      {credits} credit{credits !== 1 ? "s" : ""}
    </span>
  );
}
