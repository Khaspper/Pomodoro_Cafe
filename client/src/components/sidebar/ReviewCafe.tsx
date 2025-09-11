import type { TCafe } from "../../types/types";
import { Link } from "react-router-dom";

export default function ReviewCafe({ selectedCafe }: { selectedCafe: TCafe }) {
  return (
    <Link to={`/review/${selectedCafe.id}`} className="text-2xl">
      <div className="text-[#fbe3ad] bg-[#4c6850] p-2 rounded-lg mt-2 mb-4 text-center">
        Data wrong? Improve it here!
      </div>
    </Link>
  );
}
