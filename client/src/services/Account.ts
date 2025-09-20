const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function updateUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (import.meta.env.DEV) {
    console.log("Account: Updating User info...");
  }
  const response = await fetch(`${BACKEND_URL}/account`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  if (import.meta.env.DEV) {
    console.log(`Account: Updating User info response: ${response.status}`);
  }
  return response;
}
