import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Loader } from "@nayeem/ui";

/**
 * Client-side route guard. This is a UX convenience only — the real
 * security boundary is Firestore Security Rules, which must independently
 * restrict writes on admin-only collections to authenticated admin UIDs.
 * See backend repo / README for the rules to deploy.
 */
export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader label="CHECKING SESSION..." />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
