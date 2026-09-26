import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Standard fade-up reveal used across section headings/cards */
export function fadeUpReveal(target: gsap.TweenTarget, trigger: Element, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger, start: "top 85%" },
    }
  );
}
