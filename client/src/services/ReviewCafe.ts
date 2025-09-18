export async function sendReview(
  cafeID: string,
  wifiStrength: number,
  outlets: number,
  seating: number,
  freeWifi: number
) {
  // const outlets = 8;
  const response = await fetch(`http://localhost:3000/cafe/review/${cafeID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wifiStrength, outlets, seating, freeWifi }),
    credentials: "include",
  });
  return response;
}
