import { Container, SectionLabel, GlowCard, Loader } from "@nayeem/ui";
import { useSkills } from "../hooks/useFirestoreData";
import type { SkillCategory } from "@nayeem/types";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  cloud: "Cloud",
  devops: "DevOps",
  "ai-ml": "AI / ML",
  tools: "Tools",
  architecture: "Architecture",
};

export function Skills() {
  const { data, loading } = useSkills();

  const grouped = (data ?? []).reduce<Record<string, typeof data>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  return (
    <Container className="py-24">
      <SectionLabel index="02" label="Skills" className="mb-6" />
      <h1 className="font-display text-4xl font-bold">Skills</h1>

      {loading && <Loader label="LOADING SKILLS..." />}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const items = grouped[key];
          if (!items || items.length === 0) return null;
          return (
            <GlowCard key={key}>
              <p className="font-mono text-xs tracking-widest text-accent-cyan">{label.toUpperCase()}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s.id} className="rounded-full border border-base-border px-3 py-1.5 text-sm text-foreground-muted">
                    {s.name}
                  </span>
                ))}
              </div>
            </GlowCard>
          );
        })}
      </div>
    </Container>
  );
}
