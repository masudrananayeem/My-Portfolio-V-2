import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Premium fade/slide/blur reveal used across the page. */
export function fadeUpReveal(target: gsap.TweenTarget, trigger: Element, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 58, filter: "blur(10px)", scale: 0.985 },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      duration: 1.05,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger, start: "top 86%", once: true },
    }
  );
}
