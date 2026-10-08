import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  createDocument,
  deleteDocument,
  getCollection,
  getDocument,
  setDocument,
  updateDocument,
} from "@nayeem/firebase";
import { Button, EmptyState, GlowCard, Loader } from "@nayeem/ui";
import { Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import { CloudinaryUpload } from "./CloudinaryUpload";

export type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "boolean" | "url" | "date" | "array" | "select" | "image";
  placeholder?: string;
  options?: string[];
  help?: string;
};

type CmsRecord = Record<string, any> & { id?: string };

const inputClass =
  "mt-1 w-full rounded-lg border border-base-border bg-base-black px-3 py-2 text-sm outline-none focus:border-accent-cyan";

function getPath(obj: CmsRecord, path: string) {
  return path.split(".").reduce((value: any, key) => value?.[key], obj);
}

function setPath(obj: CmsRecord, path: string, value: any): CmsRecord {
  const parts = path.split(".").filter(Boolean);
  if (!parts.length) return obj;
  const next = { ...obj };
  let cursor: any = next;
  parts.slice(0, -1).forEach((part) => {
    cursor[part] = { ...(cursor[part] ?? {}) };
    cursor = cursor[part];
  });
  cursor[parts[parts.length - 1]] = value;
  return next;
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
}) {
  const type = field.type ?? "text";
  const label = field.label.toUpperCase();

  if (type === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-lg border border-base-border bg-base-near p-3">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        <span>
          <span className="text-sm font-semibold">{field.label}</span>
          {field.help && <small className="mt-1 block text-foreground-muted">{field.help}</small>}
        </span>
      </label>
    );
  }

  if (type === "select") {
    return (
      <label className="block">
        <span className="font-mono text-[11px] tracking-widest text-foreground-muted">{label}</span>
        <select className={inputClass} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {field.help && <small className="mt-1 block text-foreground-muted">{field.help}</small>}
      </label>
    );
  }

  if (type === "array") {
    return (
      <label className="block">
        <span className="font-mono text-[11px] tracking-widest text-foreground-muted">{label}</span>
        <textarea
          className={inputClass}
          rows={4}
          value={Array.isArray(value) ? value.join("\n") : ""}
          placeholder={field.placeholder ?? "One item per line"}
          onChange={(e) => onChange(e.target.value.split("\n").map((v) => v.trim()).filter(Boolean))}
        />
        {field.help && <small className="mt-1 block text-foreground-muted">{field.help}</small>}
      </label>
    );
  }

  if (type === "image") {
    return <CloudinaryUpload value={value?.url ?? ""} label={field.label} folder="portfolio/cms" onChange={onChange} />;
  }

  const onInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(type === "number" ? Number(e.target.value) : e.target.value);
  };

  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-widest text-foreground-muted">{label}</span>
      {type === "textarea" ? (
        <textarea className={inputClass} rows={5} value={String(value ?? "")} placeholder={field.placeholder} onChange={onInput} />
      ) : (
        <input
          className={inputClass}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          type={type === "url" ? "url" : type === "number" ? "number" : type === "date" ? "date" : "text"}
          onChange={onInput}
        />
      )}
      {field.help && <small className="mt-1 block text-foreground-muted">{field.help}</small>}
    </label>
  );
}

function Modal({
  title,
  fields,
  initial,
  onClose,
  onSave,
  saving,
}: {
  title: string;
  fields: FieldConfig[];
  initial: CmsRecord;
  onClose: () => void;
  onSave: (data: CmsRecord) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<CmsRecord>(() => ({ ...initial }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-base-border bg-base-near p-5 shadow-2xl sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.key}
              className={field.type === "textarea" || field.type === "array" || field.type === "boolean" || field.type === "image" ? "sm:col-span-2" : ""}
            >
              <Field
                field={field}
                value={getPath(form, field.key)}
                onChange={(value) => setForm((current) => setPath(current, field.key, value))}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>CANCEL</Button>
          <Button type="button" onClick={() => onSave(form)} disabled={saving}>
            <Save size={15} /> {saving ? "SAVING…" : "SAVE"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function sortRecords(items: CmsRecord[], orderKey: string) {
  return [...items].sort((a, b) => {
    const av = Number(a?.[orderKey] ?? 0);
    const bv = Number(b?.[orderKey] ?? 0);
    if (av !== bv) return av - bv;
    return String(a?.title ?? a?.name ?? a?.id ?? "").localeCompare(String(b?.title ?? b?.name ?? b?.id ?? ""));
  });
}

export function CollectionAdminPage({
  title,
  collection,
  fields,
  defaults = {},
  orderKey = "order",
}: {
  title: string;
  collection: string;
  fields: FieldConfig[];
  defaults?: CmsRecord;
  orderKey?: string;
}) {
  const [items, setItems] = useState<CmsRecord[] | null>(null);
  const [editing, setEditing] = useState<CmsRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const safeCollection = collection.trim();
  const empty = useMemo(() => ({ ...defaults }), [defaults]);

  const load = async () => {
    setError("");
    if (!safeCollection) {
      setItems([]);
      setError(`The ${title} collection is not configured.`);
      return;
    }
    try {
      const data = await getCollection<CmsRecord>(safeCollection);
      setItems(sortRecords(data, orderKey));
    } catch (e) {
      setItems([]);
      setError(e instanceof Error ? e.message : `Unable to load ${title.toLowerCase()}.`);
    }
  };

  useEffect(() => { void load(); }, [safeCollection, orderKey]);

  const save = async (form: CmsRecord) => {
    setSaving(true);
    setError("");
    try {
      if (!safeCollection) throw new Error(`The ${title} collection is not configured.`);
      if (form.id) {
        const { id, ...rest } = form;
        await updateDocument(safeCollection, id, rest);
      } else {
        const { id: _id, ...rest } = form;
        await createDocument(safeCollection, rest);
      }
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : `Unable to save ${title.toLowerCase()}.`);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm(`Delete this ${title.toLowerCase()} item?`)) return;
    setError("");
    try {
      await deleteDocument(safeCollection, id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : `Unable to delete ${title.toLowerCase()}.`);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS / CONTENT</p>
          <h1 className="mt-2 font-display text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-foreground-muted">Create, edit and delete {title.toLowerCase()} content.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => void load()} className="rounded-lg border border-base-border p-2 hover:border-accent-cyan" title="Reload"><RefreshCw size={17} /></button>
          <Button type="button" onClick={() => setEditing({ ...empty })}><Plus size={14} /> NEW</Button>
        </div>
      </div>

      {error && <GlowCard className="mt-5 border-red-400/30"><p className="text-sm leading-6 text-red-300">{error}</p></GlowCard>}
      {!items && <Loader label={`LOADING ${title.toUpperCase()}…`} />}
      {items && items.length === 0 && <div className="mt-8"><EmptyState title={`NO ${title.toUpperCase()} YET`} hint="Click New to create the first item." /></div>}

      <div className="mt-8 space-y-3">
        {(items ?? []).map((item, index) => (
          <GlowCard key={String(item.id ?? index)} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-display font-semibold">{String(item.title ?? item.name ?? item.role ?? item.organization ?? item.filename ?? `Item ${index + 1}`)}</p>
              <p className="mt-1 line-clamp-2 text-sm text-foreground-muted">{String(item.description ?? item.abstract ?? item.tagline ?? item.category ?? item.url ?? "Managed content")}</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button type="button" onClick={() => setEditing({ ...item })} className="text-foreground-muted hover:text-foreground" title="Edit"><Pencil size={16} /></button>
              <button type="button" onClick={() => void remove(String(item.id))} className="text-foreground-muted hover:text-red-400" title="Delete"><Trash2 size={16} /></button>
            </div>
          </GlowCard>
        ))}
      </div>

      {editing && <Modal title={editing.id ? `Edit ${title}` : `New ${title}`} fields={fields} initial={editing} onClose={() => !saving && setEditing(null)} onSave={save} saving={saving} />}
    </div>
  );
}

export function SingleDocumentAdminPage({
  title,
  collection,
  docId,
  fields,
  defaults,
}: {
  title: string;
  collection: string;
  docId: string;
  fields: FieldConfig[];
  defaults: CmsRecord;
}) {
  const [form, setForm] = useState<CmsRecord>(() => ({ ...defaults }));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      if (!collection.trim()) throw new Error(`The ${title} collection is not configured.`);
      const data = await getDocument<CmsRecord>(collection, docId);
      setForm(data ? { ...defaults, ...data } : { ...defaults });
    } catch (e) {
      setError(e instanceof Error ? e.message : `Unable to load ${title.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, [collection, docId]);

  const save = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      if (!collection.trim()) throw new Error(`The ${title} collection is not configured.`);
      const { id: _id, ...rest } = form;
      await setDocument(collection, docId, rest);
      setMessage("Saved successfully. Refresh the public site to see the changes.");
    } catch (e) {
      setError(e instanceof Error ? e.message : `Unable to save ${title.toLowerCase()}.`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">CMS / SINGLETON</p>
          <h1 className="mt-2 font-display text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-foreground-muted">Edit the live portfolio content stored in Firestore.</p>
        </div>
        <button type="button" onClick={() => void load()} className="rounded-lg border border-base-border p-2 hover:border-accent-cyan" title="Reload"><RefreshCw size={17} /></button>
      </div>

      <GlowCard className="mt-8 max-w-4xl">
        {loading ? <Loader label="LOADING…" /> : (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" || field.type === "array" || field.type === "boolean" || field.type === "image" ? "sm:col-span-2" : ""}>
                  <Field field={field} value={getPath(form, field.key)} onChange={(value) => setForm((current) => setPath(current, field.key, value))} />
                </div>
              ))}
            </div>
            {message && <p className="text-sm text-accent-green">{message}</p>}
            {error && <p className="text-sm leading-6 text-red-300">{error}</p>}
            <Button type="button" onClick={() => void save()} disabled={saving}><Save size={16} /> {saving ? "SAVING…" : "SAVE CHANGES"}</Button>
          </div>
        )}
      </GlowCard>
    </div>
  );
}
