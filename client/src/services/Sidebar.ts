export async function addSong(spotifyLink: string, cafeID: number) {
  const response = await fetch(
    `http://localhost:3000/cafe/${cafeID}/inputs/song`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ spotifyLink, cafeID }),
    }
  );

  return response;
}
