import { cn } from "@nayeem/utils";

interface SectionLabelProps {
  index: string; // "01"
  label: string; // "ABOUT"
  className?: string;
}

/** Technical section marker, e.g. "01 / ABOUT" */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent-cyan/80", className)}>
      <span className="h-px w-8 bg-accent-cyan/50" />
      {index} / {label.toUpperCase()}
    </div>
  );
}
