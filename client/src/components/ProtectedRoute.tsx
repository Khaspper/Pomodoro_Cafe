import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TProtectedProps = { children: React.ReactNode };

export default function ProtectedRoute({ children }: TProtectedProps) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      // TODO: Replace hardcoded localhost URL with environment variable
      const res = await fetch("http://localhost:3000/account", {
        credentials: "include",
      });
      if (res.ok) {
        setAllowed(true);
      } else {
        setAllowed(false);
        navigate("/login", {
          replace: true,
          state: {
            error: "To access the page or review a cafe you need to login.",
          },
        });
      }
      setChecking(false);
    })();
  }, [navigate]);

  // TODO: Replace with proper loading spinner component
  // if (checking) {
  //  console.log("Loading");
  // }
  if (checking) return <h1 className="text-4xl">Loading</h1>;
  return allowed ? children : null;
}

//TODO: Maybe put a loading gif instead
/* if (checking) {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src="/tomato-spinner.gif"
        alt="Loading..."
        className="w-20 h-20 animate-spin"
      />
    </div>
  );
} */
