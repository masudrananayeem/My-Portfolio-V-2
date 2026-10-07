import { Container, SectionLabel, GlowCard, LinkButton, Loader } from "@nayeem/ui";
import { useGithubActivity, useGithubProfile, useGithubSettings } from "../hooks/useFirestoreData";
import { Github as GithubIcon } from "lucide-react";
import { GithubHeatmap } from "../components/sections/GithubHeatmap";

export function Github() {
  const { data: settings, loading: settingsLoading } = useGithubSettings();
  const username = settings?.username ?? "masudrananayeem";
  const { data: activity, loading: activityLoading } = useGithubActivity(Boolean(settings?.showContributions ?? true));
  const { data: profile } = useGithubProfile(true);
  const contributions = activity?.totalContributions ?? settings?.cachedContributionCount ?? 829;

  return (
    <Container className="py-16 sm:py-24">
      <SectionLabel index="05" label="GitHub" className="mb-6" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">GitHub Activity</h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground-muted">
            Live contribution activity is loaded securely through the Cloudflare Worker, with a cached fallback when the API is unavailable.
          </p>
        </div>
      </div>

      {(settingsLoading || activityLoading) && <Loader label="LOADING GITHUB DATA..." />}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <GlowCard>
          <div className="flex items-center gap-3">
            <GithubIcon size={28} className="text-accent-cyan" />
            <div className="min-w-0">
              <p className="truncate font-display font-semibold">@{profile?.login ?? username}</p>
              <p className="font-mono text-[11px] text-foreground-muted">GITHUB PROFILE</p>
            </div>
          </div>
          {profile && (
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-base-panel p-3"><b>{profile.publicRepos}</b><span className="mt-1 block text-[9px] text-foreground-faint">REPOS</span></div>
              <div className="rounded-lg bg-base-panel p-3"><b>{profile.followers}</b><span className="mt-1 block text-[9px] text-foreground-faint">FOLLOWERS</span></div>
              <div className="rounded-lg bg-base-panel p-3"><b>{profile.following}</b><span className="mt-1 block text-[9px] text-foreground-faint">FOLLOWING</span></div>
            </div>
          )}
          <LinkButton href={settings?.profileUrl ?? `https://github.com/${username}`} variant="outline" target="_blank" rel="noreferrer" className="mt-6 w-full justify-center">
            VIEW GITHUB
          </LinkButton>
          <LinkButton href={`https://github.com/${username}?tab=repositories`} variant="ghost" target="_blank" rel="noreferrer" className="mt-3 w-full justify-center">
            EXPLORE REPOSITORIES
          </LinkButton>
        </GlowCard>

        <GlowCard className="lg:col-span-2">
          <p className="font-mono text-xs tracking-[0.2em] text-foreground-muted">CONTRIBUTIONS · LAST 12 MONTHS</p>
          <p className="mt-2 font-display text-5xl font-bold text-accent-cyan">{contributions.toLocaleString()}</p>
          <div className="mt-7">
            <GithubHeatmap days={activity?.days ?? []} />
          </div>
        </GlowCard>
      </div>
    </Container>
  );
}
