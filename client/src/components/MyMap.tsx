import { Map, Marker, useMap } from "@vis.gl/react-maplibre";
import { useState, useEffect } from "react";
import dotenv from "dotenv";
import Sidebar from "./Sidebar";
import "maplibre-gl/dist/maplibre-gl.css";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

type TCafe = {
  brand: string | null;
  id: number;
  lat: GLfloat;
  lon: GLfloat;
  name: string;
  official_name: string | null;
  spotifyLink: string | null;
};

export default function MyMap() {
  const [cafes, setCafes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<TCafe>({
    brand: null,
    id: 201,
    lat: 36.1596236,
    lon: -115.2332193,
    name: "Grouchy John's Coffee",
    official_name: null,
    spotifyLink:
      "https://open.spotify.com/track/2GpNjyQO67Ss38PmPaL6uA?si=4ff61a93b6434dc2",
  });
  const [cafeUpdated, setCafeUpdated] = useState(true);

  useEffect(() => {
    if (!cafeUpdated) return;

    (async () => {
      const response = await fetch(`${BACKEND_URL}/cafe`);
      if (!response.ok) throw new Error("Failed to get all cafes.");

      const cafes = await response.json();
      setCafes(cafes);

      // ⬇️ keep selectedCafe in sync with DB
      const updated = cafes.find((cafe: TCafe) => cafe.id === selectedCafe.id);
      if (updated) setSelectedCafe(updated);

      setCafeUpdated(false);
    })();
  }, [cafeUpdated, selectedCafe.id]);

  const lasVegasBounds: [[number, number], [number, number]] = [
    [-115.486398, 35.916672],
    [-114.907841, 36.411699],
  ];

  if (cafes.length === 0) {
    // TODO: Replace with proper loading spinner component
    // TODO: Add error handling for failed API calls
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
        attributionControl={false}
      >
        <Sidebar
          selectedCafe={selectedCafe}
          setOpen={setOpen}
          open={open}
          setCafeUpdated={setCafeUpdated}
        />
        {cafes.map((cafe: TCafe) => (
          <CafeMarker
            key={cafe.id}
            cafe={cafe}
            setSelectedCafe={setSelectedCafe}
          />
        ))}
      </Map>
    </div>
  );
}

function CafeMarker({
  cafe,
  setSelectedCafe,
}: {
  cafe: TCafe;
  setSelectedCafe: React.Dispatch<React.SetStateAction<TCafe>>;
}) {
  const { current: map } = useMap();

  function handleClick() {
    if (!map) return;
    map.flyTo({
      center: [cafe.lon, cafe.lat],
      zoom: 15,
      speed: 1.2,
      curve: 1.4,
    });
  }

  return (
    <Marker
      longitude={cafe.lon}
      latitude={cafe.lat}
      anchor="bottom"
      onClick={() => {
        handleClick();
        setSelectedCafe(cafe);
      }}
      className="cursor-pointer"
    >
      <div className="text-xl">☕</div>
    </Marker>
  );
}
