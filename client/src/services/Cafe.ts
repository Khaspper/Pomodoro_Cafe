const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function sendComment(comment: string, cafeID: number) {
  const response = await fetch(`${BACKEND_URL}/cafe/${cafeID}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ comment }),
  });
  return response;
}
