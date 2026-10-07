import { NavLink } from "react-router-dom";
import { cn } from "@nayeem/utils";
import {
  LayoutDashboard, User, FileText, Sparkles, Layers, Briefcase,
  FolderKanban, FlaskConical, FileText as ArticleIcon, Github, MessageSquare,
  Image as ImageIcon, FileDown, Settings, LogOut,
} from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

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

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-base-border bg-base-near lg:flex">
      <div className="px-6 py-6">
        <p className="font-display text-sm font-semibold tracking-widest">MRN ADMIN</p>
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
      <div className="px-3 py-4">
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
