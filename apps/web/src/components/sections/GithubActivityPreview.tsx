import { Container, SectionLabel, GlowCard, LinkButton } from "@nayeem/ui";
import { useGithubActivity, useGithubSettings } from "../../hooks/useFirestoreData";
import { GithubHeatmap } from "./GithubHeatmap";
import { Loader } from "@nayeem/ui";

export function GithubActivityPreview() {
  const { data: githubSettings } = useGithubSettings();
  const { data: activity, loading } = useGithubActivity(Boolean(githubSettings?.showContributions ?? true));
  const contributions = activity?.totalContributions ?? githubSettings?.cachedContributionCount ?? 829;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionLabel index="05" label="GITHUB" className="mb-8" />
        <GlowCard>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-foreground-muted">OPEN SOURCE ACTIVITY</p>
              <p className="mt-2 font-display text-4xl font-bold text-accent-cyan sm:text-5xl">
                {contributions.toLocaleString()}
              </p>
              <p className="font-mono text-xs tracking-[0.15em] text-foreground-muted">CONTRIBUTIONS · LAST 12 MONTHS</p>
            </div>
            <LinkButton href="/github" variant="outline">EXPLORE GITHUB</LinkButton>
          </div>
          <div className="mt-8">
            {loading ? <Loader label="SYNCING GITHUB..." /> : <GithubHeatmap days={activity?.days ?? []} />}
          </div>
        </GlowCard>
      </Container>
    </section>
  );
}
