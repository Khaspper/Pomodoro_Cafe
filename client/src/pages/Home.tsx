import MyMap from "../components/MyMap";
import { useState, useEffect } from "react";

type THomeProps = { children: React.ReactNode };

export default function Home({ children }: THomeProps) {
  const [cafes, setCafes] = useState([]);

  console.log(cafes[0]);

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

  return (
    <div className="relative">
      <div className="absolute z-1 w-screen">{children}</div>
      <MyMap />
    </div>
  );
}
