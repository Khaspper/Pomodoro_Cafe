import Navbar from "./Navbar";
import { motion } from "framer-motion";

type TCafe = {
  brand: string;
  id: number;
  lat: GLfloat;
  lon: GLfloat;
  name: string;
  official_name: string;
  type: string;
};

type TSidebarContainer = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  selectedCafe,
  setOpen,
  open,
}: {
  selectedCafe: TCafe | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) {
  return (
    <div className="flex bg-indigo-50 z-2">
      <SidebarContainer setOpen={setOpen} open={open}>
        {selectedCafe !== null ? (
          <CafeInformation selectedCafe={selectedCafe} />
        ) : (
          <DefaultContent />
        )}
      </SidebarContainer>
    </div>
  );
}

function SidebarContainer({ children, setOpen, open }: TSidebarContainer) {
  return (
    <motion.nav
      className={`sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white ${
        open ? "w-[255px] md:w-[350px]" : "w-fit"
      }`}
      layout
    >
      <Navbar isOpen={open} />
      {open && children}
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
}

function DefaultContent() {
  return (
    <div>
      <h1>You haven't selected a Cafe yet!</h1>
      <h1>Choose a cafe to see it's info!</h1>
    </div>
  );
}

function CafeInformation({ selectedCafe }: { selectedCafe: TCafe }) {
  return (
    <div>
      <h1>Cafe Name: {selectedCafe.name}</h1>
      <h1>Cafe Id: {selectedCafe.id}</h1>
    </div>
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
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      {open ? <span>Close Sidebar</span> : <span>Open Sidebar</span>}
    </button>
  );
}
