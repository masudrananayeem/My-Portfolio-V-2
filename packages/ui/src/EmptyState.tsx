export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-base-border py-16 text-center">
      <p className="font-mono text-sm tracking-widest text-foreground-muted">{title}</p>
      {hint && <p className="text-xs text-foreground-faint">{hint}</p>}
    </div>
  );
}
