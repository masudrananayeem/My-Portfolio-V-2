import { Container, SectionLabel, GlowCard, Loader } from "@nayeem/ui";
import { useAbout, useCertificates, useExperience, useProfile, useSkills } from "../hooks/useFirestoreData";
import { formatDateRange } from "@nayeem/utils";
import { ArrowUpRight, Code2, ExternalLink, Trophy } from "lucide-react";

const codingFallbacks = {
  beecrowd: { platform: "beecrowd", handle: "779446", url: "https://judge.beecrowd.com/en/profile/779446", solved: 73 },
  codeforces: { platform: "Codeforces", handle: "codeforcemasud", url: "https://codeforces.com/profile/codeforcemasud", solved: 40 },
  codechef: { platform: "CodeChef", handle: "codechefmasud", url: "https://www.codechef.com/users/codechefmasud", solved: 207 },
};

export function About() {
  const { data: profile, loading: profileLoading } = useProfile();
  const { data: about, loading: aboutLoading } = useAbout();
  const { data: experience, loading: experienceLoading } = useExperience();
  const { data: certificates, loading: certificatesLoading } = useCertificates();
  const { data: skills, loading: skillsLoading } = useSkills();
  if (profileLoading || aboutLoading) return <Loader label="LOADING ABOUT…" />;

  const coding = { ...codingFallbacks, ...(about?.codingProfiles ?? {}) };
  const codingCards = [coding.beecrowd, coding.codeforces, coding.codechef];
  const solvedTotal = codingCards.reduce((sum, item) => sum + Number(item?.solved ?? 0), 0);
  const groupedSkills = (skills ?? []).reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  return (
    <Container className="py-24">
      <SectionLabel index="01" label={about?.eyebrow ?? "ABOUT"} className="mb-6" />
      <h1 className="max-w-4xl font-display text-4xl font-bold sm:text-5xl">{about?.title ?? "Who I Am"}</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_.8fr]">
        <div className="space-y-5 text-foreground-muted leading-8">
          <p className="text-lg text-foreground">{about?.intro || profile?.bio || "Full-stack developer, AI/ML enthusiast and researcher focused on building useful digital systems."}</p>
          <div className="whitespace-pre-line">{about?.body || "I build responsive web platforms, backend systems and research prototypes with a focus on maintainability, performance and thoughtful user experience."}</div>
          {about?.highlights?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {about.highlights.map((h) => <GlowCard key={h}><p className="text-sm text-foreground">{h}</p></GlowCard>)}
            </div>
          ) : null}
        </div>
        <GlowCard>
          <p className="font-mono text-xs tracking-widest text-accent-cyan">EDUCATION</p>
          <p className="mt-2 font-semibold">{profile?.education}</p>
          <p className="text-sm text-foreground-muted">{profile?.university}</p>
          <p className="mt-5 font-mono text-xs tracking-widest text-accent-cyan">LOCATION</p>
          <p className="mt-2 text-sm text-foreground-muted">{profile?.location ?? "Bangladesh"}</p>
        </GlowCard>
      </div>

      <section className="mt-20">
        <SectionLabel index="01.1" label="PROBLEM SOLVING" className="mb-7" />
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Competitive Programming Profiles</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground-muted">Problem-solving practice across three competitive programming platforms, with direct links to each public profile.</p>
          </div>
          <div className="rounded-xl border border-base-border bg-base-near px-4 py-3">
            <p className="font-mono text-[10px] tracking-[0.2em] text-foreground-faint">TOTAL SOLVED</p>
            <p className="mt-1 font-display text-2xl font-bold text-accent-cyan">{solvedTotal}+</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {codingCards.map((item) => (
            <a key={item.platform} href={item.url} target="_blank" rel="noreferrer" className="group">
              <GlowCard className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-accent-cyan/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-base-border text-accent-cyan"><Code2 size={18} /></div>
                  <ArrowUpRight size={17} className="text-foreground-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" />
                </div>
                <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-accent-cyan">{item.platform.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{item.handle}</h3>
                <div className="mt-5 flex items-end justify-between border-t border-base-border pt-4">
                  <div><p className="font-display text-3xl font-bold">{item.solved}</p><p className="font-mono text-[10px] tracking-widest text-foreground-faint">PROBLEMS SOLVED</p></div>
                  <Trophy size={18} className="text-accent-cyan" />
                </div>
              </GlowCard>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel index="01.2" label="SKILLS" className="mb-7" />
        {skillsLoading ? <Loader label="LOADING SKILLS…" /> : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <GlowCard key={category}>
                <p className="font-mono text-xs tracking-widest text-accent-cyan">{category.replace("ai-ml", "AI / ML").toUpperCase()}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(items ?? []).map((skill) => <span key={skill.id} className="rounded-full border border-base-border px-3 py-1.5 text-sm text-foreground-muted">{skill.name}</span>)}
                </div>
              </GlowCard>
            ))}
          </div>
        )}
      </section>

      <section className="mt-20"><SectionLabel index="01.3" label="EXPERIENCE" className="mb-7" />
        {experienceLoading ? <Loader label="LOADING EXPERIENCE…" /> : <div className="space-y-5">{(experience ?? []).map((exp) => <GlowCard key={exp.id}><div className="flex flex-wrap items-baseline justify-between gap-3"><div><h2 className="font-display text-xl font-semibold">{exp.role}</h2><p className="mt-1 text-accent-cyan">{exp.organization}</p></div><span className="font-mono text-xs text-foreground-muted">{formatDateRange(exp.startDate, exp.endDate)}</span></div><ul className="mt-4 list-inside list-disc space-y-1 text-sm text-foreground-muted">{exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>{exp.achievements.length > 0 && <p className="mt-4 text-sm text-foreground-muted"><span className="text-foreground">Achievements:</span> {exp.achievements.join(" · ")}</p>}<div className="mt-4 flex flex-wrap gap-2">{exp.technologies.map((t) => <span key={t} className="rounded-full border border-base-border px-3 py-1 font-mono text-[10px] text-foreground-muted">{t}</span>)}</div></GlowCard>)}</div>}
      </section>

      <section className="mt-20"><SectionLabel index="01.4" label="CERTIFICATES" className="mb-7" />
        {certificatesLoading ? <Loader label="LOADING CERTIFICATES…" /> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{(certificates ?? []).map((c) => <GlowCard key={c.id} className="overflow-hidden p-0">{c.imageUrl && <img src={c.imageUrl} alt={c.title} className="aspect-video w-full object-cover" />}<div className="p-5"><p className="font-display font-semibold">{c.title}</p><p className="mt-1 text-sm text-accent-cyan">{c.issuer}</p>{c.description && <p className="mt-3 text-sm text-foreground-muted">{c.description}</p>}{c.credentialUrl && <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-cyan">VERIFY <ExternalLink size={13}/></a>}</div></GlowCard>)}</div>}
      </section>
    </Container>
  );
}
