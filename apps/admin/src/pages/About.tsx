import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { Button, GlowCard, Loader } from "@nayeem/ui";
import { COLLECTIONS, getDocument, setDocument } from "@nayeem/firebase";
import type { AboutContent, EducationItem } from "@nayeem/types";

const defaults: AboutContent = {
  eyebrow: "ABOUT",
  title: "Building useful digital systems",
  intro: "Aspiring Web Developer & Programmer — a tech enthusiast focused on modern web technologies, building responsive and user-friendly applications.",
  body: "Currently exploring advanced React and backend technologies, with a 2026 goal of becoming a professional Full-Stack Developer.",
  highlights: [],
  education: [
    { degree: "Bachelor of Science in CSE", institution: "Daffodil International University", period: "Jan 2023 – Dec 2026" },
    { degree: "Higher Secondary Certificate (HSC)", institution: "Rural Development Academy (RDA) Laboratory School & College", period: "2020 – 2021", result: "GPA: 5.00" },
    { degree: "Secondary School Certificate (SSC)", institution: "Bogura Cantonment Board High School", period: "2007 – 2019", result: "Grade: 4.89" },
  ],
  bioDetails: {
    shortDegree: "CSE, Daffodil Int'l Univ.",
    availability: "Available for freelance",
    email: "masudrananayeem86@gmail.com",
    phone: "+880 1820-050464",
  },
  codingProfiles: {
    beecrowd: { platform: "beecrowd", handle: "779446", url: "https://judge.beecrowd.com/en/profile/779446", solved: 73 },
    codeforces: { platform: "Codeforces", handle: "codeforcemasud", url: "https://codeforces.com/profile/codeforcemasud", solved: 40 },
    codechef: { platform: "CodeChef", handle: "codechefmasud", url: "https://www.codechef.com/users/codechefmasud", solved: 207 },
  },
};

export function AboutAdmin() {
  const [form, setForm] = useState<AboutContent>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true); setError(""); setMessage("");
    try {
      const data = await getDocument<AboutContent>(COLLECTIONS.about, "main");
      setForm({ ...defaults, ...(data ?? {}), bioDetails: { ...defaults.bioDetails, ...(data?.bioDetails ?? {}) }, codingProfiles: { ...defaults.codingProfiles, ...(data?.codingProfiles ?? {}) } });
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load About content."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);

  const update = (patch: Partial<AboutContent>) => setForm((current) => ({ ...current, ...patch }));
  const updateBio = (key: keyof NonNullable<AboutContent["bioDetails"]>, value: string) => setForm((current) => ({ ...current, bioDetails: { ...current.bioDetails, [key]: value } }));
  const updateEducation = (index: number, patch: Partial<EducationItem>) => setForm((current) => ({ ...current, education: (current.education ?? []).map((item, i) => i === index ? { ...item, ...patch } : item) }));

  const save = async () => {
    setSaving(true); setMessage(""); setError("");
    try { await setDocument(COLLECTIONS.about, "main", form); setMessage("About content saved successfully."); }
    catch (e) { setError(e instanceof Error ? e.message : "Save failed."); }
    finally { setSaving(false); }
  };

  if (loading) return <Loader label="LOADING ABOUT CMS…" />;

  return <div>
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS / ABOUT</p><h1 className="mt-2 font-display text-3xl font-bold">About</h1><p className="mt-1 text-sm text-foreground-muted">Control the About story, education, contact details and coding profiles.</p></div><button onClick={() => void load()} className="rounded-lg border border-base-border p-2 hover:border-accent-cyan" title="Reload"><RefreshCw size={17}/></button></div>
    <GlowCard className="mt-8 max-w-5xl"><div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2"><Input label="Eyebrow" value={form.eyebrow} onChange={(v)=>update({eyebrow:v})}/><Input label="Title" value={form.title} onChange={(v)=>update({title:v})}/></div>
      <Textarea label="Intro" value={form.intro} onChange={(v)=>update({intro:v})}/><Textarea label="Full Bio / Story" value={form.body} rows={6} onChange={(v)=>update({body:v})}/><Textarea label="Highlights (one per line)" value={(form.highlights??[]).join("\n")} onChange={(v)=>update({highlights:v.split("\n").map(x=>x.trim()).filter(Boolean)})}/>
      <div><h2 className="font-display text-xl font-semibold">Bio details</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Input label="Short Degree" value={form.bioDetails?.shortDegree??""} onChange={(v)=>updateBio("shortDegree",v)}/><Input label="Availability" value={form.bioDetails?.availability??""} onChange={(v)=>updateBio("availability",v)}/><Input label="Email" value={form.bioDetails?.email??""} onChange={(v)=>updateBio("email",v)}/><Input label="Phone" value={form.bioDetails?.phone??""} onChange={(v)=>updateBio("phone",v)}/></div></div>
      <div><div className="flex items-center justify-between gap-3"><div><h2 className="font-display text-xl font-semibold">Education</h2><p className="mt-1 text-sm text-foreground-muted">These cards appear in the public About page.</p></div></div><div className="mt-4 space-y-4">{(form.education??[]).map((item,index)=><div key={index} className="rounded-xl border border-base-border bg-base-near p-4"><div className="grid gap-4 sm:grid-cols-2"><Input label="Degree" value={item.degree} onChange={(v)=>updateEducation(index,{degree:v})}/><Input label="Period" value={item.period} onChange={(v)=>updateEducation(index,{period:v})}/><div className="sm:col-span-2"><Input label="Institution" value={item.institution} onChange={(v)=>updateEducation(index,{institution:v})}/></div><Input label="Result / GPA" value={item.result??""} onChange={(v)=>updateEducation(index,{result:v})}/></div></div>)}</div></div>
      <div><h2 className="font-display text-xl font-semibold">Coding profiles</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{(["beecrowd","codeforces","codechef"] as const).map((key)=><div key={key} className="rounded-xl border border-base-border bg-base-near p-4"><p className="font-mono text-xs tracking-widest text-accent-cyan">{key.toUpperCase()}</p><div className="mt-3 space-y-3"><Input label="Platform" value={form.codingProfiles?.[key]?.platform??""} onChange={(v)=>update({codingProfiles:{...form.codingProfiles,[key]:{...form.codingProfiles?.[key],platform:v}}})}/><Input label="Handle" value={form.codingProfiles?.[key]?.handle??""} onChange={(v)=>update({codingProfiles:{...form.codingProfiles,[key]:{...form.codingProfiles?.[key],handle:v}}})}/><Input label="URL" value={form.codingProfiles?.[key]?.url??""} onChange={(v)=>update({codingProfiles:{...form.codingProfiles,[key]:{...form.codingProfiles?.[key],url:v}}})}/><Input label="Solved" value={String(form.codingProfiles?.[key]?.solved??0)} onChange={(v)=>update({codingProfiles:{...form.codingProfiles,[key]:{...form.codingProfiles?.[key],solved:Number(v)||0}}})}/></div></div>)}</div></div>
      {message && <p className="text-sm text-accent-green">{message}</p>}{error && <p className="text-sm text-red-400">{error}</p>}
      <Button onClick={() => void save()} disabled={saving}><Save size={16}/>{saving ? "SAVING…" : "SAVE ABOUT"}</Button>
    </div></GlowCard>
  </div>;
}

function Input({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void}){return <label className="block"><span className="font-mono text-[10px] tracking-widest text-foreground-muted">{label.toUpperCase()}</span><input value={value} onChange={e=>onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-base-border bg-base-black px-3 py-2 text-sm outline-none focus:border-accent-cyan" /></label>}
function Textarea({label,value,onChange,rows=4}:{label:string;value:string;onChange:(v:string)=>void;rows?:number}){return <label className="block"><span className="font-mono text-[10px] tracking-widest text-foreground-muted">{label.toUpperCase()}</span><textarea rows={rows} value={value} onChange={e=>onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-base-border bg-base-black px-3 py-2 text-sm outline-none focus:border-accent-cyan" /></label>}
