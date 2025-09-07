import { Map, Marker } from "@vis.gl/react-maplibre";
import { useState, useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MyMap() {
  const [cafes, setCafes] = useState([]);
  console.log(cafes);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        throw new Error("Failed to get all cafes.");
      }
      const cafes = await response.json();
      setCafes(cafes);
    }
    fetchData();
  }, []);

  const lasVegasBounds: [[number, number], [number, number]] = [
    [-115.486398, 35.916672],
    [-114.907841, 36.411699],
  ];

  if (cafes.length === 0) {
    return <h1 className="text-5xl text-black">Loading</h1>;
  }

  return (
    <div className="relative">
      <Map
        initialViewState={{
          longitude: -115.1398,
          latitude: 36.1699,
          zoom: 5,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        maxBounds={lasVegasBounds}
      >
        {cafes.map((cafe: { id: number; lon: number; lat: number }) => (
          <Marker
            key={cafe.id}
            longitude={cafe.lon}
            latitude={cafe.lat}
            anchor="bottom"
            className="cursor-pointer"
          >
            <div className="text-xl">☕</div>
          </Marker>
        ))}
      </Map>
      {/* <h1 className="absolute top-0 right-0 z-2">hi</h1> */}
    </div>
  );
}
