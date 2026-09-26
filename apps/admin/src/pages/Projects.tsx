import { useEffect, useState } from "react";
import {
  getCollection, createDocument, updateDocument, deleteDocument, COLLECTIONS, orderBy,
} from "@nayeem/firebase";
import type { Project } from "@nayeem/types";
import { slugify } from "@nayeem/utils";
import { Button, GlowCard, Loader, EmptyState } from "@nayeem/ui";
import { Plus, Pencil, Trash2, Star, X } from "lucide-react";

type ProjectDoc = Project & { id: string };

const emptyForm: Omit<Project, "id"> = {
  slug: "", title: "", description: "", longDescription: "", category: "Full Stack",
  year: new Date().getFullYear(), technologies: [], images: [], githubUrl: "", liveUrl: "",
  featured: false, order: 0, status: "published",
};

/**
 * Reference CRUD implementation — every other admin CMS page (Skills,
 * TechStack, Experience, Research, Services) follows this exact pattern:
 * getCollection -> local state, a form for create/edit, updateDocument /
 * createDocument on save, deleteDocument on delete.
 */
export function ProjectsAdmin() {
  const [projects, setProjects] = useState<ProjectDoc[] | null>(null);
  const [editing, setEditing] = useState<ProjectDoc | Omit<Project, "id"> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const data = await getCollection<Project>(COLLECTIONS.projects, [orderBy("order", "asc")]);
    setProjects(data);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const payload = { ...editing, slug: editing.slug || slugify(editing.title) };
    try {
      if ("id" in payload && payload.id) {
        const { id, ...rest } = payload;
        await updateDocument(COLLECTIONS.projects, id, rest);
      } else {
        await createDocument(COLLECTIONS.projects, payload);
      }
      setEditing(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await deleteDocument(COLLECTIONS.projects, id);
    await load();
  };

  const toggleFeatured = async (p: ProjectDoc) => {
    await updateDocument(COLLECTIONS.projects, p.id, { featured: !p.featured });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Projects</h1>
        </div>
        <Button onClick={() => setEditing(emptyForm)}>
          <Plus size={14} /> NEW PROJECT
        </Button>
      </div>

      {!projects && <Loader label="LOADING PROJECTS..." />}
      {projects && projects.length === 0 && (
        <div className="mt-8">
          <EmptyState title="NO PROJECTS YET" hint="Click 'New Project' to add your first one." />
        </div>
      )}

      <div className="mt-8 space-y-3">
        {(projects ?? []).map((p) => (
          <GlowCard key={p.id} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display font-semibold">{p.title}</p>
              <p className="font-mono text-[11px] text-foreground-muted">{p.category} · {p.year} · /{p.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleFeatured(p)} className={p.featured ? "text-accent-cyan" : "text-foreground-faint"} title="Toggle featured">
                <Star size={16} fill={p.featured ? "currentColor" : "none"} />
              </button>
              <button onClick={() => setEditing(p)} className="text-foreground-muted hover:text-foreground" title="Edit">
                <Pencil size={16} />
              </button>
              <button onClick={() => remove(p.id)} className="text-foreground-muted hover:text-red-400" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </GlowCard>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-xl border border-base-border bg-base-near p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                {"id" in editing ? "Edit Project" : "New Project"}
              </h2>
              <button onClick={() => setEditing(null)}><X size={18} /></button>
            </div>

            <div className="mt-4 space-y-3">
              <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Slug (auto if blank)" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <Field label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} />
              <Field label="Year" value={String(editing.year)} onChange={(v) => setEditing({ ...editing, year: Number(v) || editing.year })} />
              <Field label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} textarea />
              <Field
                label="Technologies (comma separated)"
                value={editing.technologies.join(", ")}
                onChange={(v) => setEditing({ ...editing, technologies: v.split(",").map((t) => t.trim()).filter(Boolean) })}
              />
              <Field label="GitHub URL" value={editing.githubUrl ?? ""} onChange={(v) => setEditing({ ...editing, githubUrl: v })} />
              <Field label="Live URL" value={editing.liveUrl ?? ""} onChange={(v) => setEditing({ ...editing, liveUrl: v })} />
              {/* Image upload: wire to Cloudinary unsigned upload widget/API here,
                  then push { url, publicId } into editing.images */}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setEditing(null)}>CANCEL</Button>
              <Button onClick={save} disabled={saving}>{saving ? "SAVING..." : "SAVE"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label, value, onChange, textarea = false,
}: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[11px] tracking-widest text-foreground-muted">{label.toUpperCase()}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-base-border bg-base-black px-3 py-2 text-sm outline-none focus:border-accent-cyan"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-base-border bg-base-black px-3 py-2 text-sm outline-none focus:border-accent-cyan"
        />
      )}
    </div>
  );
}
