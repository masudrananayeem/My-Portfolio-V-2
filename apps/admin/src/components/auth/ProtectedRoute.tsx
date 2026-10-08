import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Loader, GlowCard } from "@nayeem/ui";
import { COLLECTIONS, getDocument } from "@nayeem/firebase";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    if (!user) { setCheckingAdmin(false); setIsAdmin(false); return; }
    setCheckingAdmin(true); setError("");
    getDocument(COLLECTIONS.admins, user.uid)
      .then((doc) => { if (!active) return; setIsAdmin(Boolean(doc)); setCheckingAdmin(false); })
      .catch((e) => { if (!active) return; setError(e instanceof Error ? e.message : "Unable to verify admin access."); setCheckingAdmin(false); });
    return () => { active = false; };
  }, [user]);

  if (loading || checkingAdmin) return <Loader label="VERIFYING ADMIN ACCESS…" />;
  if (!user) return <Navigate to="/login" replace />;
  if (error) return <div className="flex min-h-screen items-center justify-center p-6"><GlowCard className="max-w-lg border-red-400/30"><h1 className="font-display text-xl font-semibold">Admin access check failed</h1><p className="mt-2 text-sm text-foreground-muted">{error}</p><p className="mt-4 text-xs text-foreground-faint">Make sure the Firebase Auth user is signed in and an admins/&lt;UID&gt; document exists.</p></GlowCard></div>;
  if (!isAdmin) return <Navigate to="/login?error=not-admin" replace />;
  return <Outlet />;
}
