import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { Button, GlowCard, Loader } from "@nayeem/ui";
import { COLLECTIONS, getDocument, setDocument } from "@nayeem/firebase";
import { CloudinaryUpload } from "../components/cms/CloudinaryUpload";
import type { Profile } from "@nayeem/types";

const defaults: Profile = {
  name: "Masud Rana Nayeem",
  role: "Full Stack Developer",
  roles: ["Full Stack Developer", "AI/ML Enthusiast", "Researcher"],
  tagline: "Building digital systems",
  bio: "",
  education: "B.Sc. in Computer Science & Engineering",
  university: "Daffodil International University",
  location: "Bangladesh",
  avatarUrl: "/profile-hero.png",
  resumeUrl: "/resume.pdf",
  availableForWork: true,
};

export function ProfileAdmin() {
  const [form, setForm] = useState<Profile>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true); setError("");
    try { const data = await getDocument<Profile>(COLLECTIONS.profile, "main"); if (data) setForm({ ...defaults, ...data }); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to load profile."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);

  const save = async () => {
    setSaving(true); setMessage(""); setError("");
    try { await setDocument(COLLECTIONS.profile, "main", form); setMessage("Profile saved. The public website will use these values on the next load."); }
    catch (e) { setError(e instanceof Error ? e.message : "Save failed."); }
    finally { setSaving(false); }
  };

  if (loading) return <Loader label="LOADING PROFILE…" />;

  return <div>
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS / PROFILE</p><h1 className="mt-2 font-display text-3xl font-bold">Profile</h1><p className="mt-1 text-sm text-foreground-muted">Control the identity, hero copy, profile image and resume shown across the portfolio.</p></div><button onClick={() => void load()} className="rounded-lg border border-base-border p-2 hover:border-accent-cyan"><RefreshCw size={17} /></button></div>
    <GlowCard className="mt-8 max-w-4xl"><div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Input label="Primary Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
        <Input label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
        <Input label="Location" value={form.location ?? ""} onChange={(v) => setForm({ ...form, location: v })} />
        <Input label="Education" value={form.education} onChange={(v) => setForm({ ...form, education: v })} />
        <Input label="University" value={form.university} onChange={(v) => setForm({ ...form, university: v })} />
      </div>
      <Textarea label="Roles (one per line)" value={form.roles.join("\n")} onChange={(v) => setForm({ ...form, roles: v.split("\n").map((x) => x.trim()).filter(Boolean) })} />
      <Textarea label="Bio" value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} rows={7} />
      <CloudinaryUpload value={form.avatarUrl} label="Profile picture" folder="portfolio/profile" onChange={({ url }) => setForm({ ...form, avatarUrl: url })} />
      <Input label="Resume PDF URL" value={form.resumeUrl} onChange={(v) => setForm({ ...form, resumeUrl: v })} />
      <label className="flex items-center gap-3 rounded-lg border border-base-border bg-base-near p-4"><input type="checkbox" checked={form.availableForWork} onChange={(e) => setForm({ ...form, availableForWork: e.target.checked })} /><span><b>Available for work</b><small className="mt-1 block text-foreground-muted">Controls the availability badge in the hero.</small></span></label>
      {message && <p className="text-sm text-accent-green">{message}</p>}{error && <p className="text-sm text-red-400">{error}</p>}
      <Button onClick={() => void save()} disabled={saving}><Save size={16} /> {saving ? "SAVING…" : "SAVE PROFILE"}</Button>
    </div></GlowCard>
  </div>;
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) { return <label className="block"><span className="font-mono text-[11px] tracking-widest text-foreground-muted">{label.toUpperCase()}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-base-border bg-base-black px-3 py-2 text-sm outline-none focus:border-accent-cyan" /></label>; }
function Textarea({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) { return <label className="block"><span className="font-mono text-[11px] tracking-widest text-foreground-muted">{label.toUpperCase()}</span><textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-base-border bg-base-black px-3 py-2 text-sm outline-none focus:border-accent-cyan" /></label>; }
