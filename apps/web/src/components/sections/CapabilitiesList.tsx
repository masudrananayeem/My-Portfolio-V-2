import { Globe, Smartphone, Cloud, ShieldCheck, Zap } from "lucide-react";

const ITEMS = [
  { icon: Globe, label: "Web Applications", tag: "FRONTEND" },
  { icon: Smartphone, label: "Responsive Interfaces", tag: "UI / UX" },
  { icon: Cloud, label: "Cloud & Deployment", tag: "DEVOPS" },
  { icon: ShieldCheck, label: "Secure REST APIs", tag: "BACKEND" },
  { icon: Zap, label: "High Performance", tag: "CORE" },
];

/** Numbered capability list — robotic UI element (small technical labels, system-index style). */
export function CapabilitiesList() {
  return (
    <div className="rounded-xl border border-base-border bg-base-panel/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-widest text-foreground-muted">CAPABILITIES</span>
        <span className="font-mono text-[10px] text-foreground-faint">[ 05_SPECS ]</span>
      </div>
      <ul className="space-y-1">
        {ITEMS.map((item, i) => (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-base-black/40"
          >
            <span className="font-mono text-[10px] text-foreground-faint">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-base-border bg-base-black/60 text-accent-cyan">
              <item.icon size={13} />
            </span>
            <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
            <span className="font-mono text-[10px] text-foreground-faint">// {item.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
