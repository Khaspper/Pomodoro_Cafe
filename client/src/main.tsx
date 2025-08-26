import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Navbar from "./components/Navbar.tsx";

// I was thinking here that maybe we should call the backend and check

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
