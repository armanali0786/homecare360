import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

import { router } from "./app/router";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import { UserProvider } from "./app/context/UserContext";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <HelmetProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    <ToastContainer position="top-right" autoClose={3000} />
  </HelmetProvider>
);