const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function signupUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (import.meta.env.DEV === true) {
    console.log(`Signing user up with:`);
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
  }
  const response = await fetch(`${BACKEND_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  if (import.meta.env.DEV === true) {
    console.log(`Sign up Response: ${response.status}`);
  }
  const data = await response.json();
  return data.errors;
}
