import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pomodoroLogo from "../assets/pomodoro-cafe.png";
import { logout } from "../services/Navbar";
import { motion } from "framer-motion";
import { MdAccountCircle } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

type TNavbarProps = {
  isOpen: boolean;
  lightMode: boolean;
  setLightMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({
  isOpen,
  lightMode,
  setLightMode,
}: TNavbarProps) {
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (import.meta.env.DEV === true) {
          console.log("Navbar: Checking authentication...");
        }
        const res = await fetch(`${BACKEND_URL}/account`, {
          credentials: "include",
        });
        if (import.meta.env.DEV === true) {
          console.log("Navbar: Auth response ", res.status);
        }

        if (res.status === 401) {
          if (import.meta.env.DEV === true)
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
    <nav
      className={`flex items-center justify-between p-4 ${
        lightMode
          ? "bg-light-background-color text-black"
          : "bg-dark-background-color dark-text-color"
      } transition-colors`}
    >
      <Link to="/">
        <motion.img layout src={pomodoroLogo} alt="Logo" width={50} />
      </Link>

      {!checking && (
        <div className="flex items-center gap-3">
          <a href="https://www.instagram.com/stuckonblessings/" target="blank">
            <FaInstagram className="text-3xl cursor-pointer hover:scale-105 transform transition-transform duration-150" />
          </a>
          {isOpen && (
            <motion.div
              className="flex gap-4 items-center"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {lightMode ? (
                <MdDarkMode
                  onClick={() => setLightMode((p) => !p)}
                  className="cursor-pointer text-3xl hover:scale-105 transform transition-transform duration-150"
                />
              ) : (
                <MdLightMode
                  onClick={() => setLightMode((p) => !p)}
                  className="cursor-pointer text-3xl hover:scale-105 transform transition-transform duration-150"
                />
              )}
              <Link
                // className={`cursor-pointer hover:scale-105 transform transition-transform duration-150 ${
                //   lightMode ? "bg-light-accent-color" : "bg-dark-accent-color"
                // } text-lg px-4 py-2`}
                to={allowed ? "/account" : "/login"}
              >
                {allowed ? (
                  <MdAccountCircle className="text-3xl cursor-pointer hover:scale-105 transform transition-transform duration-150" />
                ) : (
                  <BiLogIn className="text-3xl cursor-pointer hover:scale-105 transform transition-transform duration-150" />
                )}
              </Link>

              {allowed && (
                <BiLogOut
                  className="text-3xl cursor-pointer hover:scale-105 transform transition-transform duration-150"
                  onClick={() => {
                    logout(setAllowed);
                    navigate("/login");
                  }}
                />
              )}
            </motion.div>
          )}
        </div>
      )}
    </nav>
  );
}
