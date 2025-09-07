import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pomodoroLogo from "../assets/pomodoro-cafe.png";
import { logout } from "../services/Navbar";

export default function Navbar() {
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/account", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("UH OH SOMETHING WENT WRONG");
        }
        setAllowed(res.ok);
      } catch {
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    })();
  }, [location]);

  return (
    <div className="bg-[#043253] flex items-center justify-between p-4 text-[#b1372c]">
      <Link to={"/"}>
        <img src={pomodoroLogo} alt="Logo" width={50} />
      </Link>
      {!checking && (
        <div className="flex items-center gap-3">
          <Link
            className="bg-[#fae3ad] px-6 py-2 font-bold rounded-2xl"
            to={allowed ? "/account" : "/login"}
          >
            {allowed ? "Account" : "Login"}
          </Link>
          {allowed && (
            <button
              className="bg-[#fae3ad] px-6 py-2 font-bold rounded-2xl cursor-pointer"
              type="button"
              onClick={() => {
                navigate("/login");
                logout(setAllowed);
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
