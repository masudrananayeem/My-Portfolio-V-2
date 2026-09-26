import { Container, SectionLabel, GlowCard } from "@nayeem/ui";
import { useProfile } from "../hooks/useFirestoreData";

export function About() {
  const { data: profile } = useProfile();

  return (
    <Container className="py-24">
      <SectionLabel index="01" label="About" className="mb-6" />
      <h1 className="font-display text-4xl font-bold">Who I Am</h1>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-foreground-muted leading-relaxed">
            {profile?.bio ??
              "Aspiring full-stack developer and researcher, focused on building responsive, production-grade web systems and exploring applied machine learning. Currently pursuing a B.Sc. in Computer Science & Engineering."}
          </p>
        </div>
        <GlowCard>
          <p className="font-mono text-xs tracking-widest text-accent-cyan">EDUCATION</p>
          <p className="mt-2 font-semibold">{profile?.education ?? "B.Sc. in Computer Science & Engineering"}</p>
          <p className="text-sm text-foreground-muted">{profile?.university ?? "Daffodil International University"}</p>
        </GlowCard>
      </div>

      {/* Animated timeline placeholder — populated from experience/education data via GSAP ScrollTrigger */}
      <div className="mt-16">
        <SectionLabel index="01.1" label="Journey" className="mb-6" />
        <div className="border-l border-base-border pl-6">
          <p className="text-sm text-foreground-faint">
            Timeline renders from the same data as the Experience page — see components/sections (to build next).
          </p>
        </div>
      </div>
    </Container>
  );
}
