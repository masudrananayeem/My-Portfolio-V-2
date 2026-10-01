import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowUpRight, Copy } from "lucide-react";
import { useState } from "react";
import { StatusPill, LinkButton } from "@nayeem/ui";

const EMAIL = "masudrananayeem86@gmail.com";

const NAV = [
  { to: "/", label: "Home", num: "01" },
  { to: "/about", label: "About", num: "02" },
  { to: "/projects", label: "Projects", num: "03" },
  { to: "/research", label: "Research", num: "04" },
  { to: "/contact", label: "Contact", num: "05" },
];

const CHANNELS = [
  { icon: Github, label: "GitHub", handle: "@masudrananayeem", href: "https://github.com/masudrananayeem" },
  { icon: Linkedin, label: "LinkedIn", handle: "in/masudrananayeem", href: "https://linkedin.com/in/masudrananayeem" },
  { icon: Mail, label: "Email", handle: EMAIL, href: `mailto:${EMAIL}` },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer className="border-t border-base-border bg-base-near">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        {/* CTA box */}
        <div className="rounded-2xl border border-base-border bg-base-panel/40 p-8 md:p-10">
          <p className="text-center font-mono text-[11px] tracking-[0.3em] text-accent-cyan">
            • TRANSMISSION &amp; COLLABORATION HUB •
          </p>

          <div className="mt-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <StatusPill label="AVAILABLE FOR ENGINEERING ENGAGEMENTS" />
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Let's Build Something <span className="text-accent-cyan">Extraordinary</span> Together.
              </h2>
              <p className="mt-3 max-w-lg text-sm text-foreground-muted">
                Full-stack developer and software engineer focused on scalable web systems and
                applied AI/ML — open to full-time roles, contract work, and collaboration.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <LinkButton href="/contact" variant="primary" className="justify-center">
                INITIATE TRANSMISSION <ArrowUpRight size={14} />
              </LinkButton>
              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-2 rounded-lg border border-base-border px-4 py-2.5 font-mono text-xs text-foreground-muted hover:border-accent-cyan hover:text-accent-cyan"
              >
                <Mail size={13} /> {copied ? "COPIED!" : EMAIL} <Copy size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Identity + nav + channels */}
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">MASUD RANA NAYEEM</p>
            <p className="mt-1 font-mono text-xs tracking-[0.2em] text-accent-cyan">FULL STACK DEVELOPER</p>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              Full-stack developer and software engineer focused on building responsive,
              production-grade web systems.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-widest text-accent-cyan">NAVIGATION INDEX</p>
            <nav className="mt-3 flex flex-col gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="font-mono text-xs tracking-[0.1em] text-foreground-muted hover:text-foreground"
                >
                  {item.num}. {item.label.toUpperCase()}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-widest text-accent-cyan">VERIFIED DIRECT CHANNELS</p>
            <div className="mt-3 space-y-2">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-base-border px-3 py-2 text-xs transition-colors hover:border-accent-cyan/50"
                >
                  <c.icon size={13} className="shrink-0 text-accent-cyan" />
                  <span className="text-foreground-muted">{c.label}</span>
                  <span className="ml-auto truncate text-foreground-faint">{c.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-base-border pt-6 font-mono text-[11px] text-foreground-faint md:flex-row">
          <p>© {year} MASUD RANA NAYEEM. ALL SYSTEMS OPERATIONAL.</p>
          <p>BUILT WITH REACT · FIREBASE · CLOUDFLARE</p>
        </div>
      </div>
    </footer>
  );
}
