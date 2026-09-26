import { useEffect, useState } from "react";
import { getCollection, updateDocument, deleteDocument, COLLECTIONS, orderBy } from "@nayeem/firebase";
import type { ContactMessage } from "@nayeem/types";
import { GlowCard, Loader, EmptyState } from "@nayeem/ui";
import { Trash2, Mail, MailOpen, Archive } from "lucide-react";
import { cn } from "@nayeem/utils";

type MessageDoc = ContactMessage & { id: string };

export function MessagesAdmin() {
  const [messages, setMessages] = useState<MessageDoc[] | null>(null);

  const load = async () => {
    const data = await getCollection<ContactMessage>(COLLECTIONS.messages, [orderBy("createdAt", "desc")]);
    setMessages(data.filter((m) => m.status !== "deleted"));
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: ContactMessage["status"]) => {
    await updateDocument(COLLECTIONS.messages, id, { status });
    await load();
  };

  const remove = async (id: string) => {
    await deleteDocument(COLLECTIONS.messages, id);
    await load();
  };

  return (
    <div>
      <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">INBOX</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Messages</h1>

      {!messages && <Loader label="LOADING MESSAGES..." />}
      {messages && messages.length === 0 && (
        <div className="mt-8"><EmptyState title="NO MESSAGES YET" /></div>
      )}

      <div className="mt-8 space-y-3">
        {(messages ?? []).map((m) => (
          <GlowCard key={m.id} className={cn(m.status === "unread" && "border-accent-cyan/40")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display font-semibold">{m.subject}</p>
                <p className="font-mono text-[11px] text-foreground-muted">{m.name} · {m.email}</p>
                <p className="mt-2 text-sm text-foreground-muted">{m.message}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                {m.status === "unread" ? (
                  <button onClick={() => setStatus(m.id, "read")} title="Mark as read" className="text-accent-cyan"><Mail size={16} /></button>
                ) : (
                  <button onClick={() => setStatus(m.id, "unread")} title="Mark as unread" className="text-foreground-faint"><MailOpen size={16} /></button>
                )}
                <button onClick={() => setStatus(m.id, "archived")} title="Archive" className="text-foreground-muted hover:text-foreground"><Archive size={16} /></button>
                <button onClick={() => remove(m.id)} title="Delete" className="text-foreground-muted hover:text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
