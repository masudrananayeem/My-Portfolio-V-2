import { NavLink } from "react-router-dom";
import { cn } from "@nayeem/utils";
import {
  LayoutDashboard, User, FileText, Sparkles, Layers, Briefcase,
  FolderKanban, FlaskConical, FileText as ArticleIcon, Github, MessageSquare,
  Image as ImageIcon, FileDown, Settings, LogOut, Sun, Moon,
} from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { useTheme } from "../theme/ThemeProvider";

const ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/about", label: "About", icon: FileText },
  { to: "/skills", label: "Skills", icon: Sparkles },
  { to: "/tech-stack", label: "Tech Stack", icon: Layers },
  { to: "/experience", label: "Experience", icon: Briefcase },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/research", label: "Research", icon: FlaskConical },
  { to: "/articles", label: "Articles", icon: ArticleIcon },
  { to: "/github", label: "GitHub", icon: Github },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/media", label: "Media", icon: ImageIcon },
  { to: "/resume", label: "Resume", icon: FileDown },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-base-border bg-base-near lg:flex">
      <div className="flex items-center justify-between px-5 py-6">
        <p className="font-display text-sm font-semibold tracking-widest">MRN ADMIN</p>
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-base-border bg-base-panel text-foreground-muted transition hover:border-accent-cyan/50 hover:text-accent-cyan"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive ? "bg-accent-cyan/10 text-accent-cyan" : "text-foreground-muted hover:bg-base-panel hover:text-foreground"
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-2 px-3 py-4">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground-muted hover:bg-base-panel hover:text-red-400"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
