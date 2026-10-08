import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthProvider";
import { Button } from "@nayeem/ui";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../components/theme/ThemeProvider";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-grid px-6">
      <button
        type="button"
        onClick={toggleTheme}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg border border-base-border bg-base-panel text-foreground-muted transition hover:border-accent-cyan/50 hover:text-accent-cyan"
      >
        {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl border border-base-border bg-base-panel/60 p-8 backdrop-blur-sm">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">ADMIN ACCESS</p>
        <h1 className="mt-2 font-display text-2xl font-bold">Sign In</h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="font-mono text-xs tracking-widest text-foreground-muted">EMAIL</label>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-base-border bg-base-black px-4 py-3 outline-none focus:border-accent-cyan"
            />
          </div>
          <div>
            <label className="font-mono text-xs tracking-widest text-foreground-muted">PASSWORD</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-base-border bg-base-black px-4 py-3 outline-none focus:border-accent-cyan"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <Button type="submit" disabled={submitting} className="mt-6 w-full justify-center">
          {submitting ? "SIGNING IN..." : "SIGN IN"}
        </Button>
      </form>
    </div>
  );
}
