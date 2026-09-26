import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, SectionLabel, GlowCard, Loader, EmptyState } from "@nayeem/ui";
import { useProjects } from "../hooks/useFirestoreData";
import { cn } from "@nayeem/utils";

export function Projects() {
  const { data, loading } = useProjects();
  const [category, setCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set((data ?? []).map((p) => p.category)))];
  const filtered = (data ?? []).filter((p) => category === "all" || p.category === category);

  return (
    <Container className="py-24">
      <SectionLabel index="03" label="Projects" className="mb-6" />
      <h1 className="font-display text-4xl font-bold">Projects</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-widest transition-colors",
              category === c
                ? "border-accent-cyan text-accent-cyan"
                : "border-base-border text-foreground-muted hover:text-foreground"
            )}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <Loader label="LOADING PROJECTS..." />}
      {!loading && filtered.length === 0 && (
        <div className="mt-10">
          <EmptyState title="NO PROJECTS YET" hint="Add projects from the admin dashboard." />
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link key={project.id} to={`/projects/${project.slug}`}>
            <GlowCard className="h-full">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent-cyan">
                {project.category.toUpperCase()} · {project.year}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full border border-base-border px-3 py-1 font-mono text-[10px] text-foreground-muted">{t}</span>
                ))}
              </div>
            </GlowCard>
          </Link>
        ))}
      </div>
    </Container>
  );
}
