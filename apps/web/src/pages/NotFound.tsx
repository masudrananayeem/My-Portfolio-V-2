import { Link } from "react-router-dom";
import { Container } from "@nayeem/ui";

export function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">SYSTEM ERROR</p>
      <h1 className="mt-4 font-display text-7xl font-bold">404</h1>
      <p className="mt-2 font-mono text-sm tracking-widest text-foreground-muted">PAGE NOT FOUND</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 border border-base-border px-6 py-3 font-mono text-xs tracking-[0.2em] hover:border-accent-cyan hover:text-accent-cyan"
      >
        RETURN TO SYSTEM
      </Link>
    </Container>
  );
}
