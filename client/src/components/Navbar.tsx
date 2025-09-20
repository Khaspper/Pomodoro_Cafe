import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pomodoroLogo from "../assets/pomodoro-cafe.png";
import { logout } from "../services/Navbar";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

type TNavbarProps = {
  isOpen: boolean;
};

export default function Navbar({ isOpen }: TNavbarProps) {
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (import.meta.env.DEV) {
          console.log("Navbar: Checking authentication...");
        }
        const res = await fetch(`${BACKEND_URL}/account`, {
          credentials: "include",
        });
        if (import.meta.env.DEV) {
          console.log("Navbar: Auth response ", res.status);
        }

        if (res.status === 401) {
          if (import.meta.env.DEV)
            console.log("Navbar: not authenticated (401)");
          setAllowed(false);
          return;
        }

        if (!res.ok) {
          setAllowed(false);
          console.error("Navbar: unexpected status:", res.status);
          throw new Error("UH OH SOMETHING WENT WRONG");
        }
        setAllowed(true);
      } catch (error) {
        if ((error as { name?: string })?.name !== "AbortError") {
          console.error("Navbar: auth check failed:", error);
        }
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    })();
  }, [location]);

  return (
    <nav className="bg-[#043253] flex items-center justify-between p-4 text-[#b1372c]">
      <Link to="/">
        <motion.img layout src={pomodoroLogo} alt="Logo" width={50} />
      </Link>

      {!checking && (
        <div className="flex items-center gap-3">
          {isOpen && (
            <motion.div
              className="flex gap-4"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Link
                className="bg-[#fae3ad] px-6 py-2 font-bold rounded-2xl hover:scale-105 transform transition-transform duration-150"
                to={allowed ? "/account" : "/login"}
              >
                {allowed ? "Account" : "Login"}
              </Link>

              {allowed && (
                <button
                  className="bg-[#fae3ad] px-6 py-2 font-bold rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150"
                  type="button"
                  onClick={() => {
                    logout(setAllowed);
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              )}
            </motion.div>
          )}
        </div>
      )}
    </nav>
  );
}
