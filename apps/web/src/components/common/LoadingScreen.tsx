import { useEffect, useState } from "react";

const STEPS = ["BOOTING CORE...", "LOADING MODULES...", "SYNCING PORTFOLIO...", "SYSTEM READY"];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (stepIndex < STEPS.length - 1) {
      const timer = setTimeout(() => setStepIndex((value) => value + 1), 420);
      return () => clearTimeout(timer);
    }

    const exitTimer = setTimeout(() => setExiting(true), 520);
    const doneTimer = setTimeout(onDone, 980);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [stepIndex, onDone]);

  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-base-black transition-all duration-700 ${
        exiting ? "pointer-events-none scale-[1.04] opacity-0" : "opacity-100"
      }`}
    >
      <div className="loading-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="loading-orbit pointer-events-none absolute h-64 w-64 rounded-full border border-accent-cyan/10" />

      <div className="relative flex flex-col items-center">
        <div className="loading-logo-shell relative flex h-24 w-24 items-center justify-center rounded-2xl border border-accent-cyan/40 bg-base-panel/80 shadow-[0_0_70px_rgb(var(--accent-primary)/0.18)]">
          <div className="absolute inset-2 rounded-xl border border-base-border" />
          <span className="font-tech text-2xl font-black tracking-[0.18em] text-foreground">M<span className="text-accent-cyan">R</span>N</span>
          <span className="absolute -bottom-2 rounded-full border border-base-border bg-base-black px-2 py-0.5 font-mono text-[8px] tracking-[0.25em] text-foreground-muted">PORTFOLIO</span>
        </div>

        <div className="mt-10 flex items-center gap-2 font-mono text-[11px] tracking-[0.28em] text-accent-cyan">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cyan" />
          {STEPS[stepIndex]}
        </div>

        <div className="mt-5 h-px w-56 overflow-hidden bg-base-border">
          <div className="h-full bg-accent-cyan transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex w-56 justify-between font-mono text-[8px] tracking-widest text-foreground-faint">
          <span>MRN.SYS</span>
          <span>{String(Math.round(progress)).padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
