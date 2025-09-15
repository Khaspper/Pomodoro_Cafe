export async function sendComment(comment: string, cafeID: number) {
  const response = await fetch(
    `http://localhost:3000/cafe/${cafeID}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comment }),
    }
  );
  return response;
}
