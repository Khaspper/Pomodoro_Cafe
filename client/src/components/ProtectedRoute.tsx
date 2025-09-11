import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TProtectedProps = { children: React.ReactNode };

export default function ProtectedRoute({ children }: TProtectedProps) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/account", {
        credentials: "include",
      });
      if (res.ok) {
        setAllowed(true);
      } else {
        setAllowed(false);
        navigate("/login", {
          replace: true,
          state: { error: "To access the page you need to login." },
        });
      }
      setChecking(false);
    })();
  }, [navigate]);

  if (checking) return <h1 className="text-4xl">Loading</h1>;
  return allowed ? children : null;
}
