import type { TCafeData } from "../../types/types";

// Icons
import { IoIosOutlet } from "react-icons/io";
import { PiChairFill } from "react-icons/pi";
import { MdAttachMoney, MdMoneyOffCsred } from "react-icons/md";
import { BsWifi1, BsWifi2, BsWifi } from "react-icons/bs";

export default function CafePerks({
  cafeData,
}: {
  cafeData: TCafeData | null;
}) {
  return (
    <section className="text-[#fbe3ad] bg-[#043253] p-2 rounded-lg mt-4 grow flex justify-around">
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <p>Wifi</p> <div>{getWifiStrength(cafeData?.wifiStrength)}</div>
      </div>
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <p>Free wifi</p>
        {cafeData?.freeWifi ? <MdAttachMoney /> : <MdMoneyOffCsred />}
      </div>
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <IoIosOutlet />
        {getAmountOfOutlets(cafeData?.outlets)}
      </div>
      <div className="flex items-center gap-2 text-lg font-bold p-1 flex-col">
        <PiChairFill />
        {getSeats(cafeData?.seating)}
      </div>
    </section>
  );
}

function getWifiStrength(strength: number | undefined) {
  if (!strength || strength === 3) {
    return <BsWifi />;
  } else if (strength === 2) {
    return <BsWifi2 />;
  }
  return <BsWifi1 />;
}

function getAmountOfOutlets(outlets: number | undefined) {
  if (!outlets || outlets === 3) {
    return <p>A LOT</p>;
  } else if (outlets === 2) {
    return <p>SOME</p>;
  }
  return <p>FEW</p>;
}

function getSeats(seating: number | undefined) {
  if (!seating || seating === 3) {
    return <p>A LOT</p>;
  } else if (seating === 2) {
    return <p>SOME</p>;
  }
  return <p>FEW</p>;
}
