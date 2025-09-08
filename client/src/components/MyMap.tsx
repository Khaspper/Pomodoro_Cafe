import { Map, Marker, useMap } from "@vis.gl/react-maplibre";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "maplibre-gl/dist/maplibre-gl.css";

type TCafe = {
  brand: string | null;
  id: number;
  lat: GLfloat;
  lon: GLfloat;
  name: string;
  official_name: string | null;
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
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/cafe");
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
        attributionControl={false}
      >
        <Sidebar selectedCafe={selectedCafe} setOpen={setOpen} open={open} />
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
