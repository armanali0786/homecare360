import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function RootLayout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
