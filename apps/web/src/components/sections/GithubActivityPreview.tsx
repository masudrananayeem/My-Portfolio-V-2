import { Container, SectionLabel, GlowCard, LinkButton, Loader } from "@nayeem/ui";
import { useGithubActivity, useGithubProfile, useGithubSettings } from "../../hooks/useFirestoreData";
import { GithubHeatmap, summarizeGithubDays } from "./GithubHeatmap";
import { Github, Flame, CalendarDays, Trophy, Activity } from "lucide-react";

export function GithubActivityPreview() {
  const { data: githubSettings } = useGithubSettings();
  const { data: activity, loading } = useGithubActivity(Boolean(githubSettings?.showContributions ?? true));
  const { data: profile } = useGithubProfile(true);
  const contributions = activity?.totalContributions ?? githubSettings?.cachedContributionCount ?? 829;
  const summary = summarizeGithubDays(activity?.days ?? []);

  const stats = [
    { label: "TOTAL", value: contributions.toLocaleString(), icon: Activity },
    { label: "ACTIVE DAYS", value: summary.activeDays.toLocaleString(), icon: CalendarDays },
    { label: "CURRENT STREAK", value: `${summary.currentStreak} DAYS`, icon: Flame },
    { label: "LONGEST STREAK", value: `${summary.longestStreak} DAYS`, icon: Trophy },
  ];

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel index="05" label="GITHUB ACTIVITY GRAPH" />
          <LinkButton href="/github" variant="outline">VIEW FULL GITHUB</LinkButton>
        </div>
        <GlowCard className="overflow-hidden p-5 sm:p-7">
          <div className="flex flex-col gap-3 border-b border-base-border pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Github size={21} className="text-accent-cyan" />
              <div>
                <p className="font-mono text-xs font-semibold tracking-[0.2em] text-foreground">TELEMETRY LOGS // @{profile?.login ?? githubSettings?.username ?? "github"}</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.16em] text-foreground-muted">LIVE CONTRIBUTION SYNC · LAST 12 MONTHS</p>
              </div>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-accent-green/30 bg-accent-green/5 px-3 py-1.5 font-mono text-[9px] tracking-widest text-accent-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" /> LIVE SYNC
            </span>
          </div>

          <div className="grid gap-4 border-b border-base-border py-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="group rounded-xl border border-base-border/80 bg-base-near/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40">
                <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.16em] text-accent-cyan"><Icon size={13} /> {label}</div>
                <p className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">{value}</p>
              </div>
            ))}
          </div>

          <div className="pt-6">
            {loading ? <Loader label="SYNCING GITHUB..." /> : <GithubHeatmap days={activity?.days ?? []} />}
          </div>
        </GlowCard>
      </Container>
    </section>
  );
}
