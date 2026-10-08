import { Link } from "react-router-dom";
import {
  Container,
  SectionLabel,
  GlowCard,
  LinkButton,
  Loader,
  EmptyState,
} from "@nayeem/ui";
import { useProjects } from "../../hooks/useFirestoreData";

export function ProjectsPreview() {
  const { data: projects, loading } = useProjects();

  const featured = (projects ?? [])
    .filter((p) => p.featured)
    .slice(0, 3);

  return (
    <section className="py-24">
      <Container>
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <SectionLabel index="03" label="PROJECTS" />

          <LinkButton
            href="/projects"
            variant="ghost"
            className="hidden md:inline-flex"
          >
            VIEW ALL →
          </LinkButton>
        </div>

        {/* Loading */}
        {loading && <Loader label="LOADING PROJECTS..." />}

        {/* Empty */}
        {!loading && featured.length === 0 && (
          <EmptyState
            title="NO FEATURED PROJECTS YET"
            hint="Add and feature projects from the admin dashboard."
          />
        )}

        {/* Project Grid */}
        {!loading && featured.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group block"
              >
                <GlowCard className="h-full overflow-hidden p-0">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    {project.images?.[0]?.url ? (
                      <img
                        src={project.images[0].url}
                        alt={project.images[0].alt ?? project.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center bg-base-panel">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
                          NO IMAGE
                        </span>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[10px] text-white backdrop-blur">
                      {project.category.toUpperCase()}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-base-border" />

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-semibold transition-colors duration-300 group-hover:text-accent-cyan">
                          {project.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground-muted">
                          {project.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <span className="mt-1 shrink-0 font-mono text-sm text-foreground-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-cyan">
                        ↗
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center md:hidden">
          <LinkButton href="/projects" variant="ghost">
            VIEW ALL →
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}