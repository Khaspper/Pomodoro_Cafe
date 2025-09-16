import { IoIosOutlet } from "react-icons/io";
import { BsOutlet } from "react-icons/bs";

export default function Outlets({
  setOutletAmounts,
  outletAmounts,
}: {
  outletAmounts: number;
  setOutletAmounts: React.Dispatch<React.SetStateAction<number>>;
}) {
  const max = 5;
  function handleClick(rating: number) {
    setOutletAmounts(rating);
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="font-bold text-xl">How many outlets?</h1>
        <div className="flex gap-2 items-center">
          <h2 className="font-bold text-xs text-[#b1372c]">One Outlet is 2</h2>{" "}
          <div className="text-xs border-1">
            <IoIosOutlet />
            <IoIosOutlet />
          </div>
          <h2 className="font-bold text-xs text-[#b1372c]"> pair</h2>
        </div>
      </div>
      <div className="flex gap-2 cursor-pointer text-2xl">
        {Array.from({ length: max }, (_, i) => {
          const rating = i + 1;
          return (
            <span key={rating} onClick={() => handleClick(rating)}>
              {rating <= outletAmounts ? <IoIosOutlet /> : <BsOutlet />}
            </span>
          );
        })}
      </div>
    </div>
  );
}
