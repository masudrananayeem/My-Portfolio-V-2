import { useParams, Link } from "react-router-dom";
import { Container, LinkButton, Loader, EmptyState } from "@nayeem/ui";
import { useProjects } from "../hooks/useFirestoreData";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

export function ProjectDetail() {
  const { slug } = useParams();
  const { data: projects, loading } = useProjects();
  const project = (projects ?? []).find((p) => p.slug === slug);

  if (loading) return <Loader label="LOADING PROJECT..." />;
  if (!project) {
    return (
      <Container className="py-24">
        <EmptyState title="PROJECT NOT FOUND" hint={`No project matches "${slug}".`} />
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-accent-cyan">
          <ArrowLeft size={14} /> BACK TO PROJECTS
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-24">
      <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-foreground-muted hover:text-accent-cyan">
        <ArrowLeft size={14} /> BACK TO PROJECTS
      </Link>

      <p className="mt-6 font-mono text-xs tracking-[0.2em] text-accent-cyan">
        {project.category.toUpperCase()} · {project.year}
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-foreground-muted">{project.longDescription ?? project.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.githubUrl && (
          <LinkButton href={project.githubUrl} variant="outline" target="_blank" rel="noreferrer">
            <Github size={14} /> GITHUB
          </LinkButton>
        )}
        {project.liveUrl && (
          <LinkButton href={project.liveUrl} variant="primary" target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> LIVE DEMO
          </LinkButton>
        )}
      </div>

      {/* Gallery placeholder — build zoom/fullscreen/swipe gallery here using project.images */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {project.images?.map((img) => (
          <img key={img.publicId} src={img.url} alt={img.alt ?? project.title} className="rounded-xl border border-base-border" />
        ))}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {project.problem && (
          <section>
            <h2 className="font-display text-xl font-semibold">Problem</h2>
            <p className="mt-2 text-sm text-foreground-muted">{project.problem}</p>
          </section>
        )}
        {project.solutionText && (
          <section>
            <h2 className="font-display text-xl font-semibold">Solution</h2>
            <p className="mt-2 text-sm text-foreground-muted">{project.solutionText}</p>
          </section>
        )}
        {project.features && project.features.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold">Features</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-foreground-muted">
              {project.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </section>
        )}
        {project.architecture && (
          <section>
            <h2 className="font-display text-xl font-semibold">Architecture</h2>
            <p className="mt-2 text-sm text-foreground-muted">{project.architecture}</p>
          </section>
        )}
        {project.challenges && (
          <section>
            <h2 className="font-display text-xl font-semibold">Challenges</h2>
            <p className="mt-2 text-sm text-foreground-muted">{project.challenges}</p>
          </section>
        )}
        {project.results && (
          <section>
            <h2 className="font-display text-xl font-semibold">Results</h2>
            <p className="mt-2 text-sm text-foreground-muted">{project.results}</p>
          </section>
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <span key={t} className="rounded-full border border-base-border px-3 py-1.5 font-mono text-xs text-foreground-muted">{t}</span>
        ))}
      </div>
    </Container>
  );
}
