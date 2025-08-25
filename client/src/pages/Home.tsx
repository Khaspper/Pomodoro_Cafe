import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState(
    "Failed to fetch from login serverFailed to fetch from index server"
  );

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
      <p className="bg-amber-700 text-3xl">
        <span className="text-white">Index----</span>message: {message}
      </p>
    </>
  );
}
