import { useState } from "react";
import { loginUser } from "../services/Login";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginForm({ lightMode }: { lightMode: boolean }) {
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
    <form
      className={`flex flex-col gap-2 md:gap-4 p-5 light-text-color md:w-[400px] mt-[-100px] ${
        lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
      } transition-colors`}
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
        Login
      </h1>
      {errorMessage && (
        <p
          className={`text-center ${
            lightMode ? "text-[#e74c1d]" : "text-[#93a66e]"
          }`}
        >
          {errorMessage} It's super quick!!!!
        </p>
      )}
      <div className="flex flex-col">
        <label className="font-bold md:text-xl" htmlFor="email">
          Email
        </label>
        <input
          className="border-1 rounded-xl px-2 md:px-4 py-1 border-[#e7dfce] font-bold md:text-xl outline-none"
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
          className="border-1 rounded-xl px-2 md:px-4 py-1 border-[#e7dfce] font-bold md:text-xl outline-none"
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
          {loading ? "Submitting" : "Login"}
        </button>
      </div>
      <p className="text-md font-bold light-text-color">
        Don't have an account?{" "}
        <Link className="underline" to={"/signup"}>
          Sign-up!
        </Link>
      </p>
    </form>
  );
}
