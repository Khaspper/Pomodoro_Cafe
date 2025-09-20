import dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function addSong(spotifyLink: string, cafeID: number) {
  const response = await fetch(`${BACKEND_URL}/cafe/${cafeID}/inputs/song`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ spotifyLink, cafeID }),
  });

  return response;
}
