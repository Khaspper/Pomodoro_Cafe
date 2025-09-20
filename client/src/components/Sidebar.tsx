import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CafePerks from "./sidebar/CafePerks";
import Vibe from "./sidebar/Vibe";
import type { TCafe, TCafeData, TSidebarContainer } from "../types/types";
import CafeComments from "./sidebar/comments/CafeComments";
import Tabs from "./sidebar/Tabs";
import ProtectedRoute from "./ProtectedRoute";
import ReviewCafe from "../pages/ReviewCafe";
import { FiChevronsRight } from "react-icons/fi";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function Sidebar({
  selectedCafe,
  setOpen,
  open,
  setCafeUpdated,
}: {
  selectedCafe: TCafe;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setCafeUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [reviewAdded, setReviewAdded] = useState(false);
  const [cafeData, setCafeData] = useState<TCafeData | null>(null);
  const [showData, setShowData] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        if (import.meta.env.DEV === true) {
          console.log(`Sidebar: Fetching Cafe(${selectedCafe.id}) inputs...`);
        }
        const response = await fetch(
          `${BACKEND_URL}/cafe/${selectedCafe.id}/inputs`,
          { signal: abortController.signal }
        );

        if (import.meta.env.DEV === true) {
          console.log(`Sidebar: response status: ${response.status}`);
        }

        if (response.status === 204) {
          console.error("No reviews for this cafe!");
          setCafeData({
            cafeId: selectedCafe.id,
            wifiCount: 3,
            outletCount: 5,
            seatingCount: 5,
            freeWifi: true,
          });
        } else {
          const data = await response.json();
          const freeWifi = data.wifiFreeCount > 0 ? true : false;
          setCafeData({ ...data, freeWifi });
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Sidebar: Fetch aborted");
        } else {
          console.error("Sidebar: Fetch error:", error);
        }
      }
    }

    setReviewAdded(false);
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [selectedCafe, reviewAdded]);

  return (
    <div className="flex bg-indigo-50 z-2">
      <SidebarContainer
        setOpen={setOpen}
        open={open}
        setShowData={setShowData}
        showData={showData}
      >
        {showData === 0 ? (
          <div className="p-4 grow">
            <CafeInformation
              selectedCafe={selectedCafe}
              cafeData={cafeData}
              setCafeUpdated={setCafeUpdated}
            />
          </div>
        ) : showData === 1 ? (
          <div className="p-4 grow">
            <CafeComments selectedCafe={selectedCafe} />
          </div>
        ) : (
          <div className="p-4 grow">
            <ProtectedRoute>
              <ReviewCafe
                cafeID={selectedCafe.id}
                setReviewAdded={setReviewAdded}
              />
            </ProtectedRoute>
          </div>
        )}
      </SidebarContainer>
    </div>
  );
}

function SidebarContainer({
  children,
  setOpen,
  open,
  showData,
  setShowData,
}: TSidebarContainer) {
  return (
    <motion.nav
      className={`sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-[#1c1917] ${
        open ? "w-screen md:w-[400px]" : "w-fit"
      } overflow-y-auto no-scrollbar relative flex flex-col`}
      layout
    >
      <Navbar isOpen={open} />
      {open && <Tabs showData={showData} setShowData={setShowData} />}
      <div className={`flex flex-col grow ${!open && "justify-end"}`}>
        {open && children}
        <div className="">
          <ToggleClose open={open} setOpen={setOpen} />
        </div>
      </div>
    </motion.nav>
  );
}

function CafeInformation({
  selectedCafe,
  cafeData,
  setCafeUpdated,
}: {
  selectedCafe: TCafe;
  cafeData: TCafeData | null;
  setCafeUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <section className="text-[#1a1a1a] bg-[#d02329] p-2 rounded-lg overflow-y-auto">
        <h1 className="text-3xl text-center font-extrabold">
          {selectedCafe.name}
        </h1>
      </section>
      <div className="flex flex-col gap-2">
        <CafePerks cafeData={cafeData} />
        <Vibe selectedCafe={selectedCafe} setCafeUpdated={setCafeUpdated} />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfzlGs7YKGTL3ioCKYLOsX9yDZu-diytfiTR2tJ0COnN3yHvA/viewform"
          target="blank"
          className="text-2xl font-extrabold bg-[#fae3ad] text-[#b64128] text-center inline p-4 rounded-2xl hover:scale-105 transform transition-transform duration-150"
        >
          Review the website here!
        </a>
      </div>
    </>
  );
}

function ToggleClose({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setOpen((pv) => !pv)}
      className="sticky bottom-0 left-0 right-0 border-t transition-colors hover:bg-[#b54329] container bg-[#1c1917] shrink-0"
    >
      <div className="flex items-center justify-center p-2 cursor-pointer">
        <div className="grid size-10 place-content-center text-2xl text-[#fae3ad]">
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </div>
        {open && (
          <span className="text-xl font-medium text-[#fae3ad]">Hide</span>
        )}
      </div>
    </button>
  );
}
