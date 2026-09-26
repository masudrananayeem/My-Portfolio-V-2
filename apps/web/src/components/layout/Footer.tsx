import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-base-border bg-base-near">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">MASUD RANA NAYEEM</p>
            <p className="mt-1 font-mono text-xs tracking-[0.2em] text-accent-cyan">
              FULL STACK DEVELOPER
            </p>
          </div>

          <nav className="flex flex-col gap-2 font-mono text-xs tracking-[0.15em] text-foreground-muted">
            <Link to="/about" className="hover:text-foreground">ABOUT</Link>
            <Link to="/projects" className="hover:text-foreground">PROJECTS</Link>
            <Link to="/research" className="hover:text-foreground">RESEARCH</Link>
            <Link to="/contact" className="hover:text-foreground">CONTACT</Link>
          </nav>

          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <a href="https://github.com/masudrananayeem" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-foreground-muted hover:text-accent-cyan"><Github size={18} /></a>
              <a href="https://linkedin.com/in/masudrananayeem" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-foreground-muted hover:text-accent-cyan"><Linkedin size={18} /></a>
              <a href="mailto:masudrananayeem86@gmail.com" aria-label="Email" className="text-foreground-muted hover:text-accent-cyan"><Mail size={18} /></a>
            </div>
            <p className="font-mono text-[11px] text-foreground-faint">
              masudrananayeem86@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-base-border pt-6 font-mono text-[11px] text-foreground-faint md:flex-row">
          <p>© {year} MASUD RANA NAYEEM. ALL SYSTEMS OPERATIONAL.</p>
          <p>BUILT WITH REACT · FIREBASE · CLOUDFLARE</p>
        </div>
      </div>
    </footer>
  );
}
