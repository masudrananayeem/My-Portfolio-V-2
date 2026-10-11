import { useEffect, useState } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Copy,
  Check,
  Instagram,
  Facebook,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { useProfile, useSiteSettings } from "../../hooks/useFirestoreData";

function useLiveTime() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

type SocialLinksWithProfiles = {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  [key: string]: unknown;
};

export function ContactChannels() {
  const { data: profile } = useProfile();
  const { data: settings } = useSiteSettings();
  const [copied, setCopied] = useState(false);

  const time = useLiveTime();
  const email = settings?.socialLinks.email ?? "";
  const phone = settings?.contact?.phone ?? "+880 1820-050464";
  const whatsapp =
    settings?.contact?.whatsapp ??
    (phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : "");
  const location =
    settings?.contact?.location ?? profile?.location ?? "Bangladesh";

  const socialLinks = (settings?.socialLinks ?? {}) as SocialLinksWithProfiles;

  const socials = [
    {
      name: "Instagram",
      url: socialLinks.instagram,
      Icon: Instagram,
      iconClass: "text-pink-400",
    },
    {
      name: "Facebook",
      url: socialLinks.facebook,
      Icon: Facebook,
      iconClass: "text-blue-400",
    },
    {
      name: "LinkedIn",
      url: socialLinks.linkedin,
      Icon: Linkedin,
      iconClass: "text-sky-400",
    },
  ];

  const copyEmail = async () => {
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="h-full rounded-xl border border-base-border bg-base-panel/40 p-6">
      <p className="font-mono text-[11px] tracking-widest text-foreground-muted">
        DIRECT CHANNELS
      </p>

      <p className="mt-3 text-sm text-foreground-muted">
        {settings?.contact?.intro ??
          "Open for full-time engineering roles, freelance projects, and collaboration."}
      </p>

      <div className="mt-5 space-y-3">
        {email && (
          <button
            type="button"
            onClick={copyEmail}
            className="flex w-full items-center gap-3 rounded-lg border border-base-border px-4 py-3 text-left transition-colors hover:border-accent-cyan/50"
            aria-label="Copy email address"
          >
            <Mail size={16} className="shrink-0 text-accent-cyan" />
            <span className="flex-1 truncate text-sm text-foreground">
              {email}
            </span>
            {copied ? (
              <Check size={14} className="text-accent-green" />
            ) : (
              <Copy size={14} className="text-foreground-faint" />
            )}
          </button>
        )}

        {phone && (
          <div className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
            <MessageCircle size={16} className="shrink-0 text-accent-green" />
            <a
              href={`tel:${phone}`}
              className="min-w-0 flex-1 text-sm text-foreground"
            >
              {phone}
            </a>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] text-accent-green"
              >
                WHATSAPP
              </a>
            )}
          </div>
        )}

        {location && (
          <div className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
            <MapPin size={16} className="shrink-0 text-foreground-muted" />
            <span className="text-sm text-foreground-muted">{location}</span>
          </div>
        )}

        <div className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
          <Clock size={16} className="shrink-0 text-foreground-muted" />
          <span className="text-sm text-foreground-muted">
            {time} · Timezone: UTC+6
          </span>
        </div>

        <div className="border-t border-base-border pt-4">
          <p className="mb-3 font-mono text-[10px] tracking-widest text-foreground-muted">
            CONNECT WITH ME
          </p>

          <div className="space-y-3">
            {socials.map(({ name, url, Icon, iconClass }) => {
              const validUrl =
                typeof url === "string" && /^https?:\/\//i.test(url.trim());

              const content = (
                <>
                  <Icon size={17} className={`shrink-0 ${iconClass}`} />
                  <span className="flex-1 text-sm text-foreground">{name}</span>
                  {validUrl ? (
                    <ExternalLink
                      size={14}
                      className="text-foreground-faint transition-colors group-hover:text-accent-cyan"
                    />
                  ) : (
                    <span className="font-mono text-[9px] text-foreground-muted">
                      ADD URL
                    </span>
                  )}
                </>
              );

              return validUrl ? (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${name} profile (opens in a new tab)`}
                  className="group flex items-center gap-3 rounded-lg border border-base-border px-4 py-3 transition-colors hover:border-accent-cyan/50 hover:bg-base-panel"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3"
                  title={`Add your ${name} profile URL in Admin Site Settings to enable this link.`}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
