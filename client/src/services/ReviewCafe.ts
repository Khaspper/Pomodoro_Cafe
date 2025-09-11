export async function sendReview(
  cafeID: string,
  wifiStrength: number,
  outlets: number,
  seating: number,
  freeWifi: boolean
) {
  const response = await fetch(`http://localhost:3000/review/${cafeID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wifiStrength, outlets, seating, freeWifi }),
  });
  console.log("Review Cafe API");
  console.log(response);
}
