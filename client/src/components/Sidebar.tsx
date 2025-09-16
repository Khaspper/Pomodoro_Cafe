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
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/cafe/${selectedCafe.id}/inputs`
      );
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
    }
    setReviewAdded(false);
    fetchData();
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
          <CafeInformation
            selectedCafe={selectedCafe}
            cafeData={cafeData}
            setCafeUpdated={setCafeUpdated}
          />
        ) : showData === 1 ? (
          <CafeComments selectedCafe={selectedCafe} />
        ) : (
          <ProtectedRoute>
            <ReviewCafe
              cafeID={selectedCafe.id}
              setReviewAdded={setReviewAdded}
            />
          </ProtectedRoute>
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
      }`}
      layout
    >
      <Navbar isOpen={open} />
      {open && <Tabs showData={showData} setShowData={setShowData} />}
      <div className="p-4">
        {open && children}
        <ToggleClose open={open} setOpen={setOpen} />
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
      <section className="text-[#1a1a1a] bg-[#d02329] p-2 rounded-lg">
        <h1 className="text-3xl text-center font-extrabold">
          {selectedCafe.name}
        </h1>
      </section>
      <div className="flex flex-col gap-2">
        <CafePerks cafeData={cafeData} />
        <Vibe selectedCafe={selectedCafe} setCafeUpdated={setCafeUpdated} />
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
      className="absolute bottom-0 left-0 right-0 border-t transition-colors hover:bg-[#b54329]"
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
