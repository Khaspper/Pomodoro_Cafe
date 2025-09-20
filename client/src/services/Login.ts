const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function loginUser(email: string, password: string) {
  if (import.meta.env.DEV) {
    console.log(`Login: Logging in user with email: ${email}`);
  }
  const response = await fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (import.meta.env.DEV) {
    console.log(`Login response: ${response.status}`);
  }
  if (response.ok) return response;
  const data = await response.json();
  return data;
}
