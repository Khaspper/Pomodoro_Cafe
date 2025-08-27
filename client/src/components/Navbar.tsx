import { Link, useLocation } from "react-router-dom";
import pomodoroLogo from "../assets/pomodoro-cafe.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch("http://localhost:3000/api/authorized", {
        credentials: "include",
      });
      const data = await response.json();
      setUser(data.authenticated);
    }
    checkAuth();
  }, [location.pathname]);

  //! Add a logout function
  return (
    <div className="bg-[#043253] flex items-center justify-between p-4 text-[#b1372c]">
      <Link to={"/"}>
        <img src={pomodoroLogo} alt="Logo" width={50} />
      </Link>
      <Link
        className="bg-[#fae3ad] px-6 py-2 font-bold rounded-2xl"
        to={user ? "/account" : "/login"}
      >
        {user ? "Account" : "Login"}
      </Link>
    </div>
  );
}
