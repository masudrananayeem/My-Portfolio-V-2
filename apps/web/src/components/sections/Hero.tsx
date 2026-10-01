import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { LinkButton, StatusPill, Container } from "@nayeem/ui";
import { useProfile } from "../../hooks/useFirestoreData";
import { SpecPanel } from "./SpecPanel";
import { CapabilitiesList } from "./CapabilitiesList";

export function Hero() {
  const { data: profile } = useProfile();

  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll(".hero-char");

      const introItems = contentRef.current?.querySelectorAll(".hero-reveal");

      if (chars?.length) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 34, rotateX: -55 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.025,
            ease: "power3.out",
            delay: 0.15,
          },
        );
      }

      if (introItems?.length) {
        gsap.fromTo(
          introItems,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.35,
          },
        );
      }

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.96, x: 24 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.25,
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const name = profile?.name || "MASUD RANA NAYEEM";
  const avatarUrl = profile?.avatarUrl || "/profile-hero.png";
  const roles = profile?.roles ?? [
    "FULL-STACK ENGINEER",
    "AI / ML",
    "RESEARCH",
  ];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden border-b border-base-border bg-grid pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32"
    >
      {/* Ambient lighting — deliberately subtle so the content stays premium */}
      <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-80" />
      <div className="pointer-events-none absolute left-[42%] top-1/4 h-72 w-72 rounded-full bg-accent-cyan/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent-purple/5 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)] lg:gap-16 xl:gap-20">
          {/* ───────────────────────── LEFT: POSITIONING ───────────────────────── */}
          <div ref={contentRef} className="min-w-0">
            <div className="hero-reveal">
              <StatusPill
                label={
                  profile?.availableForWork
                    ? "AVAILABLE FOR SELECTED OPPORTUNITIES"
                    : "OPEN TO COLLABORATION"
                }
              />
            </div>

            <p className="hero-reveal mt-7 font-mono text-[10px] font-medium uppercase tracking-[0.34em] text-accent-purple sm:text-[11px]">
              Software Engineering · Applied AI/ML · Research
            </p>

            <h1
              ref={titleRef}
              className="mt-4 max-w-4xl font-display text-[2.65rem] font-bold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-5xl md:text-[3.65rem] lg:text-[4.05rem] xl:text-[4.35rem]"
              style={{ perspective: 900 }}
            >
              {name.split(" ").map((word, wi) => (
                <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, i) => (
                    <span
                      key={`${char}-${i}`}
                      className="hero-char inline-block"
                    >
                      {char}
                    </span>
                  ))}
                  {wi < name.split(" ").length - 1 && "\u00A0"}
                </span>
              ))}
            </h1>

            <div className="hero-reveal mt-6 max-w-2xl">
              <p className="font-mono text-sm font-medium leading-7 tracking-[0.12em] text-accent-cyan sm:text-base">
                {roles.join("  /  ")}
              </p>

              <p className="mt-5 text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
                I design and build reliable digital products — from polished
                full-stack web applications to practical AI/ML and research
                prototypes.
              </p>

              <p className="mt-3 max-w-xl text-sm leading-6 text-foreground-muted/80">
                Focused on clean architecture, thoughtful UX, maintainable
                code, and shipping work that creates measurable value.
              </p>
            </div>

            {/* Hiring-oriented CTAs */}
            <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <LinkButton href="/projects" variant="primary">
                EXPLORE MY WORK
              </LinkButton>

              <LinkButton
                href={profile?.resumeUrl ?? "#"}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                VIEW RESUME
              </LinkButton>

              <LinkButton href="/contact" variant="ghost">
                LET&apos;S TALK
              </LinkButton>
            </div>

            {/* Small proof strip: avoids unsupported vanity metrics */}
            <div className="hero-reveal mt-9 grid max-w-2xl grid-cols-1 border-y border-base-border/80 py-4 sm:grid-cols-3 sm:divide-x sm:divide-base-border/80">
              <div className="py-2 sm:px-4 sm:first:pl-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground-muted">
                  Approach
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Product-minded
                </p>
              </div>

              <div className="py-2 sm:px-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground-muted">
                  Engineering
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Full-stack
                </p>
              </div>

              <div className="py-2 sm:px-4 sm:last:pr-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground-muted">
                  Mindset
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Research-driven
                </p>
              </div>
            </div>

            <div className="hero-reveal mt-8">
              <SpecPanel />
            </div>
          </div>

          {/* ───────────────────────── RIGHT: PERSONAL BRAND ───────────────────────── */}
          <div className="min-w-0 lg:pt-4">
            <div ref={photoRef} className="group relative mx-auto max-w-[430px]">
              {/* soft premium halo */}
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent-cyan/15 via-accent-purple/10 to-transparent blur-3xl" />

              <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-base-panel/60 shadow-2xl shadow-black/30">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                <img
                  src={avatarUrl}
                  alt={`${name} — Full-stack developer and AI/ML researcher`}
                  className="aspect-[4/5] w-full object-cover object-top opacity-95 grayscale-[8%] transition duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-100"
                />

                {/* cinematic scan line */}
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                  <div className="absolute inset-x-0 h-px animate-scan bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent" />
                </div>

                {/* restrained HUD corners */}
                <span className="absolute left-0 top-0 z-30 h-7 w-7 border-l border-t border-accent-cyan/80" />
                <span className="absolute right-0 top-0 z-30 h-7 w-7 border-r border-t border-accent-cyan/80" />
                <span className="absolute bottom-0 left-0 z-30 h-7 w-7 border-b border-l border-accent-cyan/80" />
                <span className="absolute bottom-0 right-0 z-30 h-7 w-7 border-b border-r border-accent-cyan/80" />

                {/* identity plate */}
                <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/60">
                      Portfolio / 2026
                    </p>
                    <p className="mt-1 text-sm font-semibold tracking-wide text-white">
                      MASUD RANA NAYEEM
                    </p>
                  </div>

                  <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[9px] tracking-widest text-white/70 backdrop-blur">
                    MRN
                  </span>
                </div>
              </div>

              {/* availability signal */}
              <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-full border border-base-border bg-base-near/95 px-3 py-2 shadow-xl sm:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
                  Building / Shipping
                </span>
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
