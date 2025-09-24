export default function WifiStrength({
  setWifiStrength,
  lightMode,
}: {
  setWifiStrength: React.Dispatch<React.SetStateAction<number>>;
  lightMode: boolean;
}) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setWifiStrength(Number(event.target.value));
  }

  return (
    <fieldset
      className={`flex gap-2 items-center justify-between py-2 px-4 ${
        lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
      }`}
      style={{
        boxShadow: `3px 3px 2px ${
          lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
        }`,
      }}
    >
      <label
        className="font-bold text-xl light-text-color"
        htmlFor="wifiStrength"
      >
        How's the Wifi?
      </label>
      <select
        name="wifiStrength"
        id="wifiStrength"
        className="py-2 px-1 outline-none text-xl light-text-color underline"
        onChange={handleChange}
      >
        <option value="3">Great</option>
        <option value="2">Good</option>
        <option value="1">Bad</option>
      </select>
    </fieldset>
  );
}
