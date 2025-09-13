import type { TCafe } from "../../../types/types";

export default function CafeComments({
  selectedCafe,
}: {
  selectedCafe: TCafe;
}) {
  return (
    // And delete the background
    <section className="overflow-y: auto bg-[#4c6850] p-2 mt-2">
      <h1 className="text-center font-extrabold ">Comments</h1>
      <h1>location: {selectedCafe.id} </h1>
      <h1>Get cafes comments here</h1>
    </section>
  );
}
