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
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.fromTo(chars, { opacity: 0, y: 46, rotateX: -50 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.025 }, 0.15);
    intro.fromTo(frameRef.current, { opacity: 0, x: 70, scale: 0.9, rotateY: -8 }, { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1.15 }, 0.2);
    intro.fromTo(".hero-copy-reveal", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }, 0.35);
    return () => { intro.kill(); };
  }, []);

  const name = "MASUD RANA NAYEEM";
  const avatarUrl = profile?.avatarUrl || "/profile-hero.png";
  const roles = profile?.roles ?? ["FULL STACK DEVELOPER", "AI / ML ENTHUSIAST", "RESEARCHER"];

  return (
    <section className="relative overflow-hidden bg-grid pb-16 pt-20 sm:pt-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />
      <Container className="relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="order-2 min-w-0 lg:order-1">
            <div className="hero-copy-reveal"><StatusPill label={profile?.availableForWork ? "AVAILABLE FOR WORK" : "SYSTEM ONLINE"} /></div>
            <p className="hero-copy-reveal mt-6 font-mono text-[11px] tracking-[0.3em] text-accent-purple">BUILDING DIGITAL SYSTEMS</p>
            <h1 ref={titleRef} className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.3rem]" style={{ perspective: 800 }}>
              {name.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block whitespace-nowrap">
                  {word.split("").map((c, i) => <span key={i} className="char inline-block">{c}</span>)}
                  {wi < name.split(" ").length - 1 && "\u00A0"}
                </span>
              ))}
            </h1>
            <p className="hero-copy-reveal mt-4 max-w-full break-words font-mono text-xs leading-6 tracking-[0.14em] text-accent-cyan sm:text-base sm:tracking-[0.2em]">{roles.join("  //  ")}</p>
            <p className="hero-copy-reveal mt-6 max-w-xl text-foreground-muted">{profile?.bio ?? "Building digital systems at the intersection of full-stack engineering and applied AI/ML — from production web platforms to research prototypes."}</p>
            <div className="hero-copy-reveal mt-8 flex flex-wrap gap-4">
              <LinkButton href="/projects" variant="primary">VIEW MY WORK</LinkButton>
              <LinkButton href={profile?.resumeUrl ?? "#"} variant="outline" target="_blank" rel="noreferrer">DOWNLOAD RESUME</LinkButton>
              <LinkButton href="/contact" variant="ghost">CONTACT ME</LinkButton>
            </div>
            <div className="hero-copy-reveal"><TrustStats /></div>
            <div className="hero-copy-reveal mt-10"><SpecPanel /></div>
            <div className="mt-10 lg:hidden"><CapabilitiesList /></div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div ref={frameRef} className="group relative mx-auto w-full max-w-[17.5rem] sm:max-w-sm">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-accent-cyan/12 via-accent-purple/8 to-transparent opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100 dark:opacity-70" />
              <div className="relative overflow-hidden rounded-2xl border border-base-border bg-base-panel/40 shadow-[0_18px_42px_-24px_rgb(15_23_42/0.28)] dark:shadow-[0_20px_52px_-28px_rgb(0_229_255/0.22)]">
                <img src={avatarUrl} alt="Masud Rana Nayeem — Full Stack Developer" className="aspect-[4/5] w-full object-cover opacity-95 transition-transform duration-1000 ease-out group-hover:scale-[1.035]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-base-panel/90 to-transparent" />
                <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute inset-x-0 h-px animate-scan bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-70" /></div>
                <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent-cyan/70" />
                <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent-cyan/70" />
                <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-accent-cyan/70" />
                <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent-cyan/70" />
              </div>

              <div className="absolute -bottom-5 left-1/2 z-20 w-[88%] -translate-x-1/2 rounded-xl border border-base-border bg-base-near/95 px-4 py-3 text-center shadow-[0_12px_30px_-18px_rgb(15_23_42/0.28)] backdrop-blur-sm dark:shadow-black/20">
                <p className="font-display text-sm font-semibold tracking-[0.12em] text-foreground">MASUD RANA NAYEEM</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.16em] text-foreground-muted">FULL STACK DEVELOPER · AI / ML · RESEARCH</p>
              </div>
            </div>
            <div className="mt-16 hidden lg:block"><CapabilitiesList /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
