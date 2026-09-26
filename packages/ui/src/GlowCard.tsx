import { cn } from "@nayeem/utils";
import type { HTMLAttributes } from "react";

/** Panel with a subtle border + hover glow — base building block for project/skill cards */
export function GlowCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-base-border bg-base-panel/60 backdrop-blur-sm p-6",
        "transition-all duration-300 hover:border-accent-cyan/50 hover:-translate-y-1",
        "hover:shadow-[0_0_30px_rgba(0,229,255,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
