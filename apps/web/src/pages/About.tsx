import { Container, SectionLabel, GlowCard, Loader } from "@nayeem/ui";
import { useAbout, useCertificates, useExperience, useProfile, useSkills } from "../hooks/useFirestoreData";
import { formatDateRange } from "@nayeem/utils";
import { ArrowUpRight, Code2, ExternalLink, GraduationCap, Mail, MapPin, Phone, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import type { EducationItem, Skill } from "@nayeem/types";

const codingFallbacks = {
  beecrowd: { platform: "beecrowd", handle: "779446", url: "https://judge.beecrowd.com/en/profile/779446", solved: 73 },
  codeforces: { platform: "Codeforces", handle: "codeforcemasud", url: "https://codeforces.com/profile/codeforcemasud", solved: 40 },
  codechef: { platform: "CodeChef", handle: "codechefmasud", url: "https://www.codechef.com/users/codechefmasud", solved: 207 },
};

const fallbackEducation: EducationItem[] = [
  { degree: "Bachelor of Science in CSE", institution: "Daffodil International University", period: "Jan 2023 – Dec 2026" },
  { degree: "Higher Secondary Certificate (HSC)", institution: "Rural Development Academy (RDA) Laboratory School & College", period: "2020 – 2021", result: "GPA: 5.00" },
  { degree: "Secondary School Certificate (SSC)", institution: "Bogura Cantonment Board High School", period: "2007 – 2019", result: "Grade: 4.89" },
];

const fallbackSkills: Skill[] = [
  { id: "skill-js", name: "JavaScript", category: "languages", order: 1 },
  { id: "skill-ts", name: "TypeScript", category: "languages", order: 2 },
  { id: "skill-py", name: "Python", category: "languages", order: 3 },
  { id: "skill-cpp", name: "C / C++", category: "languages", order: 4 },
  { id: "skill-react", name: "React", category: "frontend", order: 5 },
  { id: "skill-next", name: "Next.js", category: "frontend", order: 6 },
  { id: "skill-html", name: "HTML5", category: "frontend", order: 7 },
  { id: "skill-css", name: "CSS3", category: "frontend", order: 8 },
  { id: "skill-tailwind", name: "Tailwind CSS", category: "frontend", order: 9 },
  { id: "skill-node", name: "Node.js", category: "backend", order: 10 },
  { id: "skill-express", name: "Express.js", category: "backend", order: 11 },
  { id: "skill-rest", name: "REST APIs", category: "backend", order: 12 },
  { id: "skill-auth", name: "Authentication", category: "backend", order: 13 },
  { id: "skill-mongo", name: "MongoDB", category: "database", order: 14 },
  { id: "skill-firestore", name: "Firebase / Firestore", category: "database", order: 15 },
  { id: "skill-sql", name: "SQL", category: "database", order: 16 },
  { id: "skill-git", name: "Git / GitHub", category: "tools", order: 17 },
  { id: "skill-vite", name: "Vite", category: "tools", order: 18 },
  { id: "skill-postman", name: "Postman", category: "testing", order: 19 },
  { id: "skill-jest", name: "Jest / Unit Testing", category: "testing", order: 20 },
  { id: "skill-docker", name: "Docker", category: "devops", order: 21 },
  { id: "skill-cicd", name: "CI/CD", category: "devops", order: 22 },
  { id: "skill-cloudflare", name: "Cloudflare Workers / Pages", category: "cloud", order: 23 },
  { id: "skill-vercel", name: "Vercel", category: "cloud", order: 24 },
  { id: "skill-ml", name: "Machine Learning", category: "ai-ml", order: 25 },
  { id: "skill-dl", name: "Deep Learning", category: "ai-ml", order: 26 },
  { id: "skill-cv", name: "Computer Vision", category: "ai-ml", order: 27 },
  { id: "skill-pytorch", name: "PyTorch", category: "ai-ml", order: 28 },
  { id: "skill-tf", name: "TensorFlow", category: "ai-ml", order: 29 },
  { id: "skill-numpy", name: "NumPy / Pandas", category: "data", order: 30 },
  { id: "skill-sec", name: "Web Security Basics", category: "security", order: 31 },
  { id: "skill-arch", name: "Software Architecture", category: "architecture", order: 32 },
  { id: "skill-patterns", name: "Design Patterns", category: "architecture", order: 33 },
];

const categoryLabels: Record<string, string> = {
  languages: "LANGUAGES",
  frontend: "FRONTEND",
  backend: "BACKEND",
  database: "DATABASE",
  cloud: "CLOUD",
  devops: "DEVOPS",
  "ai-ml": "AI / ML",
  data: "DATA",
  testing: "TESTING",
  security: "SECURITY",
  tools: "TOOLS",
  architecture: "ARCHITECTURE",
  mobile: "MOBILE",
};

export function About() {
  const { data: profile, loading: profileLoading } = useProfile();
  const { data: about, loading: aboutLoading } = useAbout();
  const { data: experience, loading: experienceLoading } = useExperience();
  const { data: certificates, loading: certificatesLoading } = useCertificates();
  const { data: skills, loading: skillsLoading } = useSkills();
  if (profileLoading || aboutLoading) return <Loader label="LOADING ABOUT…" />;

  const coding = {
    beecrowd: { ...codingFallbacks.beecrowd, ...(about?.codingProfiles?.beecrowd ?? {}) },
    codeforces: { ...codingFallbacks.codeforces, ...(about?.codingProfiles?.codeforces ?? {}) },
    codechef: { ...codingFallbacks.codechef, ...(about?.codingProfiles?.codechef ?? {}) },
  };
  const codingCards = [coding.beecrowd, coding.codeforces, coding.codechef];
  const solvedTotal = codingCards.reduce((sum, item) => sum + Number(item?.solved ?? 0), 0);
  const displaySkills = skills?.length ? skills : fallbackSkills;
  const groupedSkills = displaySkills.reduce<Record<string, Skill[]>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});
  const education = about?.education?.length ? about.education : fallbackEducation;
  const bioDetails = {
    shortDegree: "CSE, Daffodil Int'l Univ.",
    availability: "Available for freelance",
    email: "masudrananayeem86@gmail.com",
    phone: "+880 1820-050464",
    ...(about?.bioDetails ?? {}),
  };
  const avatarUrl = profile?.avatarUrl || "/profile-hero.png";

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-[.8fr_1.4fr] lg:gap-14">
        <motion.div layoutId="profile-hero-image" className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
          <div className="group relative overflow-hidden rounded-2xl border border-base-border bg-base-panel/40 shadow-[0_22px_60px_-32px_rgb(0_229_255/0.28)]">
            <img src={avatarUrl} alt="Masud Rana Nayeem — Full Stack Developer" className="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.025]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-accent-cyan/80" />
            <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-accent-cyan/80" />
            <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-accent-cyan/80" />
            <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-accent-cyan/80" />
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-black/55 p-4 text-white backdrop-blur-md">
              <p className="font-display text-lg font-semibold">MASUD RANA NAYEEM</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.16em] text-cyan-200">FULL STACK · AI / ML · RESEARCH</p>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionLabel index="01" label={about?.eyebrow ?? "ABOUT"} className="mb-6" />
          <h1 className="max-w-4xl font-display text-4xl font-bold sm:text-5xl">{about?.title ?? "Who I Am"}</h1>
          <div className="mt-8 space-y-5 text-foreground-muted leading-8">
            <p className="text-lg text-foreground">{about?.intro || "Aspiring Web Developer & Programmer — a tech enthusiast focused on modern web technologies, building responsive and user-friendly applications."}</p>
            <p className="whitespace-pre-line">{about?.body || "Currently exploring advanced React and backend technologies, with a 2026 goal of becoming a professional Full-Stack Developer."}</p>
            {about?.highlights?.length ? <div className="grid gap-3 sm:grid-cols-2">{about.highlights.map((h) => <GlowCard key={h}><p className="text-sm text-foreground">{h}</p></GlowCard>)}</div> : null}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <GlowCard><div className="flex items-center gap-3"><GraduationCap size={17} className="text-accent-cyan" /><div><p className="text-xs text-foreground-faint">EDUCATION</p><p className="font-semibold">{bioDetails.shortDegree}</p></div></div></GlowCard>
            <GlowCard><div className="flex items-center gap-3"><MapPin size={17} className="text-accent-cyan" /><div><p className="text-xs text-foreground-faint">AVAILABILITY</p><p className="font-semibold">{bioDetails.availability}</p></div></div></GlowCard>
            <GlowCard><div className="flex items-center gap-3"><Mail size={17} className="text-accent-cyan" /><div className="min-w-0"><p className="text-xs text-foreground-faint">EMAIL</p><a href={`mailto:${bioDetails.email}`} className="break-all font-semibold hover:text-accent-cyan">{bioDetails.email}</a></div></div></GlowCard>
            <GlowCard><div className="flex items-center gap-3"><Phone size={17} className="text-accent-cyan" /><div><p className="text-xs text-foreground-faint">PHONE</p><a href={`tel:${bioDetails.phone.replace(/[^+\d]/g, "")}`} className="font-semibold hover:text-accent-cyan">{bioDetails.phone}</a></div></div></GlowCard>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <SectionLabel index="01.1" label="EDUCATION" className="mb-7" />
        <div className="grid gap-5 lg:grid-cols-3">
          {education.map((item) => <GlowCard key={`${item.degree}-${item.institution}`} className="h-full"><div className="flex h-full flex-col"><p className="font-mono text-[10px] tracking-[0.18em] text-accent-cyan">{item.period}</p><h2 className="mt-3 font-display text-xl font-semibold">{item.degree}</h2><p className="mt-3 text-sm leading-6 text-foreground-muted">{item.institution}</p>{item.result && <p className="mt-auto pt-5 font-mono text-xs text-foreground">{item.result}</p>}</div></GlowCard>)}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel index="01.2" label="PROBLEM SOLVING" className="mb-7" />
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-display text-2xl font-bold sm:text-3xl">Competitive Programming Profiles</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-foreground-muted">Problem-solving practice across three competitive programming platforms, with direct links to each public profile.</p></div><div className="rounded-xl border border-base-border bg-base-near px-4 py-3"><p className="font-mono text-[10px] tracking-[0.2em] text-foreground-faint">TOTAL SOLVED</p><p className="mt-1 font-display text-2xl font-bold text-accent-cyan">{solvedTotal}+</p></div></div>
        <div className="grid gap-5 md:grid-cols-3">{codingCards.map((item) => <a key={item.platform} href={item.url} target="_blank" rel="noreferrer" className="group"><GlowCard className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-accent-cyan/50"><div className="flex items-start justify-between gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg border border-base-border text-accent-cyan"><Code2 size={18} /></div><ArrowUpRight size={17} className="text-foreground-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" /></div><p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-accent-cyan">{item.platform.toUpperCase()}</p><h3 className="mt-2 font-display text-lg font-semibold">{item.handle}</h3><div className="mt-5 flex items-end justify-between border-t border-base-border pt-4"><div><p className="font-display text-3xl font-bold">{item.solved}</p><p className="font-mono text-[10px] tracking-widest text-foreground-faint">PROBLEMS SOLVED</p></div><Trophy size={18} className="text-accent-cyan" /></div></GlowCard></a>)}</div>
      </section>

      <section className="mt-20"><SectionLabel index="01.3" label="SKILLS" className="mb-7" />{skillsLoading ? <Loader label="LOADING SKILLS…" /> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(groupedSkills).map(([category, items]) => <GlowCard key={category}><p className="font-mono text-xs tracking-widest text-accent-cyan">{categoryLabels[category] ?? category.toUpperCase()}</p><div className="mt-4 flex flex-wrap gap-2">{items.map((skill) => <span key={skill.id} className="rounded-full border border-base-border px-3 py-1.5 text-sm text-foreground-muted">{skill.name}</span>)}</div></GlowCard>)}</div>}</section>

      <section className="mt-20"><SectionLabel index="01.4" label="EXPERIENCE" className="mb-7" />{experienceLoading ? <Loader label="LOADING EXPERIENCE…" /> : <div className="space-y-5">{(experience ?? []).map((exp) => <GlowCard key={exp.id}><div className="flex flex-wrap items-baseline justify-between gap-3"><div><h2 className="font-display text-xl font-semibold">{exp.role}</h2><p className="mt-1 text-accent-cyan">{exp.organization}</p></div><span className="font-mono text-xs text-foreground-muted">{formatDateRange(exp.startDate, exp.endDate)}</span></div><ul className="mt-4 list-inside list-disc space-y-1 text-sm text-foreground-muted">{exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>{exp.achievements.length > 0 && <p className="mt-4 text-sm text-foreground-muted"><span className="text-foreground">Achievements:</span> {exp.achievements.join(" · ")}</p>}<div className="mt-4 flex flex-wrap gap-2">{exp.technologies.map((t) => <span key={t} className="rounded-full border border-base-border px-3 py-1 font-mono text-[10px] text-foreground-muted">{t}</span>)}</div></GlowCard>)}</div>}</section>

      <section className="mt-20"><SectionLabel index="01.5" label="CERTIFICATES" className="mb-7" />{certificatesLoading ? <Loader label="LOADING CERTIFICATES…" /> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{(certificates ?? []).map((c) => <GlowCard key={c.id} className="overflow-hidden p-0">{c.imageUrl && <img src={c.imageUrl} alt={c.title} className="aspect-video w-full object-cover" />}<div className="p-5"><p className="font-display font-semibold">{c.title}</p><p className="mt-1 text-sm text-accent-cyan">{c.issuer}</p>{c.description && <p className="mt-3 text-sm text-foreground-muted">{c.description}</p>}{c.credentialUrl && <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-cyan">VERIFY <ExternalLink size={13}/></a>}</div></GlowCard>)}</div>}</section>
    </Container>
  );
}
