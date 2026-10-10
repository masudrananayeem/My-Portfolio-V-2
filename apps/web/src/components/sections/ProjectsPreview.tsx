
import { Link } from "react-router-dom";
import {
  Container,
  SectionLabel,
  GlowCard,
  Loader,
  EmptyState,
} from "@nayeem/ui";
import { useProjects } from "../../hooks/useFirestoreData";
import { ArrowUpRight, Eye, ExternalLink } from "lucide-react";

export function ProjectsPreview() {
  const { data, loading } = useProjects();

  const projects = (data ?? []).slice(0, 3);

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-accent-cyan/[0.04] blur-[100px]"
      />

      <Container className="relative">
        {/* Section heading */}
        <div className="mb-10 flex items-end justify-between gap-5 md:mb-14">
          <div>
            <SectionLabel
              index="03"
              label="Selected Work"
              className="mb-5"
            />

            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Projects that turn
              <span className="text-accent-cyan">
                {" "}ideas into reality.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-foreground-muted sm:text-base">
              A selection of products, experiments, and digital experiences
              I have built with purpose and attention to detail.
            </p>
          </div>

          {/* View all projects */}
          <Link
            to="/projects"
            className="group hidden shrink-0 items-center gap-2 border-b border-base-border pb-2 font-mono text-xs tracking-[0.16em] text-foreground-muted transition-colors hover:border-accent-cyan hover:text-accent-cyan sm:inline-flex"
          >
            VIEW ALL PROJECTS
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Loading state */}
        {loading && <Loader label="LOADING PROJECTS..." />}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <EmptyState
            title="NO PROJECTS YET"
            hint="Published projects will appear here."
          />
        )}

        {/* Featured project cards */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                aria-label={`View details for ${project.title}`}
                className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <GlowCard className="h-full overflow-hidden p-0 transition-transform duration-300 group-hover:-translate-y-1">
                  {/* Project image */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-base-panel">
                    {project.images?.[0]?.url ? (
                      <img
                        src={project.images[0].url}
                        alt={project.images[0].alt ?? project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-mono text-xs tracking-[0.3em] text-foreground-faint">
                          PROJECT {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}

                    {/* Image overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Project number */}
                    <span className="absolute left-4 top-4 font-mono text-xs tracking-widest text-white/80">
                      / {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Category badge */}
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-wider text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Project information */}
                  <div className="flex h-full flex-col p-5 sm:p-6">
                    <h3 className="font-display text-xl font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent-cyan">
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground-muted">
                      {project.description}
                    </p>

                    {/* Footer and action buttons */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-base-border pt-4">
                      <span className="font-mono text-[10px] tracking-[0.12em] text-foreground-faint">
                        YEAR: {project.year || "FEATURED"}
                      </span>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Details button */}
                        <span className="inline-flex items-center gap-2 border border-base-border px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-foreground transition-colors group-hover:border-accent-cyan group-hover:text-accent-cyan">
                          <Eye size={13} />
                          VIEW DETAILS
                        </span>

                        {/* Live website button */}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            aria-label={`Visit ${project.title} live website`}
                            className="relative z-10 inline-flex items-center gap-2 border border-base-border px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-foreground-muted transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                          >
                            LIVE
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-8 sm:hidden">
          <Link
            to="/projects"
            className="flex w-full items-center justify-between border border-base-border px-5 py-4 font-mono text-xs tracking-widest text-foreground-muted transition-colors hover:border-accent-cyan hover:text-accent-cyan"
          >
            VIEW ALL PROJECTS
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default ProjectsPreview;
