export function Seating({
  setSeating,
}: {
  setSeating: React.Dispatch<React.SetStateAction<number>>;
}) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSeating(Number(event.target.value));
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <label className="font-bold md:text-xl" htmlFor="seating">
        How is the seating?
      </label>
      <select
        name="seating"
        id="seating"
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
