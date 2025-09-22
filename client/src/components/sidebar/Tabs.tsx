export default function Tabs({
  showData,
  setShowData,
  lightMode,
}: {
  lightMode: boolean;
  showData: number;
  setShowData: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      className={`text-[#1c1917] flex justify-around text-lg p-2 font-bold ${
        lightMode ? "bg-light-secondary-color" : "bg-dark-secondary-color"
      } transition-colors`}
    >
      <button
        type="button"
        className={`cursor-pointer ${showData === 0 && "text-[#fae3ad]"}`}
        onClick={() => setShowData(0)}
      >
        Cafe Info
      </button>
      <p className="cursor-default">|</p>
      <button
        type="button"
        className={`cursor-pointer ${showData === 1 && "text-[#fae3ad]"}`}
        onClick={() => setShowData(1)}
      >
        Cafe Comments
      </button>
      <p className="cursor-default">|</p>
      <button
        type="button"
        className={`cursor-pointer ${showData === 2 && "text-[#fae3ad]"}`}
        onClick={() => setShowData(2)}
      >
        Review Cafe
      </button>
    </div>
  );
}
