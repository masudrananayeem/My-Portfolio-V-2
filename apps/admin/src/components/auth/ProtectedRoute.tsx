import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Loader } from "@nayeem/ui";
import { COLLECTIONS, getDocument } from "@nayeem/firebase";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    if (!user) {
      setChecking(false);
      setIsAdmin(false);
      setError("");
      return;
    }

    setChecking(true);
    setError("");
    getDocument(COLLECTIONS.admins, user.uid)
      .then((admin) => {
        if (!active) return;
        setIsAdmin(Boolean(admin));
        setChecking(false);
      })
      .catch((e) => {
        if (!active) return;
        setIsAdmin(false);
        setError(e instanceof Error ? e.message : "Unable to verify admin access.");
        setChecking(false);
      });

    return () => { active = false; };
  }, [user?.uid]);

  if (loading || checking) return <Loader label="VERIFYING ADMIN ACCESS…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-lg rounded-2xl border border-red-400/30 bg-base-panel p-6">
          <h1 className="font-display text-xl font-semibold text-red-300">Admin access check failed</h1>
          <p className="mt-2 text-sm leading-6 text-foreground-muted">{error}</p>
          <p className="mt-4 text-xs leading-5 text-foreground-faint">This account is not registered as an admin. From the project root, run <code className="font-mono text-accent-cyan">npm run admin:create</code> to create or repair the admin account from VS Code.</p>
        </div>
      </div>
    );
  }
  if (!isAdmin) return <Navigate to="/login?error=not-admin" replace />;
  return <Outlet />;
}
