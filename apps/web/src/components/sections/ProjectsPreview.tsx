import { Link } from "react-router-dom";
import { Container, SectionLabel, GlowCard, LinkButton, Loader, EmptyState } from "@nayeem/ui";
import { useProjects } from "../../hooks/useFirestoreData";

export function ProjectsPreview() {
  const { data: projects, loading } = useProjects();
  const featured = (projects ?? []).filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <SectionLabel index="03" label="PROJECTS" />
          <LinkButton href="/projects" variant="ghost" className="hidden md:inline-flex">VIEW ALL →</LinkButton>
        </div>

        {loading && <Loader label="LOADING PROJECTS..." />}
        {!loading && featured.length === 0 && (
          <EmptyState title="NO FEATURED PROJECTS YET" hint="Add and feature projects from the admin dashboard." />
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((project) => (
            <Link key={project.id} to={`/projects/${project.slug}`}>
              <GlowCard className="h-full">
                <p className="font-mono text-[11px] tracking-[0.2em] text-accent-cyan">{project.category.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full border border-base-border px-3 py-1 font-mono text-[10px] text-foreground-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
