const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function addSong(spotifyLink: string, cafeID: number) {
  if (import.meta.env.DEV) {
    console.log("Add Song: Adding song...");
  }
  const response = await fetch(`${BACKEND_URL}/cafe/${cafeID}/inputs/song`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ spotifyLink, cafeID }),
  });
  if (import.meta.env.DEV) {
    console.log(`Add Song: Response: ${response.status}`);
  }

  return response;
}
