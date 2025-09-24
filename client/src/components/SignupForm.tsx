import { useState } from "react";
import { signupUser } from "../services/Signup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import type { TNewErrors, TReceivedErrors } from "../types/types";

export default function SignupForm({ lightMode }: { lightMode: boolean }) {
  // Inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<TNewErrors>({});

  // Form states
  const [loading, setLoading] = useState(false);
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
        throw new Error(`Sign up failed`, errors);
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        lightMode ? "bg-light-background-color" : "bg-dark-background-color"
      } transition-colors`}
    >
      <form
        className={`flex flex-col gap-2 md:gap-4 p-5 w-[300px] md:w-[400px] mt-[-100px] ${
          lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
        } light-text-color`}
        style={{
          boxShadow: `3px 3px 2px ${
            lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
          }`,
        }}
        onSubmit={handleSubmit}
      >
        <h1
          className={`text-4xl md:text-5xl text-center font-bold ${
            lightMode ? "text-[#93a66e]" : "text-[#e74c1d]"
          }`}
        >
          Sign-up
        </h1>
        <div className="flex flex-col">
          <label className="font-bold text-xl" htmlFor="username">
            Username
          </label>
          <input
            className="border-1 rounded-xl px-2 md:px-4 py-1 font-bold md:text-xl outline-none"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
            required
          />
          <p className="light-text-color">
            {errors.username ? errors.username : ""}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="font-bold md:text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="border-1 rounded-xl px-2 md:px-4 py-1 font-bold md:text-xl outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            required
          />
          <p className="light-text-color">{errors.email ? errors.email : ""}</p>
        </div>
        <div className="flex flex-col">
          <label className="font-bold md:text-xl" htmlFor="password">
            Password
          </label>
          <input
            className="border-1 rounded-xl px-2 md:px-4 py-1 font-bold md:text-xl outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            required
          />
          <p className="light-text-color">
            {errors.password ? errors.password : ""}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="font-bold md:text-xl" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="border-1 rounded-xl px-2 md:px-4 py-1 font-bold md:text-xl outline-none"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            id="confirmPassword"
            required
          />
          <p className="light-text-color">
            {errors.confirmPassword ? errors.confirmPassword : ""}
          </p>
        </div>
        {/* Add if loading grey out the button */}
        <div className="flex justify-between">
          <button
            className={`cursor-pointer hover:scale-105 transform transition-transform duration-150 font-bold py-2 md:text-xl w-[40%] md:w-[35%] ${
              lightMode ? "bg-light-accent-color" : "bg-dark-accent-color"
            }`}
            onClick={handleClick}
          >
            Go back
          </button>
          <button
            className={`cursor-pointer font-bold py-2 md:text-xl w-[40%] md:w-[35%] active:translate-x-[3px] active:translate-y-[3px] ${
              lightMode ? "bg-light-accent-color" : "bg-dark-accent-color"
            }`}
            type="submit"
            disabled={loading}
            style={{
              boxShadow: `3px 3px 2px ${
                lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
              }`,
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = `3px 3px 2px ${
                lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
              }`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `3px 3px 2px ${
                lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
              }`;
            }}
          >
            {loading ? "Submitting" : "Sign-up"}
          </button>
        </div>
        <p className="text-md font-bold light-text-color">
          Have an account?{" "}
          <Link className="underline" to={"/login"}>
            Login!
          </Link>
        </p>
      </form>
    </div>
  );
}
