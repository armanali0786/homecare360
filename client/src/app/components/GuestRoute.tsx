import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function GuestRoute() {
  const { user } = useUser();
  if (!user) return <Outlet />;
  if (user.role === "admin" || user.role === "superadmin") return <Navigate to="/admin" replace />;
  if (user.role === "provider") return <Navigate to="/admin" replace />;
  return <Navigate to="/" replace />;
}
