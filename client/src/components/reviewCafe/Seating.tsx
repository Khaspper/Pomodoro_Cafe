import { MdChair } from "react-icons/md";
import { MdOutlineChair } from "react-icons/md";

export default function Seating({
  setSeating,
  seating,
}: {
  seating: number;
  setSeating: React.Dispatch<React.SetStateAction<number>>;
}) {
  const max = 5;
  function handleClick(rating: number) {
    setSeating(rating);
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="font-bold text-xl">How many seats?</h1>
        <h2 className="font-bold text-xs text-[#b1372c]">
          One chair icon is 4 chairs real life
        </h2>
      </div>
      <div className="flex gap-2 cursor-pointer text-2xl">
        {Array.from({ length: max }, (_, i) => {
          const rating = i + 1;
          return (
            <span key={rating} onClick={() => handleClick(rating)}>
              {rating <= seating ? <MdChair /> : <MdOutlineChair />}
            </span>
          );
        })}
      </div>
    </div>
  );
}
