import { useMemo } from "react";
import type { GithubContributionDay } from "../../hooks/useFirestoreData";

function level(count: number) {
  if (count <= 0) return "bg-base-panel";
  if (count <= 2) return "bg-accent-cyan/25";
  if (count <= 5) return "bg-accent-cyan/45";
  if (count <= 9) return "bg-accent-cyan/70";
  return "bg-accent-cyan";
}

export function GithubHeatmap({ days }: { days: GithubContributionDay[] }) {
  const byDate = useMemo(() => new Map(days.map((day) => [day.date, day.count])), [days]);
  const columns = useMemo(() => {
    const result: { date: string; count: number }[][] = [];
    if (!days.length) return result;
    const start = new Date(days[0].date);
    start.setDate(start.getDate() - start.getDay());
    for (let column = 0; column < 53; column++) {
      const week: { date: string; count: number }[] = [];
      for (let row = 0; row < 7; row++) {
        const date = new Date(start);
        date.setDate(start.getDate() + column * 7 + row);
        const key = date.toISOString().slice(0, 10);
        week.push({ date: key, count: byDate.get(key) ?? 0 });
      }
      result.push(week);
    }
    return result;
  }, [days, byDate]);

  if (!days.length) {
    return <div className="rounded-xl border border-base-border bg-base-panel/40 p-6 text-sm text-foreground-muted">
      Contribution calendar will appear here when the GitHub Worker is configured.
    </div>;
  }

  return (
    <div className="overflow-x-auto pb-2" aria-label="GitHub contribution calendar">
      <div className="grid min-w-[690px] grid-cols-[repeat(53,minmax(0,1fr))] gap-1">
        {columns.flatMap((week, wi) => week.map((cell) => (
          <div
            key={`${wi}-${cell.date}`}
            title={`${cell.count} contribution${cell.count === 1 ? "" : "s"} · ${cell.date}`}
            className={`aspect-square min-h-2 min-w-2 rounded-[3px] transition-transform hover:scale-125 ${level(cell.count)}`}
          />
        )))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 font-mono text-[9px] text-foreground-faint">
        LESS <span className="h-2.5 w-2.5 rounded-sm bg-base-panel" />
        <span className="h-2.5 w-2.5 rounded-sm bg-accent-cyan/25" />
        <span className="h-2.5 w-2.5 rounded-sm bg-accent-cyan/45" />
        <span className="h-2.5 w-2.5 rounded-sm bg-accent-cyan/70" />
        <span className="h-2.5 w-2.5 rounded-sm bg-accent-cyan" /> MORE
      </div>
    </div>
  );
}
