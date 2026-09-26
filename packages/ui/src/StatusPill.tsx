import { cn } from "@nayeem/utils";

/** "SYSTEM ONLINE" / "AVAILABLE FOR WORK" style HUD indicator */
export function StatusPill({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-base-border bg-base-panel/60 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-foreground-muted",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
      </span>
      {label}
    </div>
  );
}
