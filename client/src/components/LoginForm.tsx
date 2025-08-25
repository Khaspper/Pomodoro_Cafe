import { useState } from "react";
import { loginUser } from "../services/Login";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  // Inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form states
  const [loading, setLoading] = useState(false);
  // const [error, setErrors] = useState("Implement this later");

  const navigate = useNavigate();

  // Add a loading and error check and when user submits make button not clickable

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await loginUser(username, email, password);
      if (!response.ok) {
        const msg = await response.text().catch(() => "");
        throw new Error(
          `Login failed (${response.status} ${response.statusText}) ${msg}`
        );
      }
      navigate("/profile");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#b1372c] p-5 text-[#1a1a1a] rounded-2xl">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <h1 className="text-4xl text-center font-bold">Login</h1>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="username">
            Username
          </label>
          <input
            className="border-3 rounded-md px-2 py-1 border-[#fbe3ad] font-bold"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="border-3 rounded-md px-2 py-1 border-[#fbe3ad] font-bold"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="border-3 rounded-md px-2 py-1 border-[#fbe3ad] font-bold"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
          />
        </div>
        {/* Add if loading grey out the button */}
        <button
          className="cursor-pointer font-extrabold bg-[#043253] text-[#b1372c] py-2 rounded-2xl"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}
