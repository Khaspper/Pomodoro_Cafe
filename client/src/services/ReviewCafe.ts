const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function sendReview(
  cafeID: string,
  wifiStrength: number,
  outlets: number,
  seating: number,
  freeWifi: number
) {
  if (import.meta.env.DEV === true) {
    console.log("Cafe Review: Fetching Cafe Review...");
  }
  const response = await fetch(`${BACKEND_URL}/cafe/review/${cafeID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wifiStrength, outlets, seating, freeWifi }),
    credentials: "include",
  });
  if (import.meta.env.DEV === true) {
    console.log(`Cafe Review: Response: ${response.status}`);
  }
  return response;
}
