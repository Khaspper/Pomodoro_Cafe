import { useState } from "react";
import { signupUser } from "../services/Signup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type TReceivedErrors = {
  location: string;
  msg: string;
  path: "username" | "email" | "password" | "confirmPassword";
  type: string;
  value: string;
};

type TNewErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignupForm() {
  // Inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<TNewErrors>({});

  // Form states
  const [loading, setLoading] = useState(false);
  // const [error, setErrors] = useState("Implement this later");

  const navigate = useNavigate();

  // Add a loading and error check and when user submits make button not clickable

  function handleClick() {
    navigate("/");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const errors = await signupUser(
        username,
        email,
        password,
        confirmPassword
      );
      if (errors && errors.length !== 0) {
        const newErrors: TNewErrors = {};
        errors.forEach((error: TReceivedErrors) => {
          const path = error.path;
          const msg = error.msg;
          newErrors[path] = msg;
        });
        setErrors(newErrors);
        throw new Error(`Login failed`, errors);
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#03304f] p-5 text-[#b1372c] rounded-2xl w-[300px] md:w-[400px] mt-[-100px]">
      <form className="flex flex-col gap-2 md:gap-4" onSubmit={handleSubmit}>
        <h1 className="text-4xl md:text-5xl text-center font-bold">Sign-up</h1>
        <div className="flex flex-col">
          <label className="font-bold md:text-xl" htmlFor="username">
            Username
          </label>
          <input
            className="border-2 rounded-xl px-2 md:px-4 py-1 border-[#fbe3ad] font-bold md:text-xl outline-none"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
            required
          />
          <p className="text-[#df9f3f]">
            {errors.username ? errors.username : ""}
          </p>
        </div>
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
          <p className="text-[#df9f3f]">{errors.email ? errors.email : ""}</p>
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
          <p className="text-[#df9f3f]">
            {errors.password ? errors.password : ""}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="font-bold md:text-xl" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="border-2 rounded-xl px-2 md:px-4 py-1 border-[#fbe3ad] font-bold md:text-xl outline-none"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            id="confirmPassword"
            required
          />
          <p className="text-[#df9f3f]">
            {errors.confirmPassword ? errors.confirmPassword : ""}
          </p>
        </div>
        {/* Add if loading grey out the button */}
        <div className="flex justify-between">
          <button
            className="cursor-pointer font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-[40%] md:w-[35%] text-[#1a1a1a]"
            type="submit"
            onClick={handleClick}
          >
            Go Home
          </button>
          <button
            className="cursor-pointer font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-[40%] md:w-[35%] text-[#1a1a1a]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Sign-up"}
          </button>
        </div>
        <p className="text-md font-bold text-[#fbe3ad]">
          Have an account?{" "}
          <Link className="underline" to={"/login"}>
            Login!
          </Link>
        </p>
      </form>
    </div>
  );
}
