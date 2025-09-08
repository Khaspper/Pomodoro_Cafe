import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type TCafe = {
  brand: string | null;
  id: number;
  lat: GLfloat;
  lon: GLfloat;
  name: string;
  official_name: string | null;
};

type TSidebarContainer = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TCafeData = {
  id: number;
  cafeId: number;
  wifiStrength: number;
  freeWifi: boolean;
  outlets: number;
  numberOfInputs: number;
};

export default function Sidebar({
  selectedCafe,
  setOpen,
  open,
}: {
  selectedCafe: TCafe;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) {
  const [cafeData, setCafeData] = useState<TCafeData | null>(null);

  useEffect(() => {
    console.log("inside");
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/cafe/${selectedCafe.id}/inputs`
      );

      if (!response.ok) {
        console.error("No reviews for this cafe!");
        return;
      }

      // avoid parsing when body is empty (e.g., 204)
      const ct = response.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        console.error("Server did not return JSON");
        return;
      }

      const data = await response.json();
      console.log(data);
      setCafeData(data);
    }
    fetchData();
  }, [selectedCafe]);

  return (
    <div className="flex bg-indigo-50 z-2">
      <SidebarContainer setOpen={setOpen} open={open}>
        <CafeInformation selectedCafe={selectedCafe} cafeData={cafeData} />
      </SidebarContainer>
    </div>
  );
}

function SidebarContainer({ children, setOpen, open }: TSidebarContainer) {
  return (
    <motion.nav
      className={`sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-[#1a1a1a] ${
        open ? "w-[255px] md:w-[350px]" : "w-fit"
      }`}
      layout
    >
      <Navbar isOpen={open} />
      <div className="p-2">
        {open && children}
        <ToggleClose open={open} setOpen={setOpen} />
      </div>
    </motion.nav>
  );
}

function CafeInformation({
  selectedCafe,
  cafeData,
}: {
  selectedCafe: TCafe;
  cafeData: TCafeData | null;
}) {
  return (
    <>
      <section className="text-[#1a1a1a] bg-[#d02329] p-2 rounded-lg">
        <h1 className="text-3xl text-center font-extrabold">
          {selectedCafe.name}
        </h1>
      </section>
      <div className="flex gap-2">
        <CafeSectionOne cafeData={cafeData} />
        <CafeSectionTwo cafeData={cafeData} />
      </div>
      <ReviewCafe cafeData={cafeData} />
      <CafeCommentSection selectedCafe={selectedCafe} />
    </>
  );
}

function CafeSectionOne({ cafeData }: { cafeData: TCafeData | null }) {
  return (
    <section className="text-[#fbe3ad] bg-[#043253] p-2 rounded-lg mt-2 grow">
      <h1>wifi: {cafeData ? cafeData.wifiStrength : "Strong"} </h1>
      <h1>wifi: is not free </h1>
      <h1>outlets: Low</h1>
      <h1>seating: Not many</h1>
    </section>
  );
}

function CafeSectionTwo({ cafeData }: { cafeData: TCafeData | null }) {
  return (
    <section className="text-[#fbe3ad] bg-[#043253] p-2 rounded-lg mt-2 grow-2">
      <h1>location:</h1>
      <h1>wifi: {cafeData ? cafeData.wifiStrength : "Strong"} </h1>
      <h1>vibe: spotify song here</h1>
    </section>
  );
}

function ReviewCafe({ cafeData }: { cafeData: TCafeData | null }) {
  return (
    <section className="text-[#fbe3ad] bg-[#4c6850] p-2 rounded-lg mt-2">
      <h1>wifi: {cafeData ? cafeData.wifiStrength : "Strong"} </h1>
      {/* This should send the user to a different link */}
      <Link to={"/"}>Review cafe here!</Link>
    </section>
  );
}

function CafeCommentSection({ selectedCafe }: { selectedCafe: TCafe }) {
  return (
    // And delete the background
    <section className="overflow-y: auto bg-[#4c6850] p-2 mt-2">
      <h1 className="text-center font-extrabold ">Comments</h1>
      <h1>location: {selectedCafe.id} </h1>
      <h1>Get cafes comments here</h1>
    </section>
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
