import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container, SectionLabel, GlowCard, Loader, EmptyState } from "@nayeem/ui";
import { useProjects } from "../hooks/useFirestoreData";
import { cn } from "@nayeem/utils";
import { Github, ExternalLink, Search, ArrowUpRight } from "lucide-react";

export function Projects() {
  const { data, loading, error } = useProjects();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const categories = useMemo(() => ["all", ...Array.from(new Set((data ?? []).map((p) => p.category).filter(Boolean)))], [data]);
  const filtered = useMemo(() => (data ?? []).filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const q = search.trim().toLowerCase();
    return matchesCategory && (!q || [p.title, p.description, p.category, ...(p.technologies ?? [])].join(" ").toLowerCase().includes(q));
  }), [data, category, search]);

  return <Container className="py-16 sm:py-20 lg:py-24">
    <SectionLabel index="03" label="PROJECTS" className="mb-6" />
    <div className="flex flex-wrap items-end justify-between gap-5"><div><h1 className="font-display text-4xl font-bold sm:text-5xl">Selected Work</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-foreground-muted">A curated collection of full-stack products, research-driven systems and engineering experiments.</p></div><div className="relative w-full sm:w-72"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-faint"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search projects…" className="w-full rounded-full border border-base-border bg-base-near/80 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-accent-cyan"/></div></div>
    <div className="mt-8 flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={cn("rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.16em] transition",category===c?"border-accent-cyan bg-accent-cyan/10 text-accent-cyan":"border-base-border text-foreground-muted hover:border-foreground-faint")}>{c.toUpperCase()}</button>)}</div>
    {loading && <Loader label="LOADING PROJECTS…"/>}
    {error && !loading && <GlowCard className="mt-8 border-red-400/30"><p className="text-sm text-red-300">Unable to load projects: {error}</p></GlowCard>}
    {!loading && !filtered.length && <div className="mt-10"><EmptyState title="NO PROJECTS FOUND" hint="Add published projects from the admin dashboard or adjust your search/filter."/></div>}
    <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{filtered.map((p)=><Link key={p.id} to={`/projects/${p.slug}`} className="group h-full"><GlowCard className="h-full overflow-hidden p-0 transition duration-500 group-hover:-translate-y-1 group-hover:border-accent-cyan/40"><div className="relative overflow-hidden"><div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80"/>{p.images?.[0]?.url?<img src={p.images[0].url} alt={p.images[0].alt??p.title} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.045]"/>:<div className="aspect-[16/10] bg-base-panel"/>}<div className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white backdrop-blur">{p.category.toUpperCase()}</div><div className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"><ArrowUpRight size={16}/></div></div><div className="flex min-h-[250px] flex-col p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-2xl font-semibold leading-tight">{p.title}</h3><span className="font-mono text-[10px] text-foreground-faint">{p.year}</span></div><p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground-muted">{p.description}</p><div className="mt-5 flex flex-wrap gap-2">{p.technologies.slice(0,6).map(t=><span key={t} className="rounded-full border border-base-border px-3 py-1.5 text-[11px] text-foreground-muted">{t}</span>)}</div><div className="mt-auto flex gap-4 pt-6">{p.githubUrl&&<span className="inline-flex items-center gap-1.5 text-xs text-foreground-muted"><Github size={15}/> GitHub</span>}{p.liveUrl&&<span className="inline-flex items-center gap-1.5 text-xs text-foreground-muted"><ExternalLink size={15}/> Live</span>}</div></div></GlowCard></Link>)}</div>
  </Container>;
}
