import { motion } from "framer-motion";
import { Container, SectionLabel, GlowCard, Loader } from "@nayeem/ui";
import { useAbout, useCertificates, useExperience, useProfile, useSkills } from "../hooks/useFirestoreData";
import { formatDateRange } from "@nayeem/utils";
import { ArrowUpRight, Code2, ExternalLink, Trophy, Mail, Phone } from "lucide-react";
import type { Skill } from "@nayeem/types";

const codingFallbacks = {
  beecrowd: { platform: "beecrowd", handle: "779446", url: "https://judge.beecrowd.com/en/profile/779446", solved: 73 },
  codeforces: { platform: "Codeforces", handle: "codeforcemasud", url: "https://codeforces.com/profile/codeforcemasud", solved: 40 },
  codechef: { platform: "CodeChef", handle: "codechefmasud", url: "https://www.codechef.com/users/codechefmasud", solved: 207 },
};

const education = [
  { degree: "Bachelor of Science in CSE", institution: "Daffodil International University", period: "Jan 2023 – Dec 2026", result: "" },
  { degree: "Higher Secondary Certificate (HSC)", institution: "Rural Development Academy (RDA) Laboratory School & College", period: "2020 – 2021", result: "GPA: 5.00" },
  { degree: "Secondary School Certificate (SSC)", institution: "Bogura Cantonment Board High School", period: "2007 – 2019", result: "Grade: 4.89" },
];

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
  const groupedSkills = (skills ?? []).reduce<Record<string, Skill[]>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <section className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: 70, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.72, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 mx-auto w-full max-w-sm lg:order-1"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-base-border bg-base-panel/40 shadow-[0_20px_55px_-30px_rgb(0_229_255/0.28)]">
            <img
              src={profile?.avatarUrl || "/profile-hero.png"}
              alt="Masud Rana Nayeem"
              className="aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/45 px-5 py-4 backdrop-blur-md">
              <p className="font-display text-lg font-semibold">MASUD RANA NAYEEM</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-accent-cyan">FULL STACK DEVELOPER · AI / ML · RESEARCH</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="order-2"
        >
          <SectionLabel index="01" label={about?.eyebrow ?? "ABOUT"} className="mb-6" />
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">{about?.title ?? "Who I Am"}</h1>
          <p className="mt-6 text-lg leading-8 text-foreground">{about?.intro || profile?.bio || "Aspiring Web Developer & Programmer — a tech enthusiast focused on modern web technologies, building responsive and user-friendly applications."}</p>
          <p className="mt-4 whitespace-pre-line leading-8 text-foreground-muted">{about?.body || "Currently exploring advanced React and backend technologies, with a 2026 goal of becoming a professional Full-Stack Developer."}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-base-border px-4 py-2 font-mono text-[10px] tracking-widest text-accent-cyan">CSE · DAFFODIL INT'L UNIV.</span>
            <span className="rounded-full border border-base-border px-4 py-2 font-mono text-[10px] tracking-widest text-foreground-muted">AVAILABLE FOR FREELANCE</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href="mailto:masudrananayeem86@gmail.com" className="flex items-center gap-3 rounded-xl border border-base-border bg-base-near/60 px-4 py-3 text-sm text-foreground-muted transition-colors hover:border-accent-cyan/50 hover:text-foreground"><Mail size={15} className="text-accent-cyan" /> masudrananayeem86@gmail.com</a>
            <a href="tel:+8801820050464" className="flex items-center gap-3 rounded-xl border border-base-border bg-base-near/60 px-4 py-3 text-sm text-foreground-muted transition-colors hover:border-accent-cyan/50 hover:text-foreground"><Phone size={15} className="text-accent-cyan" /> +880 1820-050464</a>
          </div>
        </motion.div>
      </section>

      {about?.highlights?.length ? (
        <section className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {about.highlights.map((h, index) => <motion.div key={h} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.05 }}><GlowCard className="h-full"><p className="text-sm leading-6 text-foreground">{h}</p></GlowCard></motion.div>)}
        </section>
      ) : null}

      <section className="mt-20">
        <SectionLabel index="01.1" label="EDUCATION" className="mb-7" />
        <div className="grid gap-5 lg:grid-cols-3">
          {education.map((item, index) => (
            <motion.div key={item.degree} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.06 }}>
              <GlowCard className="h-full">
                <p className="font-mono text-[10px] tracking-[0.2em] text-accent-cyan">0{index + 1}</p>
                <h2 className="mt-4 font-display text-lg font-semibold leading-6">{item.degree}</h2>
                <p className="mt-3 text-sm leading-6 text-foreground-muted">{item.institution}</p>
                <div className="mt-5 border-t border-base-border pt-4 text-xs text-foreground-faint">{item.period}{item.result ? ` · ${item.result}` : ""}</div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel index="01.2" label="PROBLEM SOLVING" className="mb-7" />
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><h2 className="font-display text-2xl font-bold sm:text-3xl">Competitive Programming Profiles</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-foreground-muted">Problem-solving practice across three competitive programming platforms.</p></div>
          <div className="rounded-xl border border-base-border bg-base-near px-4 py-3"><p className="font-mono text-[10px] tracking-[0.2em] text-foreground-faint">TOTAL SOLVED</p><p className="mt-1 font-display text-2xl font-bold text-accent-cyan">{solvedTotal}+</p></div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {codingCards.map((item) => <a key={item.platform} href={item.url} target="_blank" rel="noreferrer" className="group"><GlowCard className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-accent-cyan/50"><div className="flex items-start justify-between gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg border border-base-border text-accent-cyan"><Code2 size={18} /></div><ArrowUpRight size={17} className="text-foreground-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" /></div><p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-accent-cyan">{item.platform.toUpperCase()}</p><h3 className="mt-2 font-display text-lg font-semibold">{item.handle}</h3><div className="mt-5 flex items-end justify-between border-t border-base-border pt-4"><div><p className="font-display text-3xl font-bold">{item.solved}</p><p className="font-mono text-[10px] tracking-widest text-foreground-faint">PROBLEMS SOLVED</p></div><Trophy size={18} className="text-accent-cyan" /></div></GlowCard></a>)}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel index="01.3" label="SKILLS" className="mb-7" />
        {skillsLoading ? <Loader label="LOADING SKILLS…" /> : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{Object.entries(groupedSkills).map(([category, items]) => <GlowCard key={category}><p className="font-mono text-xs tracking-widest text-accent-cyan">{category.replace("ai-ml", "AI / ML").toUpperCase()}</p><div className="mt-4 flex flex-wrap gap-2">{items.map((skill) => <span key={skill.id} className="rounded-full border border-base-border px-3 py-1.5 text-sm text-foreground-muted">{skill.name}</span>)}</div></GlowCard>)}</div>}
      </section>

      <section className="mt-20">
        <SectionLabel index="01.4" label="EXPERIENCE" className="mb-7" />
        {experienceLoading ? <Loader label="LOADING EXPERIENCE…" /> : <div className="space-y-5">{(experience ?? []).map((exp) => <GlowCard key={exp.id}><div className="flex flex-wrap items-baseline justify-between gap-3"><div><h2 className="font-display text-xl font-semibold">{exp.role}</h2><p className="mt-1 text-accent-cyan">{exp.organization}</p></div><span className="font-mono text-xs text-foreground-muted">{formatDateRange(exp.startDate, exp.endDate)}</span></div><ul className="mt-4 list-inside list-disc space-y-1 text-sm text-foreground-muted">{exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>{exp.achievements.length > 0 && <p className="mt-4 text-sm text-foreground-muted"><span className="text-foreground">Achievements:</span> {exp.achievements.join(" · ")}</p>}<div className="mt-4 flex flex-wrap gap-2">{exp.technologies.map((t) => <span key={t} className="rounded-full border border-base-border px-3 py-1 font-mono text-[10px] text-foreground-muted">{t}</span>)}</div></GlowCard>)}</div>}
      </section>

      <section className="mt-20">
        <SectionLabel index="01.5" label="CERTIFICATES" className="mb-7" />
        {certificatesLoading ? <Loader label="LOADING CERTIFICATES…" /> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{(certificates ?? []).map((c) => <GlowCard key={c.id} className="overflow-hidden p-0">{c.imageUrl && <img src={c.imageUrl} alt={c.title} className="aspect-video w-full object-cover" />}<div className="p-5"><p className="font-display font-semibold">{c.title}</p><p className="mt-1 text-sm text-accent-cyan">{c.issuer}</p>{c.description && <p className="mt-3 text-sm text-foreground-muted">{c.description}</p>}{c.credentialUrl && <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-cyan">VERIFY <ExternalLink size={13}/></a>}</div></GlowCard>)}</div>}
      </section>
    </Container>
  );
}
