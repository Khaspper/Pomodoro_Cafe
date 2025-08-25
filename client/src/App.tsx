import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  async function fetchData() {
    const response = await fetch("http://localhost:3000");
    const data = await response.json();
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      setMessage(data.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="">Vite + React</h1>
      <p className="bg-amber-700">message:{message}</p>
    </>
  );
}

export default App;
