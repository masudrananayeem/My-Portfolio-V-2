import { useEffect, useRef, type ReactNode } from "react";
import { fadeUpReveal } from "../../lib/gsap";

/** Rich scroll reveal used across the portfolio. Respects prefers-reduced-motion. */
export function SectionReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = fadeUpReveal(ref.current, ref.current);
    return () => {
      ctx.scrollTrigger?.kill();
      ctx.kill();
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
