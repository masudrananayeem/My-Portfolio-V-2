import { Container, SectionLabel, GlowCard, LinkButton } from "@nayeem/ui";
import { useGithubSettings } from "../../hooks/useFirestoreData";

/**
 * Home-page preview card for GitHub activity. The full contribution
 * heatmap (fetched via the Worker /api/github proxy, to keep any token
 * server-side and to cache responses) lives on the dedicated /github page —
 * see pages/Github.tsx.
 */
export function GithubActivityPreview() {
  const { data: github } = useGithubSettings();
  const contributions = github?.cachedContributionCount ?? 829;

  return (
    <section className="py-24">
      <Container>
        <SectionLabel index="05" label="GITHUB" className="mb-8" />
        <GlowCard className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-foreground-muted">GITHUB ACTIVITY</p>
            <p className="mt-2 font-display text-4xl font-bold text-accent-cyan">
              {contributions.toLocaleString()}
            </p>
            <p className="font-mono text-xs tracking-[0.2em] text-foreground-muted">
              CONTRIBUTIONS · LAST 12 MONTHS
            </p>
          </div>
          <LinkButton href="/github" variant="outline">EXPLORE GITHUB ACTIVITY</LinkButton>
        </GlowCard>
      </Container>
    </section>
  );
}
