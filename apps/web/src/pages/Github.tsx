import { Container, SectionLabel, GlowCard, LinkButton, Loader } from "@nayeem/ui";
import { useGithubActivity, useGithubProfile, useGithubSettings } from "../hooks/useFirestoreData";
import { Github as GithubIcon, Activity, CalendarDays, Flame, Trophy, Users, GitFork, RefreshCw, ExternalLink } from "lucide-react";
import { GithubHeatmap, summarizeGithubDays } from "../components/sections/GithubHeatmap";

export function Github() {
  const { data: settings, loading: settingsLoading } = useGithubSettings();
  const username = settings?.username ?? "masudrananayeem";
  const { data: activity, loading: activityLoading, error: activityError, refresh } = useGithubActivity(Boolean(settings?.showContributions ?? true));
  const { data: profile } = useGithubProfile(true);
  const contributions = activity?.totalContributions ?? settings?.cachedContributionCount ?? 829;
  const summary = summarizeGithubDays(activity?.days ?? []);
  const loading = settingsLoading || activityLoading;

  const stats = [
    { label: "TOTAL (LAST YEAR)", value: contributions.toLocaleString(), note: "Contributions to public & private repos", icon: Activity },
    { label: "ACTIVE DAYS", value: summary.activeDays.toLocaleString(), note: "Days with recorded commits", icon: CalendarDays },
    { label: "CURRENT STREAK", value: `${summary.currentStreak} DAYS`, note: "Consecutive contribution days", icon: Flame },
    { label: "LONGEST STREAK", value: `${summary.longestStreak} DAYS`, note: "Peak consistency record", icon: Trophy },
  ];

  return (
    <Container className="py-16 sm:py-24">
      <div className="flex flex-col gap-5 border-b border-base-border pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel index="05" label="GitHub Activity Graph" className="mb-5" />
          <h1 className="font-display text-4xl font-bold sm:text-5xl">GitHub Activity</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">A complete contribution overview powered by your GitHub account through the Cloudflare Worker. The calendar, streaks and profile statistics update from the live API.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={refresh} className="inline-flex items-center gap-2 rounded-lg border border-base-border bg-base-panel px-4 py-2.5 font-mono text-[10px] tracking-[0.15em] text-foreground transition hover:border-accent-cyan hover:text-accent-cyan">
            <RefreshCw size={14} className={activityLoading ? "animate-spin" : ""} /> REFRESH DATA
          </button>
          <LinkButton href={settings?.profileUrl ?? `https://github.com/${username}`} variant="primary" target="_blank" rel="noreferrer"><ExternalLink size={14} /> PROFILE</LinkButton>
        </div>
      </div>

      {loading && <Loader label="LOADING GITHUB DATA..." />}

      {activityError && !activity?.days?.length && (
        <div className="mt-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 font-mono text-[10px] leading-5 text-amber-700 dark:text-amber-300">
          Live GitHub sync is unavailable right now. The portfolio is using your cached contribution count. Configure <code>VITE_WORKER_API_URL</code> and the Worker GitHub secret for the full calendar.
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-base-border bg-base-near/80 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-base-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/5"><GithubIcon size={18} className="text-accent-cyan" /></span>
            <div>
              <p className="font-mono text-xs font-bold tracking-[0.2em] text-foreground">TELEMETRY LOGS // @{profile?.login ?? username}</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.16em] text-foreground-muted">LIVE CONTRIBUTION SYNC</p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-md border border-accent-green/30 bg-accent-green/5 px-3 py-1.5 font-mono text-[9px] tracking-widest text-accent-green"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" /> LIVE SYNC</span>
        </div>

        <div className="grid gap-0 border-b border-base-border sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, note, icon: Icon }) => (
            <div key={label} className="border-b border-base-border p-5 last:border-b-0 sm:last:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.12em] text-accent-cyan"><Icon size={14} /> {label}</div>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{value}</p>
              <p className="mt-1 font-mono text-[9px] leading-4 text-foreground-muted">{note}</p>
            </div>
          ))}
        </div>

        <div className="p-5 sm:p-7">
          <GithubHeatmap days={activity?.days ?? []} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <GlowCard>
          <div className="flex items-center gap-3"><Users size={18} className="text-accent-cyan" /><span className="font-mono text-xs tracking-[0.18em] text-foreground-muted">PROFILE SIGNALS</span></div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-base-border bg-base-panel p-4"><b className="font-display text-2xl text-foreground">{profile?.publicRepos ?? "—"}</b><span className="mt-1 block font-mono text-[9px] text-foreground-muted">REPOS</span></div>
            <div className="rounded-xl border border-base-border bg-base-panel p-4"><b className="font-display text-2xl text-foreground">{profile?.followers ?? "—"}</b><span className="mt-1 block font-mono text-[9px] text-foreground-muted">FOLLOWERS</span></div>
            <div className="rounded-xl border border-base-border bg-base-panel p-4"><b className="font-display text-2xl text-foreground">{profile?.following ?? "—"}</b><span className="mt-1 block font-mono text-[9px] text-foreground-muted">FOLLOWING</span></div>
          </div>
          {profile?.bio && <p className="mt-5 text-sm leading-6 text-foreground-muted">{profile.bio}</p>}
        </GlowCard>
        <GlowCard>
          <div className="flex items-center gap-3"><GitFork size={18} className="text-accent-cyan" /><span className="font-mono text-xs tracking-[0.18em] text-foreground-muted">GITHUB PROFILE</span></div>
          <p className="mt-3 font-display text-2xl font-semibold text-foreground">@{profile?.login ?? username}</p>
          <p className="mt-2 text-sm leading-6 text-foreground-muted">Open-source work, repositories, commits and contribution history are connected to the profile above.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href={settings?.profileUrl ?? `https://github.com/${username}`} variant="outline" target="_blank" rel="noreferrer">VIEW PROFILE</LinkButton>
            <LinkButton href={`https://github.com/${username}?tab=repositories`} variant="ghost" target="_blank" rel="noreferrer">EXPLORE REPOSITORIES</LinkButton>
          </div>
        </GlowCard>
      </div>
    </Container>
  );
}
