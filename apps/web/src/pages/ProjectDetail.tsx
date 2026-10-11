import { useParams, Link } from "react-router-dom";
import { Container, LinkButton, Loader, EmptyState } from "@nayeem/ui";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Layers3,
  Sparkles,
  Target,
  Lightbulb,
  CheckCircle2,
  Boxes,
  Trophy,
  Image as ImageIcon,
} from "lucide-react";
import { useProjects } from "../hooks/useFirestoreData";

export function ProjectDetail() {
  const { slug } = useParams();
  const { data: projects, loading } = useProjects();
  const project = (projects ?? []).find((item) => item.slug === slug);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader label="LOADING PROJECT..." />
      </div>
    );
  }

  if (!project) {
    return (
      <Container className="py-24">
        <div className="mx-auto max-w-xl rounded-3xl border border-base-border bg-base-surface p-8 text-center sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-base-border bg-base-bg">
            <Code2 size={25} className="text-accent-cyan" />
          </div>
          <EmptyState
            title="PROJECT NOT FOUND"
            hint={`No project matches "${slug ?? "unknown"}".`}
          />
          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-base-border px-5 py-3 font-mono text-xs transition-colors hover:border-accent-cyan hover:text-accent-cyan"
          >
            <ArrowLeft size={15} />
            BACK TO PROJECTS
          </Link>
        </div>
      </Container>
    );
  }

  const images = (project.images ?? []).filter((image) => Boolean(image.url));
  const technologies = project.technologies ?? [];
  const features = project.features ?? [];

  const overviewSections = [
    { title: "The Problem", description: project.problem, icon: Target, number: "01" },
    { title: "The Solution", description: project.solutionText, icon: Lightbulb, number: "02" },
    { title: "Architecture", description: project.architecture, icon: Boxes, number: "03" },
    { title: "Challenges", description: project.challenges, icon: Layers3, number: "04" },
    { title: "Results & Impact", description: project.results, icon: Trophy, number: "05" },
  ].filter((section) => Boolean(section.description));

  return (
    <main className="pb-20 sm:pb-28">
      <Container className="pt-8 sm:pt-12">
        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-foreground-muted transition-colors hover:text-accent-cyan"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            ALL PROJECTS
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-base-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            PROJECT SHOWCASE
          </span>
        </div>

        {/* Hero */}
        <section className="relative mt-10 overflow-hidden rounded-3xl border border-base-border bg-base-surface p-6 sm:mt-14 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-cyan/10 blur-3xl"
          />
          <div className="relative max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-cyan">
                {project.category || "Project"}
              </span>
              {project.year && (
                <span className="font-mono text-xs text-foreground-muted">{project.year}</span>
              )}
            </div>

            <h1 className="mt-6 max-w-4xl break-words font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {project.title}<span className="text-accent-cyan">.</span>
            </h1>
            <p className="mt-6 max-w-3xl whitespace-pre-line text-sm leading-7 text-foreground-muted sm:text-base sm:leading-8">
              {project.longDescription ?? project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <LinkButton href={project.liveUrl} variant="primary" target="_blank" rel="noreferrer">
                  <ExternalLink size={15} />
                  LIVE DEMO
                  <ArrowUpRight size={14} />
                </LinkButton>
              )}
              {project.githubUrl && (
                <LinkButton href={project.githubUrl} variant="outline" target="_blank" rel="noreferrer">
                  <Github size={15} />
                  VIEW SOURCE
                  <ArrowUpRight size={14} />
                </LinkButton>
              )}
            </div>
          </div>

          <div className="relative mt-10 flex items-center gap-2 border-t border-base-border pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted sm:mt-12">
            <Sparkles size={14} className="text-accent-cyan" />
            Designed, developed & documented
          </div>
        </section>

        {/* Project Gallery */}
        {images.length > 0 && (
          <section className="mt-14 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">VISUAL SHOWCASE</p>
                <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Project Gallery</h2>
              </div>
              <span className="flex items-center gap-2 font-mono text-xs text-foreground-muted">
                <ImageIcon size={14} />
                {images.length} {images.length === 1 ? "IMAGE" : "IMAGES"}
              </span>
            </div>

            <div className={images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-1 gap-4 md:grid-cols-2"}>
              {images.map((image, index) => (
                <figure
                  key={image.publicId || `${image.url}-${index}`}
                  className={`group overflow-hidden rounded-2xl border border-base-border bg-base-surface ${
                    index === 0 && images.length > 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${project.title} screenshot ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
                      index === 0 && images.length > 2 ? "max-h-[620px] object-contain" : "max-h-[480px]"
                    }`}
                  />
                  {image.alt && (
                    <figcaption className="border-t border-base-border px-4 py-3 text-xs text-foreground-muted">
                      {image.alt}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Project Overview */}
        {overviewSections.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <div className="mb-8 max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">BEHIND THE BUILD</p>
              <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Project Overview</h2>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">
                Explore the thinking, technical decisions, and outcomes behind this project.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {overviewSections.map((section) => {
                const Icon = section.icon;
                return (
                  <article
                    key={section.number}
                    className="rounded-2xl border border-base-border bg-base-surface p-5 transition-colors hover:border-accent-cyan/40 sm:p-7"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-base-border bg-base-bg">
                        <Icon size={18} className="text-accent-cyan" />
                      </div>
                      <span className="font-mono text-xs text-foreground-muted">{section.number}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">{section.title}</h3>
                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-foreground-muted">
                      {section.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Features */}
        {features.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="mb-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">WHAT IT OFFERS</p>
              <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Key Features</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-base-border bg-base-surface p-4"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-cyan" />
                  <span className="text-sm leading-6">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technology Stack */}
        {technologies.length > 0 && (
          <section className="mt-16 rounded-3xl border border-base-border bg-base-surface p-6 sm:mt-20 sm:p-9">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-base-border bg-base-bg">
                <Code2 size={20} className="text-accent-cyan" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">TOOLS & TECHNOLOGIES</p>
                <h2 className="mt-2 font-display text-xl font-semibold sm:text-2xl">Built With</h2>
                <p className="mt-2 text-sm leading-6 text-foreground-muted">
                  The technologies used to build and deliver this project.
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-base-border bg-base-bg px-3 py-2 font-mono text-xs text-foreground-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
                >
                  {technology}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-base-border pt-8 sm:mt-20 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold">Want to explore more?</p>
            <p className="mt-1 text-sm text-foreground-muted">Discover other projects and experiments.</p>
          </div>
          <Link
            to="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-base-border px-5 py-3 font-mono text-xs tracking-wider transition-colors hover:border-accent-cyan hover:text-accent-cyan"
          >
            <ArrowLeft size={15} />
            BACK TO PROJECTS
          </Link>
        </div>
      </Container>
    </main>
  );
}
