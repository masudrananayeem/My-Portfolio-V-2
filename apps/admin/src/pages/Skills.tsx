import { useEffect, useMemo, useState } from "react";
import { COLLECTIONS, createDocument, deleteDocument, getCollection } from "@nayeem/firebase";
import type { Skill, SkillCategory } from "@nayeem/types";
import { Button, EmptyState, GlowCard, Loader } from "@nayeem/ui";
import { Plus, RefreshCw, Trash2 } from "lucide-react";

const seedSkills: Omit<Skill, "id">[] = [
  ["JavaScript", "languages"], ["TypeScript", "languages"], ["Python", "languages"], ["C / C++", "languages"],
  ["React", "frontend"], ["Next.js", "frontend"], ["HTML5", "frontend"], ["CSS3", "frontend"], ["Tailwind CSS", "frontend"], ["Framer Motion", "frontend"],
  ["Node.js", "backend"], ["Express.js", "backend"], ["REST APIs", "backend"], ["Authentication", "backend"], ["WebSockets", "backend"],
  ["MongoDB", "database"], ["Firebase / Firestore", "database"], ["SQL", "database"], ["Redis", "database"],
  ["Cloudflare Workers / Pages", "cloud"], ["Vercel", "cloud"], ["Render", "cloud"],
  ["Docker", "devops"], ["CI/CD", "devops"], ["GitHub Actions", "devops"],
  ["Machine Learning", "ai-ml"], ["Deep Learning", "ai-ml"], ["Computer Vision", "ai-ml"], ["PyTorch", "ai-ml"], ["TensorFlow", "ai-ml"], ["Scikit-learn", "ai-ml"],
  ["NumPy / Pandas", "data"], ["Data Preprocessing", "data"], ["Data Visualization", "data"],
  ["Jest / Unit Testing", "testing"], ["Postman / API Testing", "testing"],
  ["Web Security Basics", "security"], ["JWT / RBAC", "security"],
  ["Git / GitHub", "tools"], ["Vite", "tools"], ["npm", "tools"], ["VS Code", "tools"],
  ["Software Architecture", "architecture"], ["Design Patterns", "architecture"], ["System Design", "architecture"],
].map(([name, category], index) => ({ name, category: category as SkillCategory, icon: "", order: index + 1 }));

const categories: SkillCategory[] = ["languages", "frontend", "backend", "database", "cloud", "devops", "ai-ml", "data", "testing", "security", "tools", "architecture"];

export function SkillsAdmin() {
  const [items, setItems] = useState<(Skill & { id: string })[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setError("");
    try {
      const data = await getCollection<Skill>(COLLECTIONS.skills);
      setItems([...data].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)));
    } catch (e) {
      setItems([]);
      setError(e instanceof Error ? e.message : "Unable to load skills.");
    }
  };

  useEffect(() => { void load(); }, []);

  const seed = async () => {
    setBusy(true); setError("");
    try {
      const existing = await getCollection<Skill>(COLLECTIONS.skills);
      const names = new Set(existing.map((x) => x.name.toLowerCase()));
      for (const item of seedSkills) {
        if (!names.has(item.name.toLowerCase())) await createDocument(COLLECTIONS.skills, item);
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to seed skills.");
    } finally { setBusy(false); }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this skill?")) return;
    setBusy(true); setError("");
    try { await deleteDocument(COLLECTIONS.skills, id); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Delete failed."); }
    finally { setBusy(false); }
  };

  const grouped = useMemo(() => categories.reduce<Record<string, (Skill & { id: string })[]>>((acc, category) => {
    acc[category] = (items ?? []).filter((item) => item.category === category);
    return acc;
  }, {}), [items]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS / SKILLS</p><h1 className="mt-2 font-display text-3xl font-bold">Skills</h1><p className="mt-1 text-sm text-foreground-muted">Manage the full-stack, AI/ML and engineering skills shown inside About.</p></div>
        <div className="flex gap-2"><button type="button" onClick={() => void load()} className="rounded-lg border border-base-border p-2 hover:border-accent-cyan"><RefreshCw size={17}/></button><Button type="button" onClick={() => void seed()} disabled={busy}><Plus size={14}/>{busy ? "WORKING…" : "SEED FULL STACK + AI/ML"}</Button></div>
      </div>
      {error && <GlowCard className="mt-5 border-red-400/30"><p className="text-sm text-red-300">{error}</p></GlowCard>}
      {!items ? <Loader label="LOADING SKILLS…"/> : items.length === 0 ? <div className="mt-8"><EmptyState title="NO SKILLS YET" hint="Click Seed Full Stack + AI/ML to populate the recommended set." /></div> : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const list = grouped[category] ?? [];
            if (!list.length) return null;
            return <GlowCard key={category}><p className="font-mono text-[10px] tracking-widest text-accent-cyan">{category.replace("ai-ml", "AI / ML").toUpperCase()}</p><div className="mt-4 space-y-2">{list.map((item) => <div key={item.id} className="flex items-center justify-between gap-3"><span className="text-sm">{item.name}</span><button type="button" disabled={busy} onClick={() => void remove(item.id)} className="text-foreground-faint hover:text-red-400"><Trash2 size={14}/></button></div>)}</div></GlowCard>;
          })}
        </div>
      )}
    </div>
  );
}
