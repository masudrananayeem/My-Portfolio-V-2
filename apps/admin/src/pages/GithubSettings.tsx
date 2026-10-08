import { useEffect, useState } from "react";
import { Github, Save, RefreshCw } from "lucide-react";
import { GlowCard, Button } from "@nayeem/ui";
import { COLLECTIONS, getDocument, setDocument } from "@nayeem/firebase";
import type { GithubSettings } from "@nayeem/types";

const defaults: GithubSettings = {
  username: "masudrananayeem",
  profileUrl: "https://github.com/masudrananayeem",
  showContributions: true,
  showRepoStats: true,
  cachedContributionCount: 829,
};

export function GithubSettingsAdmin() {
  const [form, setForm] = useState<GithubSettings>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getDocument<GithubSettings>(COLLECTIONS.github, "settings");
      if (data) setForm({ ...defaults, ...data });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      await setDocument(COLLECTIONS.github, "settings", form);
      setMessage("GitHub settings saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS</p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">GitHub Settings</h1>
          <p className="mt-1 text-sm text-foreground-muted">Control the public GitHub identity and contribution display.</p>
        </div>
        <button onClick={() => void load()} className="rounded-lg border border-base-border p-2 hover:border-accent-cyan" title="Reload">
          <RefreshCw size={17} />
        </button>
      </div>

      <GlowCard className="mt-8 max-w-2xl">
        {loading ? <p className="text-sm text-foreground-muted">Loading settings…</p> : (
          <div className="space-y-5">
            <label className="block">
              <span className="text-xs font-mono text-foreground-muted">USERNAME</span>
              <input className="mt-2 w-full rounded-lg border border-base-border bg-base-near px-4 py-3 outline-none focus:border-accent-cyan" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-mono text-foreground-muted">PROFILE URL</span>
              <input className="mt-2 w-full rounded-lg border border-base-border bg-base-near px-4 py-3 outline-none focus:border-accent-cyan" value={form.profileUrl} onChange={(e) => setForm({ ...form, profileUrl: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-mono text-foreground-muted">FALLBACK CONTRIBUTIONS</span>
              <input type="number" min="0" className="mt-2 w-full rounded-lg border border-base-border bg-base-near px-4 py-3 outline-none focus:border-accent-cyan" value={form.cachedContributionCount ?? 0} onChange={(e) => setForm({ ...form, cachedContributionCount: Number(e.target.value) })} />
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-base-border bg-base-near p-4">
              <input type="checkbox" checked={form.showContributions} onChange={(e) => setForm({ ...form, showContributions: e.target.checked })} />
              <span><b>Show contribution calendar</b><small className="mt-1 block text-foreground-muted">Display live GitHub contributions on Home and GitHub pages.</small></span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-base-border bg-base-near p-4">
              <input type="checkbox" checked={form.showRepoStats} onChange={(e) => setForm({ ...form, showRepoStats: e.target.checked })} />
              <span><b>Show repository statistics</b></span>
            </label>
            {message && <p className="text-sm text-accent-green">{message}</p>}
            <Button onClick={() => void save()} disabled={saving}>
              <Save size={16} /> {saving ? "SAVING…" : "SAVE SETTINGS"}
            </Button>
          </div>
        )}
      </GlowCard>
    </div>
  );
}
