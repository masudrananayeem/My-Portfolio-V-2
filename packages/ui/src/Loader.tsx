export function Loader({ label = "LOADING..." }: { label?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-base-border border-t-accent-cyan" />
        <span className="font-mono text-xs tracking-[0.2em] text-foreground-muted">{label}</span>
      </div>
    </div>
  );
}
