const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function signupUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch(`${BACKEND_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  const data = await response.json();
  return data.errors;
}
