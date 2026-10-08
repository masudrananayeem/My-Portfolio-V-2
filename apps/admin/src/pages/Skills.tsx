import { useEffect, useState } from "react";
import { COLLECTIONS, createDocument, deleteDocument, getCollection, orderBy } from "@nayeem/firebase";
import { Button, EmptyState, GlowCard, Loader } from "@nayeem/ui";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import type { Skill, SkillCategory } from "@nayeem/types";

const seedSkills: Omit<Skill, "id">[] = [
  ["JavaScript","languages"],["TypeScript","languages"],["Python","languages"],["C / C++","languages"],
  ["React","frontend"],["Next.js","frontend"],["HTML5","frontend"],["CSS3","frontend"],["Tailwind CSS","frontend"],["Framer Motion","frontend"],
  ["Node.js","backend"],["Express.js","backend"],["REST APIs","backend"],["Authentication","backend"],["WebSockets","backend"],
  ["MongoDB","database"],["Firebase / Firestore","database"],["SQL","database"],["Redis","database"],
  ["Cloudflare Workers / Pages","cloud"],["Vercel","cloud"],["Render","cloud"],
  ["Docker","devops"],["CI/CD","devops"],["GitHub Actions","devops"],
  ["Machine Learning","ai-ml"],["Deep Learning","ai-ml"],["Computer Vision","ai-ml"],["PyTorch","ai-ml"],["TensorFlow","ai-ml"],["Scikit-learn","ai-ml"],
  ["NumPy / Pandas","data"],["Data Preprocessing","data"],["Data Visualization","data"],
  ["Jest / Unit Testing","testing"],["Postman / API Testing","testing"],
  ["Web Security Basics","security"],["JWT / RBAC","security"],
  ["Git / GitHub","tools"],["Vite","tools"],["npm","tools"],["VS Code","tools"],
  ["Software Architecture","architecture"],["Design Patterns","architecture"],["System Design","architecture"],
].map(([name, category], index) => ({ name, category: category as SkillCategory, icon: "", order: index + 1 }));

export function SkillsAdmin() {
  const [items, setItems] = useState<(Skill & { id: string })[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const load = async () => { setError(""); try { setItems(await getCollection<Skill>(COLLECTIONS.skills, [orderBy("order", "asc")])); } catch (e) { setError(e instanceof Error ? e.message : "Unable to load skills."); setItems([]); } };
  useEffect(() => { void load(); }, []);
  const seed = async () => { setBusy(true); setError(""); try { const existing = await getCollection<Skill>(COLLECTIONS.skills); const names = new Set(existing.map(x => x.name)); for (const item of seedSkills) if (!names.has(item.name)) await createDocument(COLLECTIONS.skills, item); await load(); } catch (e) { setError(e instanceof Error ? e.message : "Unable to seed skills."); } finally { setBusy(false); } };
  const remove = async (id: string) => { if (!confirm("Delete this skill?")) return; setBusy(true); try { await deleteDocument(COLLECTIONS.skills, id); await load(); } catch (e) { setError(e instanceof Error ? e.message : "Delete failed."); } finally { setBusy(false); } };
  return <div><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS / SKILLS</p><h1 className="mt-2 font-display text-3xl font-bold">Skills</h1><p className="mt-1 text-sm text-foreground-muted">Manage the full-stack and AI/ML skill set displayed inside About.</p></div><div className="flex gap-2"><button onClick={() => void load()} className="rounded-lg border border-base-border p-2 hover:border-accent-cyan" title="Reload"><RefreshCw size={17}/></button><Button onClick={() => void seed()} disabled={busy}><Plus size={14}/>{busy ? "WORKING…" : "SEED FULL STACK + AI/ML"}</Button></div></div>{error && <GlowCard className="mt-5 border-red-400/30"><p className="text-sm text-red-300">{error}</p></GlowCard>}{!items ? <Loader label="LOADING SKILLS…"/> : items.length===0 ? <div className="mt-8"><EmptyState title="NO SKILLS YET" hint="Click Seed Full Stack + AI/ML to add the recommended skill set, or create skills manually."/></div> : <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map(item=><GlowCard key={item.id} className="flex items-center justify-between gap-3"><div><p className="font-semibold">{item.name}</p><p className="mt-1 font-mono text-[10px] tracking-widest text-accent-cyan">{String(item.category).toUpperCase()}</p></div><button onClick={() => void remove(item.id)} disabled={busy} className="text-foreground-faint hover:text-red-400" title="Delete"><Trash2 size={15}/></button></GlowCard>)}</div>}</div>;
}
