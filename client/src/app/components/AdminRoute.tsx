import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function AdminRoute() {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin" && user.role !== "superadmin" && user.role !== "provider")
    return <Navigate to="/" replace />;
  return <Outlet />;
}
