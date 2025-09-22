import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";

export function App() {
  // const [lightMode, setLightMode] = useState(true);
  const [lightMode, setLightMode] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home lightMode={lightMode} setLightMode={setLightMode} />,
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar
            isOpen={true}
            lightMode={lightMode}
            setLightMode={setLightMode}
          />
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar
            isOpen={true}
            lightMode={lightMode}
            setLightMode={setLightMode}
          />
          <Signup />
        </>
      ),
    },
    {
      path: "/account",
      element: (
        <ProtectedRoute>
          <div className="flex flex-col h-screen">
            <Navbar
              isOpen={true}
              lightMode={lightMode}
              setLightMode={setLightMode}
            />
            <Account />
          </div>
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
