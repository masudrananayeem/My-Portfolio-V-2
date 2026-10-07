import { useMemo } from "react";
import type { GithubContributionDay } from "../../hooks/useFirestoreData";

export interface GithubSummary {
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
}

export function summarizeGithubDays(days: GithubContributionDay[]): GithubSummary {
  if (!days.length) return { activeDays: 0, currentStreak: 0, longestStreak: 0 };

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const activeDays = sorted.filter((day) => day.count > 0).length;

  let longestStreak = 0;
  let running = 0;
  let previousActive: string | null = null;

  for (const day of sorted) {
    if (day.count <= 0) continue;
    if (previousActive) {
      const previous = new Date(`${previousActive}T00:00:00`);
      const current = new Date(`${day.date}T00:00:00`);
      const diff = Math.round((current.getTime() - previous.getTime()) / 86400000);
      running = diff === 1 ? running + 1 : 1;
    } else {
      running = 1;
    }
    longestStreak = Math.max(longestStreak, running);
    previousActive = day.date;
  }

  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  let currentStreak = 0;
  let cursorKey: string | null = days.some((day) => day.date === todayKey && day.count > 0)
    ? todayKey
    : days.some((day) => day.date === yesterdayKey && day.count > 0)
      ? yesterdayKey
      : null;

  const counts = new Map(days.map((day) => [day.date, day.count]));
  while (cursorKey && (counts.get(cursorKey) ?? 0) > 0) {
    currentStreak += 1;
    const cursor = new Date(`${cursorKey}T00:00:00`);
    cursor.setDate(cursor.getDate() - 1);
    cursorKey = cursor.toISOString().slice(0, 10);
  }

  return { activeDays, currentStreak, longestStreak };
}

function level(count: number) {
  if (count <= 0) return "bg-base-panel";
  if (count <= 2) return "bg-accent-cyan/25";
  if (count <= 5) return "bg-accent-cyan/45";
  if (count <= 9) return "bg-accent-cyan/70";
  return "bg-accent-cyan";
}

export function GithubHeatmap({ days }: { days: GithubContributionDay[] }) {
  const { columns, months } = useMemo(() => {
    if (!days.length) return { columns: [], months: [] as { label: string; index: number }[] };

    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
    const byDate = new Map(sorted.map((day) => [day.date, day.count]));
    const first = new Date(`${sorted[0].date}T00:00:00`);
    first.setDate(first.getDate() - first.getDay());

    const nextColumns: { date: string; count: number }[][] = [];
    const monthMarkers: { label: string; index: number }[] = [];
    let previousMonth = "";

    for (let column = 0; column < 53; column++) {
      const week: { date: string; count: number }[] = [];
      for (let row = 0; row < 7; row++) {
        const date = new Date(first);
        date.setDate(first.getDate() + column * 7 + row);
        const key = date.toISOString().slice(0, 10);
        week.push({ date: key, count: byDate.get(key) ?? 0 });
      }

      const firstDay = new Date(`${week[0].date}T00:00:00`);
      const monthKey = `${firstDay.getFullYear()}-${firstDay.getMonth()}`;
      if (monthKey !== previousMonth) {
        monthMarkers.push({
          index: column,
          label: firstDay.toLocaleString("en-US", { month: "short" }),
        });
        previousMonth = monthKey;
      }
      nextColumns.push(week);
    }

    return { columns: nextColumns, months: monthMarkers };
  }, [days]);

  if (!days.length) {
    return (
      <div className="rounded-xl border border-base-border bg-base-panel/40 p-6 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-accent-cyan">GITHUB WORKER REQUIRED</p>
            <h3 className="mt-2 font-display text-lg font-semibold text-foreground">Connect the Cloudflare Worker to show your real calendar.</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">
              Set <code className="rounded bg-base-panel px-1.5 py-0.5 font-mono text-xs text-foreground">GITHUB_USERNAME</code>,
              <code className="ml-1 rounded bg-base-panel px-1.5 py-0.5 font-mono text-xs text-foreground">GITHUB_TOKEN</code> and
              <code className="ml-1 rounded bg-base-panel px-1.5 py-0.5 font-mono text-xs text-foreground">ALLOWED_ORIGIN</code> in the Worker, deploy it, then put the Worker URL in
              <code className="ml-1 rounded bg-base-panel px-1.5 py-0.5 font-mono text-xs text-foreground">VITE_WORKER_API_URL</code>.
            </p>
          </div>
          <a href="https://github.com/masudrananayeem" target="_blank" rel="noreferrer" className="shrink-0 rounded-md border border-base-border px-3 py-2 font-mono text-[9px] tracking-widest text-foreground hover:border-accent-cyan hover:text-accent-cyan">VIEW GITHUB</a>
        </div>
        <div className="mt-5 grid gap-3 text-[10px] font-mono text-foreground-muted sm:grid-cols-3">
          <div className="rounded-lg border border-base-border p-3"><b className="text-foreground">01</b> Create a KV namespace named <span className="text-accent-cyan">GITHUB_CACHE</span>.</div>
          <div className="rounded-lg border border-base-border p-3"><b className="text-foreground">02</b> Run <span className="text-accent-cyan">wrangler secret put GITHUB_TOKEN</span>.</div>
          <div className="rounded-lg border border-base-border p-3"><b className="text-foreground">03</b> Deploy Worker and set its URL in the frontend <span className="text-accent-cyan">.env</span>.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="github-heatmap-shell" aria-label="GitHub contribution calendar">
      <div className="github-calendar-scroll overflow-x-auto pb-2">
        <div className="min-w-[790px] px-1">
          <div className="relative ml-10 h-6 font-mono text-[10px] text-foreground-muted">
            {months.map((month) => (
              <span
                key={`${month.label}-${month.index}`}
                className="absolute top-1"
                style={{ left: `${month.index * 15}px` }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            <div className="flex w-7 shrink-0 flex-col justify-between py-[1px] font-mono text-[9px] text-foreground-faint">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="flex gap-[3px]">
              {columns.map((week, weekIndex) => (
                <div key={weekIndex} className="flex w-[12px] flex-col gap-[3px]">
                  {week.map((cell) => (
                    <div
                      key={cell.date}
                      title={`${cell.count} contribution${cell.count === 1 ? "" : "s"} · ${cell.date}`}
                      className={`h-[12px] w-[12px] rounded-[3px] border border-black/5 transition duration-200 hover:scale-125 hover:z-10 ${level(cell.count)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-base-border pt-3 font-mono text-[9px] text-foreground-faint">
        <span>Learn how GitHub counts contributions · <span className="text-foreground-muted">Hover a day for details</span></span>
        <span className="flex items-center gap-1.5">
          LESS
          <span className="h-2.5 w-2.5 rounded-sm bg-base-panel" />
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-cyan/25" />
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-cyan/45" />
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-cyan/70" />
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-cyan" />
          MORE
        </span>
      </div>
    </div>
  );
}
