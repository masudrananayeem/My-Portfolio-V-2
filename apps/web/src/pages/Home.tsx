import { Hero } from "../components/sections/Hero";
import { TechMarquee } from "../components/sections/TechMarquee";
import { ProjectsPreview } from "../components/sections/ProjectsPreview";
import { GithubActivityPreview } from "../components/sections/GithubActivityPreview";
import { ArticlesPreview } from "../components/sections/ArticlesPreview";
import { Container, SectionLabel, GlowCard, LinkButton } from "@nayeem/ui";
import { useAbout, useProfile, useSkills } from "../hooks/useFirestoreData";
import { SectionReveal } from "../components/common/SectionReveal";

export function Home() {
  const { data: skills } = useSkills();
  const { data: profile } = useProfile();
  const { data: about } = useAbout();
  return <>
    <Hero />
    <SectionReveal><TechMarquee /></SectionReveal>
    <SectionReveal><section className="py-24"><Container className="grid gap-10 md:grid-cols-2 md:items-center"><div><SectionLabel index="01" label="ABOUT" className="mb-6"/><h2 className="font-display text-3xl font-bold sm:text-4xl">{about?.title ?? "Full-stack engineer, AI/ML enthusiast, and researcher."}</h2><p className="mt-4 text-foreground-muted">{about?.intro ?? profile?.bio ?? "Building production web systems and exploring applied machine learning."}</p><LinkButton href="/about" variant="outline" className="mt-6 inline-flex">READ MORE</LinkButton></div><div className="grid grid-cols-2 gap-4">{(skills??[]).slice(0,4).map(s=><GlowCard key={s.id}><p className="font-mono text-[11px] tracking-widest text-accent-cyan">{s.category.toUpperCase()}</p><p className="mt-2 font-display text-sm font-semibold">{s.name}</p></GlowCard>)}</div></Container></section></SectionReveal>
    <SectionReveal><ProjectsPreview /></SectionReveal>
    <SectionReveal><ArticlesPreview /></SectionReveal>
    <SectionReveal><GithubActivityPreview /></SectionReveal>
  </>;
}
