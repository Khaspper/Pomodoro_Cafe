export default function FreeWifi({
  setFreeWifi,
  freeWifi,
  lightMode,
}: {
  setFreeWifi: React.Dispatch<React.SetStateAction<number>>;
  freeWifi: number;
  lightMode: boolean;
}) {
  // React.ChangeEvent<HTMLSelectElement>;
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
      <h1 className="font-bold text-xl light-text-color">Is the wifi free?</h1>
      <label
        className={`light-text-color ml-auto ${
          freeWifi ? "border-2" : ""
        } w-fit inline py-1 px-3 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150`}
      >
        <input
          type="radio"
          name="freeWifi"
          value="1"
          hidden
          onClick={() => {
            setFreeWifi(1);
          }}
        />
        Yes
      </label>
      <label
        className={`light-text-color ${
          !freeWifi ? "border-2" : ""
        } w-fit inline py-1 px-3 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150`}
      >
        <input
          type="radio"
          name="freeWifi"
          value="0"
          hidden
          onClick={() => {
            setFreeWifi(0);
          }}
        />
        No
      </label>
    </fieldset>
  );
}
