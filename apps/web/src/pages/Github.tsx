import { Container, SectionLabel, GlowCard, LinkButton, Loader } from "@nayeem/ui";
import { useGithubSettings } from "../hooks/useFirestoreData";
import { Github as GithubIcon } from "lucide-react";

/**
 * Full GitHub activity page. The contribution heatmap + live stats are
 * fetched through the Worker's /api/github proxy (see backend repo) so a
 * GitHub token never reaches the browser and responses can be cached.
 * This page currently renders the cached/fallback count from Firestore;
 * wire the fetch call to the Worker endpoint next.
 */
export function Github() {
  const { data: settings, loading } = useGithubSettings();
  const username = settings?.username ?? "masudrananayeem";
  const contributions = settings?.cachedContributionCount ?? 829;
a
  return (
    <Container className="py-24">
      <SectionLabel index="05" label="GitHub" className="mb-6" />
      <h1 className="font-display text-4xl font-bold">GitHub Activity</h1>

      {loading && <Loader label="LOADING GITHUB DATA..." />}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <GlowCard className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <GithubIcon size={28} className="text-accent-cyan" />
            <div>
              <p className="font-display font-semibold">@{username}</p>
              <p className="font-mono text-[11px] text-foreground-muted">GITHUB PROFILE</p>
            </div>
          </div>
          <LinkButton
            href={settings?.profileUrl ?? `https://github.com/${username}`}
            variant="outline"
            target="_blank"
            rel="noreferrer"
            className="mt-6 w-full justify-center"
          >
            VIEW GITHUB
          </LinkButton>
          <LinkButton
            href={`https://github.com/${username}?tab=repositories`}
            variant="ghost"
            target="_blank"
            rel="noreferrer"
            className="mt-3 w-full justify-center"
          >
            EXPLORE REPOSITORIES
          </LinkButton>
        </GlowCard>

        <GlowCard className="lg:col-span-2">
          <p className="font-mono text-xs tracking-[0.2em] text-foreground-muted">CONTRIBUTIONS · LAST 12 MONTHS</p>
          <p className="mt-2 font-display text-5xl font-bold text-accent-cyan">{contributions.toLocaleString()}</p>

          {/* Contribution heatmap placeholder — render a 52x7 grid here,
              populated from the Worker's /api/github/contributions response,
              with per-cell hover tooltips (date + count) and a scroll-in
              stagger animation (GSAP). */}
          <div className="mt-6 grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1">
            {Array.from({ length: 26 * 7 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm bg-base-panel"
                style={{ opacity: 0.2 + (Math.sin(i) + 1) * 0.3 }}
              />
            ))}
          </div>
        </GlowCard>
      </div>
    </Container>
  );
}
