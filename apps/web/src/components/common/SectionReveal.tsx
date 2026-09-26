import { useEffect, useRef, type ReactNode } from "react";
import { fadeUpReveal } from "../../lib/gsap";

/** Wrap any section content to fade+rise into view on scroll (GSAP ScrollTrigger). */
export function SectionReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = fadeUpReveal(ref.current, ref.current);
    return () => {
      ctx.scrollTrigger?.kill();
      ctx.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
