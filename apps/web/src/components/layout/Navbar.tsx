import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@nayeem/utils";
import { Menu, X } from "lucide-react";
import { scrollToTop } from "../../lib/lenis";
import { ThemeToggle } from "../common/ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/projects", label: "PROJECTS" },
  { to: "/research", label: "RESEARCH" },
  { to: "/github", label: "GITHUB" },
  { to: "/articles", label: "ARTICLES" },
  { to: "/contact", label: "CONTACT" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-base-black/80 backdrop-blur-md border-b border-base-border" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          onClick={() => scrollToTop(true)}
          className="flex items-center"
          aria-label="Masud Rana Nayeem — Home"
        >
          <img src="/mrn-logo.webp" alt="MRN" className="h-9 w-auto object-contain" />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={() => scrollToTop(true)}
                className={({ isActive }) =>
                  cn(
                    "font-mono text-[11px] tracking-[0.2em] transition-colors",
                    isActive ? "text-accent-cyan" : "text-foreground-muted hover:text-foreground"
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/resume.pdf" download="Masud_Rana_Nayeem_Resume.pdf"
            className="hidden font-mono text-[11px] tracking-[0.2em] border border-base-border px-4 py-2 hover:border-accent-cyan hover:text-accent-cyan transition-colors lg:inline-flex"
          >
            RESUME
          </a>
          <button
            className="lg:hidden text-foreground p-2"

          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-base-border bg-base-black lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => { setOpen(false); scrollToTop(true); }}
                  className={({ isActive }) =>
                    cn(
                      "block py-3 font-mono text-xs tracking-[0.2em]",
                      isActive ? "text-accent-cyan" : "text-foreground-muted"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            download="Masud_Rana_Nayeem_Resume.pdf"
            onClick={() => setOpen(false)}
            className="mx-6 mb-4 inline-flex items-center justify-center border border-base-border px-4 py-3 font-mono text-xs tracking-[0.2em] text-foreground hover:border-accent-cyan hover:text-accent-cyan"
          >
            DOWNLOAD RESUME
          </a>
        </div>
      )}
    </header>
  );
}
