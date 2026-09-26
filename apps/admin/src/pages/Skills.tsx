import { GlowCard } from "@nayeem/ui";

/**
 * Scaffold page — follow the same CRUD pattern as pages/Projects.tsx
 * (getCollection -> local state -> form modal -> createDocument /
 * updateDocument / deleteDocument) once this collection's fields are
 * finalized. Collection name: see packages/firebase/src/collections.ts.
 */
export function SkillsAdmin() {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Skills</h1>
      <GlowCard className="mt-8">
        <p className="text-sm text-foreground-muted">
          Scaffold ready — wire this page up using the same pattern as the Projects admin page.
        </p>
      </GlowCard>
    </div>
  );
}
