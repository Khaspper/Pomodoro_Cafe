import dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function updateUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch(`${BACKEND_URL}/account`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  return response;
}
