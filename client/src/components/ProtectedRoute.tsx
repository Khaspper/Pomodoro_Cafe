import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

type TProtectedProps = { children: React.ReactNode };

export default function ProtectedRoute({ children }: TProtectedProps) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show loading spinner after 2 seconds
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 500);

    (async () => {
      if (import.meta.env.DEV) {
        console.log("ProtectedRoute: Checking authentication...");
      }
      const res = await fetch(`${BACKEND_URL}/account`, {
        credentials: "include",
      });
      if (import.meta.env.DEV) {
        console.log("ProtectedRoute: Auth response: ", res.status);
      }
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
      clearTimeout(timer);
    })();

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  // Show loading spinner after 2 seconds OR if still checking
  if (checking && showLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1c1917] text-center">
        <div className="">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#b6432a] border-t-transparent mx-auto mb-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🍅</span>
            </div>
          </div>
          <h1 className="text-2xl text-[#fae3ad] font-semibold">
            Checking access...
          </h1>
          <p className="text-[#fae3ad] mt-2">
            Please wait while we verify your login
          </p>
        </div>
      </div>
    );
  }
  return allowed ? children : null;
}
