export default function FreeWifi({
  setFreeWifi,
  freeWifi,
}: {
  setFreeWifi: React.Dispatch<React.SetStateAction<boolean>>;
  freeWifi: boolean;
}) {
  // React.ChangeEvent<HTMLSelectElement>;
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-bold md:text-xl">Is the wifi free?</legend>
      <div className="flex gap-3 mt-2">
        <label
          className={`${
            freeWifi ? "border-2" : ""
          } w-fit inline py-1 px-3 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150`}
        >
          <input
            type="radio"
            name="freeWifi"
            value="true"
            hidden
            onClick={() => {
              setFreeWifi((pv) => !pv);
            }}
          />
          Yes
        </label>
        <label
          className={`${
            !freeWifi ? "border-2" : ""
          } w-fit inline py-1 px-3 rounded-2xl cursor-pointer hover:scale-105 transform transition-transform duration-150`}
        >
          <input
            type="radio"
            name="freeWifi"
            value="false"
            hidden
            onClick={() => {
              setFreeWifi((pv) => !pv);
            }}
          />
          No
        </label>
      </div>
    </fieldset>
  );
}
