import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CafePerks from "./sidebar/CafeInfo";
import Vibe from "./sidebar/Vibe";
import type { TCafe, TCafeData, TSidebarContainer } from "../types/types";
import CafeComments from "./sidebar/Comments";
import ReviewCafeButton from "./sidebar/ReviewCafeButton";

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
  const [cafeData, setCafeData] = useState<TCafeData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/cafe/${selectedCafe.id}/inputs`
      );

      if (!response.ok) {
        console.error("No reviews for this cafe!");
        return;
      }

      const ct = response.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        console.error("Server did not return JSON");
        return;
      }

      const data = await response.json();
      setCafeData(data);
    }
    fetchData();
  }, [selectedCafe]);

  return (
    <div className="flex bg-indigo-50 z-2">
      <SidebarContainer setOpen={setOpen} open={open}>
        <CafeInformation
          selectedCafe={selectedCafe}
          cafeData={cafeData}
          setCafeUpdated={setCafeUpdated}
        />
      </SidebarContainer>
    </div>
  );
}

function SidebarContainer({ children, setOpen, open }: TSidebarContainer) {
  return (
    <motion.nav
      className={`sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-[#1c1917] ${
        open ? "w-screen md:w-[400px]" : "w-fit"
      }`}
      layout
    >
      <Navbar isOpen={open} />
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
      <ReviewCafeButton selectedCafe={selectedCafe} />
      <CafeComments selectedCafe={selectedCafe} />
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
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 bg-slate-100"
    >
      {open ? "Close Sidebar" : "Open Sidebar"}
    </motion.button>
  );
}
