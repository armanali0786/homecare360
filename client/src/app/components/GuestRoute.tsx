import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function GuestRoute() {
  const { user } = useUser();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}