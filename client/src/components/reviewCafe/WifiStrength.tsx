export default function WifiStrength({
  setWifiStrength,
}: {
  setWifiStrength: React.Dispatch<React.SetStateAction<number>>;
}) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setWifiStrength(Number(event.target.value));
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <label className="font-bold md:text-xl" htmlFor="wifiStrength">
        How's the Wifi?
      </label>
      <select
        name="wifiStrength"
        id="wifiStrength"
        className="border-2 py-2 px-1 rounded-lg outline-none"
        onChange={handleChange}
      >
        <option value="3">Great</option>
        <option value="2">Good</option>
        <option value="1">Bad</option>
      </select>
    </fieldset>
  );
}
