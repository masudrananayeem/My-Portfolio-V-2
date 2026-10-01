import { useEffect, useState } from "react";
import { Mail, MessageCircle, MapPin, Clock, Copy, Check } from "lucide-react";

const EMAIL = "masudrananayeem86@gmail.com";
const PHONE_DISPLAY = "+880 1820-050464";
const WHATSAPP_LINK = "https://wa.me/8801820050464";

/** Live HH:MM:SS clock for the contact panel — small technical/HUD touch. */
function useLiveTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function ContactChannels() {
  const [copied, setCopied] = useState(false);
  const time = useLiveTime();

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-base-border bg-base-panel/40 p-6">
      <p className="font-mono text-[11px] tracking-widest text-foreground-muted">DIRECT CHANNELS</p>
      <p className="mt-3 text-sm text-foreground-muted">
        Open for full-time engineering roles, freelance projects, and collaboration.
      </p>

      <div className="mt-5 space-y-3">
        <button
          onClick={copyEmail}
          className="flex w-full items-center gap-3 rounded-lg border border-base-border px-4 py-3 text-left transition-colors hover:border-accent-cyan/50"
        >
          <Mail size={16} className="shrink-0 text-accent-cyan" />
          <span className="flex-1 truncate text-sm text-foreground">{EMAIL}</span>
          {copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} className="text-foreground-faint" />}
        </button>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3 transition-colors hover:border-accent-green/50"
        >
          <MessageCircle size={16} className="shrink-0 text-accent-green" />
          <span className="flex-1 text-sm text-foreground">{PHONE_DISPLAY}</span>
          <span className="rounded-full bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] text-accent-green">WHATSAPP</span>
        </a>

        <div className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
          <MapPin size={16} className="shrink-0 text-foreground-muted" />
          <span className="text-sm text-foreground-muted">Dhaka, Bangladesh (Remote-friendly)</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
          <Clock size={16} className="shrink-0 text-foreground-muted" />
          <span className="text-sm text-foreground-muted">
            {time} · Timezone: UTC+6
          </span>
        </div>
      </div>
    </div>
  );
}
