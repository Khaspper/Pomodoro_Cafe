import dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function logout(
  setUser: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await fetch(`${BACKEND_URL}/account/logout`, {
      method: "post",
      credentials: "include",
    });
    if (response.ok) {
      setUser(false);
    }
  } catch (error) {
    console.error("Could not log out (inside client)", error);
  }
}
