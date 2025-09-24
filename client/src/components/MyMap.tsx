import { Map, Marker, useMap } from "@vis.gl/react-maplibre";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "maplibre-gl/dist/maplibre-gl.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

type TCafe = {
  brand: string | null;
  id: number;
  lat: GLfloat;
  lon: GLfloat;
  name: string;
  official_name: string | null;
  spotifyLink: string | null;
};

export default function MyMap({
  lightMode,
  setLightMode,
}: {
  lightMode: boolean;
  setLightMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [cafes, setCafes] = useState([]);
  const [open, setOpen] = useState(false);
  const [failedToGetCafes, setFailedToGetCafes] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      try {
        setFailedToGetCafes(false);
        setErrorMessage(null);

        if (import.meta.env.DEV === true) {
          console.log("Fetching cafes...");
        }
        const response = await fetch(`${BACKEND_URL}/cafe`);
        if (import.meta.env.DEV === true) {
          console.log("Cafe Response: ", response.status);
        }
        if (!response.ok) {
          throw new Error(`Failed to get cafes. Status: ${response.status}`);
        }

        const cafes = await response.json();
        setCafes(cafes);

        const updated = cafes.find(
          (cafe: TCafe) => cafe.id === selectedCafe.id
        );
        if (updated) setSelectedCafe(updated);

        setCafeUpdated(false);
      } catch (error) {
        console.error("Error fetching cafes:", error);
        setFailedToGetCafes(true);
        setErrorMessage(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      }
    })();
  }, [cafeUpdated, selectedCafe.id]);

  const lasVegasBounds: [[number, number], [number, number]] = [
    [-115.486398, 35.916672],
    [-114.907841, 36.411699],
  ];

  const handleRetry = () => {
    window.location.reload();
  };

  if (failedToGetCafes) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">☕❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Failed to Load Cafes
          </h1>
          <p className="text-gray-600 mb-4">
            {errorMessage ||
              "Something went wrong while loading the cafe data."}
          </p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <Map
        initialViewState={{
          longitude: -115.1398,
          latitude: 36.1699,
          zoom: 5,
        }}
        style={{ width: "100vw", height: "100dvh" }}
        mapStyle={
          lightMode
            ? "https://tiles.openfreemap.org/styles/liberty"
            : "https://tiles.openfreemap.org/styles/dark"
        }
        maxBounds={lasVegasBounds}
        attributionControl={false}
      >
        <Sidebar
          setLightMode={setLightMode}
          lightMode={lightMode}
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
            setOpen={setOpen}
          />
        ))}
      </Map>
    </div>
  );
}

function CafeMarker({
  cafe,
  setSelectedCafe,
  setOpen,
}: {
  cafe: TCafe;
  setSelectedCafe: React.Dispatch<React.SetStateAction<TCafe>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
        setOpen(true);
      }}
      className="cursor-pointer"
    >
      <div className="text-xl">☕</div>
    </Marker>
  );
}
