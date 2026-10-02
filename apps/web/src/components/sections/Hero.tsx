import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { LinkButton, StatusPill, Container } from "@nayeem/ui";
import { useProfile } from "../../hooks/useFirestoreData";
import { SpecPanel } from "./SpecPanel";
import { CapabilitiesList } from "./CapabilitiesList";
import { TrustStats } from "./TrustStats";

export function Hero() {
  const { data: profile } = useProfile();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -40 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      frameRef.current,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  const name = "MASUD RANA NAYEEM";
  const avatarUrl = profile?.avatarUrl || "/profile-hero.png";

  return (
    <section className="relative overflow-hidden bg-grid pb-16 pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />

      {/* Three.js particle/network scene can be layered here later — see README TODOs */}

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: text + spec panel */}
          <div>
            <StatusPill label={profile?.availableForWork ? "AVAILABLE FOR WORK" : "SYSTEM ONLINE"} />

            <p className="mt-6 font-mono text-[11px] tracking-[0.3em] text-accent-purple">
              BUILDING DIGITAL SYSTEMS
            </p>

            <h1
              ref={titleRef}
              className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.3rem]"
              style={{ perspective: 800 }}
            >
              {name.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block whitespace-nowrap">
                  {word.split("").map((c, i) => (
                    <span key={i} className="char inline-block">{c}</span>
                  ))}
                  {wi < name.split(" ").length - 1 && "\u00A0"}
                </span>
              ))}
            </h1>

            <p className="mt-4 font-mono text-sm tracking-[0.2em] text-accent-cyan sm:text-base">
              {(profile?.roles ?? ["FULL STACK DEVELOPER", "AI / ML ENTHUSIAST", "RESEARCHER"]).join("  //  ")}
            </p>

            <p className="mt-6 max-w-xl text-foreground-muted">
              {profile?.bio ??
                "Building digital systems at the intersection of full-stack engineering and applied AI/ML — from production web platforms to research prototypes."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/projects" variant="primary">VIEW MY WORK</LinkButton>
              <LinkButton href={profile?.resumeUrl ?? "#"} variant="outline" target="_blank" rel="noreferrer">
                DOWNLOAD RESUME
              </LinkButton>
              <LinkButton href="/contact" variant="ghost">CONTACT ME</LinkButton>
            </div>

            <TrustStats />

            <div className="mt-10">
              <SpecPanel />
            </div>
          </div>

          {/* Right: framed photo + capabilities */}
          <div>
            <div ref={frameRef} className="group relative mx-auto max-w-sm">
              {/* glow backdrop */}
              <div className="absolute -inset-6 rounded-2xl bg-gradient-to-br from-accent-cyan/25 via-accent-purple/15 to-transparent opacity-80 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* available ribbon */}
              <div className="absolute -right-3 -top-3 z-20 rotate-3 rounded-full border border-accent-green/40 bg-base-near/90 px-3 py-1.5 font-mono text-[10px] tracking-widest text-accent-green shadow-lg backdrop-blur-sm">
                ● HIRE ME
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-base-border bg-base-panel/40 shadow-[0_20px_60px_-15px_rgba(0,229,255,0.25)]">
                <img
                  src={avatarUrl}
                  alt="Masud Rana Nayeem — Full Stack Developer"
                  className="aspect-[4/5] w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* bottom gradient blend — softens the photo edge into the panel */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base-panel to-transparent" />

                {/* scan line */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute inset-x-0 h-px animate-scan bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
                </div>

                {/* HUD corners */}
                <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent-cyan/70" />
                <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent-cyan/70" />
                <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-accent-cyan/70" />
                <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent-cyan/70" />
              </div>

              <div className="absolute -bottom-4 left-1/2 w-[85%] -translate-x-1/2 rounded-lg border border-base-border bg-base-near px-4 py-2 text-center font-mono text-[10px] tracking-widest text-foreground-muted shadow-lg">
                MASUD_RANA_NAYEEM.exe
              </div>
            </div>

            <div className="mt-12">
              <CapabilitiesList />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
