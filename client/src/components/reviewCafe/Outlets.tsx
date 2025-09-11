export function Outlets({
  setOutletAmounts,
}: {
  setOutletAmounts: React.Dispatch<React.SetStateAction<number>>;
}) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setOutletAmounts(Number(event.target.value));
  }
  return (
    <fieldset className="flex flex-col gap-2">
      <label className="font-bold md:text-xl" htmlFor="outlets">
        How many outlets?
      </label>
      <select
        name="outlets"
        id="outlets"
        className="border-2 py-2 px-1 rounded-lg outline-none"
        onChange={handleChange}
      >
        <option value="3">A lot</option>
        <option value="2">Enough</option>
        <option value="1">Few</option>
      </select>
    </fieldset>
  );
}
