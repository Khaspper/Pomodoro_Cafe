import { Link } from "react-router-dom";
import pomodoroLogo from "../assets/pomodoro-cafe.png";

export default function Navbar() {
  const isLoggedIn = false;
  return (
    <div className="bg-[#043253] flex items-center justify-between p-4 text-[#b1372c]">
      <Link to={"/"}>
        <img src={pomodoroLogo} alt="Logo" width={50} />
      </Link>
      <Link
        className="bg-[#fae3ad] px-6 py-2 font-bold rounded-2xl"
        to={isLoggedIn ? "/account" : "/login"}
      >
        {isLoggedIn ? "Account" : "Login"}
      </Link>
    </div>
  );
}
