import { cn } from "@nayeem/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  direction?: "left" | "right";
  className?: string;
}

/** Infinite horizontal marquee — used for the moving tech-stack section */
export function Marquee({ items, direction = "left", className }: MarqueeProps) {
  const anim = direction === "left" ? "animate-marquee" : "animate-marquee-reverse";
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div className={cn("flex shrink-0 gap-4 pr-4", anim, "group-hover:[animation-play-state:paused]")}>
        {items}
      </div>
      <div
        className={cn("flex shrink-0 gap-4 pr-4", anim, "group-hover:[animation-play-state:paused]")}
        aria-hidden="true"
      >
        {items}
      </div>
    </div>
  );
}
