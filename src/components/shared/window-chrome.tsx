import { cn } from "@/lib/utils";

export function WindowChrome({
  title,
  muted,
  className,
}: {
  title?: React.ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 px-4 py-2.5 border-b border-brand-border", className)}>
      <div className="flex gap-1.5">
        <div className={`w-2.5 h-2.5 rounded-full ${muted ? "bg-brand-border" : "bg-[#FF5F57]"}`} />
        <div className={`w-2.5 h-2.5 rounded-full ${muted ? "bg-brand-border" : "bg-[#FEBC2E]"}`} />
        <div className={`w-2.5 h-2.5 rounded-full ${muted ? "bg-brand-border" : "bg-[#28C840]"}`} />
      </div>
      {title && (
        <div className="flex-1 text-center text-xs text-brand-muted font-medium truncate">
          {title}
        </div>
      )}
      {title && <div className="w-[52px]" />}
    </div>
  );
}
