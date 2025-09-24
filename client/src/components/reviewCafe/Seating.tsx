import { MdChair } from "react-icons/md";
import { MdOutlineChair } from "react-icons/md";

export default function Seating({
  lightMode,
  setSeating,
  seating,
}: {
  lightMode: boolean;
  seating: number;
  setSeating: React.Dispatch<React.SetStateAction<number>>;
}) {
  const max = 5;
  function handleClick(rating: number) {
    setSeating(rating);
  }

  return (
    <fieldset
      className={`flex gap-2 items-center py-2 px-4 ${
        lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
      }`}
      style={{
        boxShadow: `3px 3px 2px ${
          lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
        }`,
      }}
    >
      <h1 className="font-bold text-xl light-text-color">How many seats?</h1>
      <div className="flex gap-1 cursor-pointer text-xl light-text-color ml-auto">
        {Array.from({ length: max }, (_, i) => {
          const rating = i + 1;
          return (
            <span key={rating} onClick={() => handleClick(rating)}>
              {rating <= seating ? <MdChair /> : <MdOutlineChair />}
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}
