import { useState } from "react";
import { loginUser } from "../services/Login";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
    <div className="border-2 border-emerald-700">
      <h1 className="text-4xl text-center">Login</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="border-2 "
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          id="username"
        />
        <label htmlFor="email">Email</label>
        <input
          className="border-2 "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="border-2 "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
        />
        {/* Add if loading grey out the button */}
        <button className="cursor-pointer" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}
