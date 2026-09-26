import { GlowCard, Loader } from "@nayeem/ui";
import { getCollection, COLLECTIONS } from "@nayeem/firebase";
import { useEffect, useState } from "react";

interface Counts {
  projects: number;
  featuredProjects: number;
  research: number;
  skills: number;
  techStack: number;
  messages: number;
  unreadMessages: number;
}

export function Dashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    (async () => {
      const [projects, research, skills, techStack, messages] = await Promise.all([
        getCollection<any>(COLLECTIONS.projects),
        getCollection<any>(COLLECTIONS.research),
        getCollection<any>(COLLECTIONS.skills),
        getCollection<any>(COLLECTIONS.techStack),
        getCollection<any>(COLLECTIONS.messages),
      ]);
      setCounts({
        projects: projects.length,
        featuredProjects: projects.filter((p) => p.featured).length,
        research: research.length,
        skills: skills.length,
        techStack: techStack.length,
        messages: messages.length,
        unreadMessages: messages.filter((m) => m.status === "unread").length,
      });
    })();
  }, []);

  if (!counts) return <Loader label="LOADING DASHBOARD..." />;

  const cards: { label: string; value: number }[] = [
    { label: "Projects", value: counts.projects },
    { label: "Featured Projects", value: counts.featuredProjects },
    { label: "Research", value: counts.research },
    { label: "Skills", value: counts.skills },
    { label: "Tech Stack", value: counts.techStack },
    { label: "Messages", value: counts.messages },
    { label: "Unread Messages", value: counts.unreadMessages },
  ];

  return (
    <div>
      <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">OVERVIEW</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <GlowCard key={c.label}>
            <p className="font-mono text-[11px] tracking-widest text-foreground-muted">{c.label.toUpperCase()}</p>
            <p className="mt-2 font-display text-3xl font-bold">{c.value}</p>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
