import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MyMap() {
  const lasVegasBounds: [[number, number], [number, number]] = [
    [-115.413944, 35.884647],
    [-114.681238, 36.411675],
  ];

  return (
    <Map
      initialViewState={{
        longitude: -115.1398,
        latitude: 36.1699,
        zoom: 11,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      maxBounds={lasVegasBounds}
    />
  );
}
