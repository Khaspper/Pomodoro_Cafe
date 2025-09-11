import type { TCafeData } from "../../types/types";

// Icons
import { IoIosOutlet } from "react-icons/io";
import { BsOutlet } from "react-icons/bs";
import { MdChair } from "react-icons/md";
import { MdOutlineChair } from "react-icons/md";
import { GrWifiLow, GrWifiMedium, GrWifi } from "react-icons/gr";

import { MdAttachMoney, MdMoneyOffCsred } from "react-icons/md";

export default function CafePerks({
  cafeData,
}: {
  cafeData: TCafeData | null;
}) {
  return (
    <section className="text-[#fbe3ad] bg-[#043253] p-2 rounded-lg mt-4 grow flex justify-around">
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <p>Wifi</p>{" "}
        <div className="flex gap-2">
          {getWifiStrength(cafeData?.wifiStrength)}{" "}
          {cafeData?.freeWifi ? <MdAttachMoney /> : <MdMoneyOffCsred />}
        </div>
      </div>
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <h1>Outlets</h1>
        <div className="flex">{getAmountOfOutlets(cafeData?.outlets)}</div>
      </div>
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <h1>Seating</h1>
        <div className="flex">{getSeats(cafeData?.seating)}</div>
      </div>
    </section>
  );
}

function getWifiStrength(strength: number | undefined) {
  if (!strength || strength === 3) {
    return <GrWifi />;
  } else if (strength === 2) {
    return <GrWifiMedium />;
  }
  return <GrWifiLow />;
}

function getAmountOfOutlets(outlets?: number) {
  if (!outlets) outlets = 5;

  const filled = Array(outlets).fill(<IoIosOutlet />);
  const empty = Array(5 - outlets).fill(<BsOutlet />);

  return (
    <>
      {filled}
      {empty}
    </>
  );
}

function getSeats(seating: number | undefined) {
  if (!seating) seating = 5;

  const filled = Array(seating).fill(<MdChair />);
  const empty = Array(5 - seating).fill(<MdOutlineChair />);

  return (
    <>
      {filled}
      {empty}
    </>
  );
}
