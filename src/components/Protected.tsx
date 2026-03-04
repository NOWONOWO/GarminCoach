import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function Protected({ children }: { children: JSX.Element }) {
  const { loading, user } = useAuth();

  if (loading) return <div className="p-6">Ładowanie…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
