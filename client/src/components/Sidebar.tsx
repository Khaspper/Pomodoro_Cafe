import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsWifi1, BsWifi2, BsWifi } from "react-icons/bs";
import { MdAttachMoney, MdMoneyOffCsred } from "react-icons/md";
import { IoIosOutlet } from "react-icons/io";
import { PiChairFill } from "react-icons/pi";

type TCafe = {
  brand: string | null;
  id: number;
  lat: GLfloat;
  lon: GLfloat;
  name: string;
  official_name: string | null;
  spotifyLink: string | null;
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
  seating: number;
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
      console.log("sidebar: data");
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
      <div className="flex flex-col gap-2">
        <CafeSectionOne cafeData={cafeData} />
        <CafeSectionTwo selectedCafe={selectedCafe} />
      </div>
      <ReviewCafe selectedCafe={selectedCafe} />
      <CafeCommentSection selectedCafe={selectedCafe} />
    </>
  );
}

function CafeSectionOne({ cafeData }: { cafeData: TCafeData | null }) {
  return (
    <section className="text-[#fbe3ad] bg-[#043253] p-2 rounded-lg mt-4 grow flex justify-around">
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <p>Wifi</p> <div>{getWifiStrength(cafeData?.wifiStrength)}</div>
      </div>
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <p>Free wifi</p>
        {cafeData?.freeWifi ? <MdAttachMoney /> : <MdMoneyOffCsred />}
      </div>
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <IoIosOutlet />
        {getAmountOfOutlets(cafeData?.outlets)}
      </div>
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <PiChairFill />
        {getSeats(cafeData?.seating)}
      </div>
    </section>
  );
}

function CafeSectionTwo({ selectedCafe }: { selectedCafe: TCafe }) {
  const embedSrc = selectedCafe.spotifyLink
    ? toSpotifyEmbed(selectedCafe.spotifyLink)
    : null;

  return (
    <section className="text-[#fbe3ad] bg-[#043253] p-4 rounded-lg mt-2 mb-2 grow">
      <h1 className="text-center text-xl mb-2">Vibe</h1>

      {embedSrc ? (
        <iframe
          style={{ borderRadius: 10 }}
          src={embedSrc}
          width="100%"
          height="100"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <form method="POST" className="text-lg flex flex-col gap-2">
          <p className="text-center">No Song yet! Enter one here!</p>
          <div className="flex gap-2">
            <input
              type="text"
              className="border-2 container rounded-lg py-1 px-2 outline-none"
              placeholder="Put a Spotify link here!"
            />
            <button type="submit" className="border-2 py-2 px-3 rounded-4xl">
              Submit
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function ReviewCafe({ selectedCafe }: { selectedCafe: TCafe }) {
  return (
    <div className="text-[#fbe3ad] bg-[#4c6850] p-2 rounded-lg mt-2 text-center">
      <Link to={`/review/${selectedCafe.id}`} className="text-2xl">
        Review cafe here!
      </Link>
    </div>
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

function getWifiStrength(strength: number | undefined) {
  if (!strength || strength === 3) {
    return <BsWifi />;
  } else if (strength === 2) {
    return <BsWifi2 />;
  }
  return <BsWifi1 />;
}

function getAmountOfOutlets(outlets: number | undefined) {
  if (!outlets || outlets === 3) {
    return <p>A LOT</p>;
  } else if (outlets === 2) {
    return <p>ENOUGH</p>;
  }
  return <p>FEW</p>;
}

function getSeats(seating: number | undefined) {
  if (!seating || seating === 3) {
    return <p>A LOT</p>;
  } else if (seating === 2) {
    return <p>ENOUGH</p>;
  }
  return <p>FEW</p>;
}

function toSpotifyEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname !== "open.spotify.com") return null;
    // turns /track/ID => /embed/track/ID (preserves query if present)
    u.pathname = u.pathname.replace(
      /^\/(track|album|playlist|artist)\//,
      "/embed/$1/"
    );
    return u.toString();
  } catch {
    return null;
  }
}
