export async function getCafesFromOverPass() {
  const query = `
[out:json][timeout:180];

(
  nwr["amenity"="cafe"](35.95,-115.47,36.36,-114.92);
  nwr["shop"="coffee"](35.95,-115.47,36.36,-114.92);
  nwr["shop"="tea"](35.95,-115.47,36.36,-114.92);
)->.all;

area["aeroway"="aerodrome"]["name"="Harry Reid International Airport"]->.airport;
(
  nwr["amenity"="cafe"](area.airport);
  nwr["shop"="coffee"](area.airport);
  nwr["shop"="tea"](area.airport);
)->.airportHits;

(
  way["aeroway"~"^(runway|taxiway|apron)$"](area.airport);
)->.aerowayWays;

nwr(around.aerowayWays:250)["amenity"="cafe"]->.airportBuf1;
nwr(around.aerowayWays:250)["shop"="coffee"]->.airportBuf2;
nwr(around.aerowayWays:250)["shop"="tea"]->.airportBuf3;

(.airportHits; .airportBuf1; .airportBuf2; .airportBuf3;)->.airportAll;

(
  nwr["amenity"="cafe"](36.080,-115.185,36.145,-115.145);
  nwr["shop"="coffee"](36.080,-115.185,36.145,-115.145);
  nwr["shop"="tea"](36.080,-115.185,36.145,-115.145);
)->.stripHits;

(.all; - .airportAll;)->.noAirport;
(.noAirport; - .stripHits;)->.filtered;

(.filtered;);
out center tags;


`;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "data=" + encodeURIComponent(query),
  });

  const data = await res.json();
  if (typeof data === "object" && data !== null && "elements" in data) {
    console.log(data.elements);
  } else {
    console.log("SOMETHING WENT WRONG WHAT THE HECK!!!!!");
  }
}

getCafesFromOverPass();
