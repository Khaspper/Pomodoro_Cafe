import { useState } from "react";
import { loginUser } from "../services/Login";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginForm() {
  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Form states
  const [loading, setLoading] = useState(false);
  // const [error, setErrors] = useState("Implement this later");

  const location = useLocation();
  const errorMessage = location.state?.error;
  const navigate = useNavigate();

  // Add a loading and error check and when user submits make button not clickable

  function handleClick() {
    navigate(-1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const errors = await loginUser(email, password);
      if (!errors.ok) {
        setLoginError(errors.error);
        throw new Error(`Login failed`, errors);
      } else {
        setLoginError("");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#03304f] p-5 text-[#b1372c] rounded-2xl md:w-[400px] mt-[-100px]">
      <form className="flex flex-col gap-2 md:gap-4" onSubmit={handleSubmit}>
        <h1 className="text-4xl md:text-5xl text-center font-bold">Login</h1>
        {errorMessage && (
          <p className="text-red-500 text-center">
            {errorMessage} It's super quick!!!!
          </p>
        )}
        <div className="flex flex-col">
          <label className="font-bold md:text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="border-2 rounded-xl px-2 md:px-4 py-1 border-[#fbe3ad] font-bold md:text-xl outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold md:text-xl" htmlFor="password">
            Password
          </label>
          <input
            className="border-2 rounded-xl px-2 md:px-4 py-1 border-[#fbe3ad] font-bold md:text-xl outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            required
          />
        </div>
        <p className="text-[#df9f3f]">{loginError}</p>
        {/* Add if loading grey out the button */}
        <div className="flex justify-between">
          <button
            className="cursor-pointer hover:scale-105 transform transition-transform duration-150 font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-[40%] md:w-[35%] text-[#1a1a1a]"
            type="submit"
            onClick={handleClick}
          >
            Go back
          </button>
          <button
            className="cursor-pointer hover:scale-105 transform transition-transform duration-150 font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-[40%] md:w-[35%] text-[#1a1a1a]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Login"}
          </button>
        </div>
        <p className="text-md font-bold text-[#fbe3ad]">
          Don't have an account?{" "}
          <Link className="underline" to={"/signup"}>
            Sign-up!
          </Link>
        </p>
      </form>
    </div>
  );
}
