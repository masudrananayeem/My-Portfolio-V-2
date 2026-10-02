import { FolderGit2, GraduationCap, Briefcase } from "lucide-react";

const STATS = [
  { icon: FolderGit2, value: "6+", label: "PROJECTS SHIPPED" },
  { icon: GraduationCap, value: "2026", label: "B.SC. CSE, DIU" },
  { icon: Briefcase, value: "OPEN", label: "FULL-TIME / CONTRACT" },
];

/** Quick trust signals under the hero CTAs — the kind of proof points that
 *  make a visitor think "this person is hireable" at a glance. */
export function TrustStats() {
  return (
    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-base-border pt-6">
      {STATS.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-base-border bg-base-panel/60 text-accent-cyan">
            <s.icon size={16} />
          </div>
          <div>
            <p className="font-display text-base font-bold leading-none text-foreground">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] tracking-widest text-foreground-faint">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
