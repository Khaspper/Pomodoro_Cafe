export default function Tabs({
  showData,
  setShowData,
}: {
  showData: number;
  setShowData: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="text-[#1c1917] flex justify-around text-lg p-2 bg-[#4c6850] font-bold">
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
