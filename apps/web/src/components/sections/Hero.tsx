import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { LinkButton, StatusPill, Container } from "@nayeem/ui";
import { useProfile } from "../../hooks/useFirestoreData";

export function Hero() {
  const { data: profile } = useProfile();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -40 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const name = "MASUD RANA NAYEEM";

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />

      {/* Placeholder for Hero3D (Three.js particle/network scene) — see components/sections/Hero3D.tsx */}

      <Container className="relative z-10 py-24">
        <StatusPill label={profile?.availableForWork ? "AVAILABLE FOR WORK" : "SYSTEM ONLINE"} />

        <h1
          ref={titleRef}
          className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          style={{ perspective: 800 }}
        >
          {name.split("").map((c, i) => (
            <span key={i} className="char inline-block">{c === " " ? "\u00A0" : c}</span>
          ))}
        </h1>

        <p className="mt-4 font-mono text-sm tracking-[0.2em] text-accent-cyan sm:text-base">
          {(profile?.roles ?? ["FULL STACK DEVELOPER", "AI / ML ENTHUSIAST", "RESEARCHER"]).join("  //  ")}
        </p>

        <p className="mt-6 max-w-xl text-foreground-muted">
          {profile?.bio ??
            "Building digital systems at the intersection of full-stack engineering and applied AI/ML — from production web platforms to research prototypes."}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <LinkButton href="/projects" variant="primary">VIEW MY WORK</LinkButton>
          <LinkButton href={profile?.resumeUrl ?? "#"} variant="outline" target="_blank" rel="noreferrer">
            DOWNLOAD RESUME
          </LinkButton>
          <LinkButton href="/contact" variant="ghost">CONTACT ME</LinkButton>
        </div>
      </Container>
    </section>
  );
}
