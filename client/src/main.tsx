import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Navbar from "./components/Navbar.tsx";
import Account from "./pages/Account.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ReviewCafe from "./components/ReviewCafe.tsx";

// I was thinking here that maybe we should call the backend and check

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar isOpen={true} />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar isOpen={true} />
        <Signup />
      </>
    ),
  },
  {
    path: "/account",
    element: (
      <>
        <ProtectedRoute>
          <div className="flex flex-col">
            <Navbar isOpen={true} />
            <Account />
          </div>
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/review/:id",
    element: (
      <>
        <Navbar isOpen={true} />
        <ReviewCafe />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
