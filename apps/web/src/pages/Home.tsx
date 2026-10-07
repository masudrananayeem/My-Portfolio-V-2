import { Hero } from "../components/sections/Hero";
import { TechMarquee } from "../components/sections/TechMarquee";
import { ProjectsPreview } from "../components/sections/ProjectsPreview";
import { GithubActivityPreview } from "../components/sections/GithubActivityPreview";
import { Container, SectionLabel, GlowCard, LinkButton } from "@nayeem/ui";
import { useSkills, useServices } from "../hooks/useFirestoreData";
import { SectionReveal } from "../components/common/SectionReveal";

export function Home() {
  const { data: skills } = useSkills();
  const { data: services } = useServices();

  return (
    <>
      <Hero />
      <SectionReveal><TechMarquee /></SectionReveal>

      {/* About preview */}
      <SectionReveal><section className="py-24">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel index="01" label="About" className="mb-6" />
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Full-stack engineer, AI/ML enthusiast, and researcher.</h2>
            <p className="mt-4 text-foreground-muted">
              Computer Science & Engineering student at Daffodil International University, building
              production web systems and exploring applied machine learning.
            </p>
            <LinkButton href="/about" variant="outline" className="mt-6 inline-flex">READ MORE</LinkButton>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(skills ?? []).slice(0, 4).map((s) => (
              <GlowCard key={s.id}>
                <p className="font-mono text-[11px] tracking-widest text-accent-cyan">{s.category.toUpperCase()}</p>
                <p className="mt-2 font-display text-sm font-semibold">{s.name}</p>
              </GlowCard>
            ))}
          </div>
        </Container>
      </section></SectionReveal>

      <SectionReveal><ProjectsPreview /></SectionReveal>

      {/* Services preview */}
      <SectionReveal><section className="py-24">
        <Container>
          <SectionLabel index="06" label="Services" className="mb-10" />
          <div className="grid gap-6 md:grid-cols-3">
            {(services ?? []).slice(0, 3).map((s) => (
              <GlowCard key={s.id}>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{s.description}</p>
              </GlowCard>
            ))}
          </div>
        </Container>
      </section></SectionReveal>

      <SectionReveal><GithubActivityPreview /></SectionReveal>
    </>
  );
}
