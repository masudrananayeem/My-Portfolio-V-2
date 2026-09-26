import { Container, SectionLabel, GlowCard, Loader, EmptyState } from "@nayeem/ui";
import { useExperience } from "../hooks/useFirestoreData";
import { formatDateRange } from "@nayeem/utils";

export function Experience() {
  const { data, loading } = useExperience();

  return (
    <Container className="py-24">
      <SectionLabel index="02" label="Experience" className="mb-6" />
      <h1 className="font-display text-4xl font-bold">Experience</h1>

      <div className="mt-10 space-y-6">
        {loading && <Loader label="LOADING EXPERIENCE..." />}
        {!loading && (data ?? []).length === 0 && (
          <EmptyState title="NO EXPERIENCE ENTRIES YET" hint="Add entries from the admin dashboard." />
        )}
        {(data ?? []).map((exp) => (
          <GlowCard key={exp.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold">{exp.role} · {exp.organization}</h3>
              <span className="font-mono text-xs text-foreground-muted">
                {formatDateRange(exp.startDate, exp.endDate)}
              </span>
            </div>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-foreground-muted">
              {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {exp.technologies.map((t) => (
                <span key={t} className="rounded-full border border-base-border px-3 py-1 font-mono text-[10px] text-foreground-muted">{t}</span>
              ))}
            </div>
          </GlowCard>
        ))}
      </div>
    </Container>
  );
}
