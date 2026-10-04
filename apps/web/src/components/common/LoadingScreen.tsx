import { useEffect, useState } from "react";

const STEPS = ["INITIALIZING SYSTEM...", "LOADING MODULES...", "CONNECTING DATA...", "SYSTEM READY"];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (stepIndex < STEPS.length - 1) {
      const t = setTimeout(() => setStepIndex((i) => i + 1), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setExiting(true), 350);
    const t2 = setTimeout(onDone, 700);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [stepIndex, onDone]);


  
  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base-black transition-opacity duration-500 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="font-mono text-sm tracking-[0.3em] text-accent-cyan">{STEPS[stepIndex]}</div>
      <div className="mt-6 h-px w-48 overflow-hidden bg-base-border">
        <div
          className="h-full bg-accent-cyan transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
