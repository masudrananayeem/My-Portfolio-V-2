import { useEffect, useState } from "react";
import { getCollection, updateDocument, deleteDocument, COLLECTIONS } from "@nayeem/firebase";
import type { ContactMessage } from "@nayeem/types";
import { GlowCard, Loader, EmptyState } from "@nayeem/ui";
import { Trash2, Mail, MailOpen, Archive, RefreshCw } from "lucide-react";
import { cn } from "@nayeem/utils";

type MessageDoc = ContactMessage & { id: string };

export function MessagesAdmin() {
  const [messages, setMessages] = useState<MessageDoc[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setError("");
    try {
      const data = await getCollection<ContactMessage>(COLLECTIONS.messages);
      data.sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")));
      setMessages(data.filter((m) => m.status !== "deleted"));
    } catch (e) {
      setMessages([]);
      setError(e instanceof Error ? e.message : "Unable to load messages.");
    }
  };

  useEffect(() => { void load(); }, []);

  const setStatus = async (id: string, status: ContactMessage["status"]) => {
    setBusy(true); setError("");
    try { await updateDocument(COLLECTIONS.messages, id, { status }); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to update message."); }
    finally { setBusy(false); }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    setBusy(true); setError("");
    try { await deleteDocument(COLLECTIONS.messages, id); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to delete message."); }
    finally { setBusy(false); }
  };

  return <div>
    <div className="flex items-center justify-between gap-4"><div><p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">INBOX</p><h1 className="mt-2 font-display text-3xl font-bold">Messages</h1></div><button type="button" onClick={() => void load()} className="rounded-lg border border-base-border p-2 hover:border-accent-cyan"><RefreshCw size={17}/></button></div>
    {error && <GlowCard className="mt-5 border-red-400/30"><p className="text-sm text-red-300">{error}</p></GlowCard>}
    {!messages && <Loader label="LOADING MESSAGES…"/>}
    {messages && messages.length === 0 && <div className="mt-8"><EmptyState title="NO MESSAGES YET" /></div>}
    <div className="mt-8 space-y-3">{(messages ?? []).map((m) => <GlowCard key={m.id} className={cn(m.status === "unread" && "border-accent-cyan/40")}><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="font-display font-semibold">{m.subject}</p><p className="font-mono text-[11px] text-foreground-muted">{m.name} · {m.email}</p><p className="mt-2 whitespace-pre-wrap text-sm text-foreground-muted">{m.message}</p></div><div className="flex shrink-0 gap-2">{m.status === "unread" ? <button type="button" disabled={busy} onClick={() => void setStatus(m.id, "read")} title="Mark as read" className="text-accent-cyan"><Mail size={16}/></button> : <button type="button" disabled={busy} onClick={() => void setStatus(m.id, "unread")} title="Mark as unread" className="text-foreground-faint"><MailOpen size={16}/></button>}<button type="button" disabled={busy} onClick={() => void setStatus(m.id, "archived")} title="Archive" className="text-foreground-muted hover:text-foreground"><Archive size={16}/></button><button type="button" disabled={busy} onClick={() => void remove(m.id)} title="Delete" className="text-foreground-muted hover:text-red-400"><Trash2 size={16}/></button></div></div></GlowCard>)}</div>
  </div>;
}
