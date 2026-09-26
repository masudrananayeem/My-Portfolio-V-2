import { Container, SectionLabel, GlowCard, Loader, EmptyState, LinkButton } from "@nayeem/ui";
import { useResearch } from "../hooks/useFirestoreData";

export function Research() {
  const { data, loading } = useResearch();

  return (
    <Container className="py-24">
      <SectionLabel index="04" label="Research" className="mb-6" />
      <h1 className="font-display text-4xl font-bold">Research</h1>

      {loading && <Loader label="LOADING RESEARCH..." />}
      {!loading && (data ?? []).length === 0 && (
        <div className="mt-10">
          <EmptyState title="NO RESEARCH ENTRIES YET" hint="Add research projects from the admin dashboard." />
        </div>
      )}

      <div className="mt-10 space-y-6">
        {(data ?? []).map((r) => (
          <GlowCard key={r.id}>
            <h2 className="font-display text-xl font-semibold">{r.title}</h2>
            <p className="mt-2 text-sm text-foreground-muted">{r.abstract}</p>
            <div className="mt-4 grid gap-3 text-sm text-foreground-muted sm:grid-cols-2">
              {r.dataset && <p><span className="text-accent-cyan">Dataset:</span> {r.dataset}</p>}
              {r.methodology && <p><span className="text-accent-cyan">Methodology:</span> {r.methodology}</p>}
              {r.models && <p><span className="text-accent-cyan">Models:</span> {r.models.join(", ")}</p>}
              {r.results && <p><span className="text-accent-cyan">Results:</span> {r.results}</p>}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.technologies.map((t) => (
                <span key={t} className="rounded-full border border-base-border px-3 py-1 font-mono text-[10px] text-foreground-muted">{t}</span>
              ))}
            </div>
            {r.paperUrl && (
              <LinkButton href={r.paperUrl} variant="ghost" target="_blank" rel="noreferrer" className="mt-4 inline-flex">
                VIEW PAPER →
              </LinkButton>
            )}
          </GlowCard>
        ))}
      </div>
    </Container>
  );
}
