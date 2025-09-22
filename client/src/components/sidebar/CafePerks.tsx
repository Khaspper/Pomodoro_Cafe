import type { TCafeData } from "../../types/types";

// Icons
import { IoIosOutlet } from "react-icons/io";
import { BsOutlet } from "react-icons/bs";
import { MdChair } from "react-icons/md";
import { MdOutlineChair } from "react-icons/md";
import { GrWifiLow, GrWifiMedium, GrWifi } from "react-icons/gr";

import { MdAttachMoney, MdMoneyOffCsred } from "react-icons/md";

export default function CafePerks({
  lightMode,
  cafeData,
}: {
  lightMode: boolean;
  cafeData: TCafeData | null;
}) {
  return (
    <div className="flex text-[14px] mt-6 gap-4">
      <section
        className={`p-2 grow flex justify-around flex-col light-text-color ${
          lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
        } grow`}
        style={{
          boxShadow: `3px 3px 2px ${
            lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
          }`,
        }}
      >
        <div className="flex items-center gap-2 font-bold p-1 justify-between">
          <p>Wifi</p>{" "}
          <div className="flex gap-2 text-[16px]">
            {getWifiStrength(cafeData?.wifiCount)}{" "}
            {cafeData?.freeWifi ? <MdMoneyOffCsred /> : <MdAttachMoney />}
          </div>
        </div>
        <div className="flex items-center gap-2 font-bold p-1 justify-between">
          <h1>Outlets</h1>
          <div className="flex text-[16px]">
            {getAmountOfOutlets(cafeData?.outletCount)}
          </div>
        </div>
        <div className="flex items-center gap-2 font-bold p-1 justify-between">
          <h1>Seating</h1>
          <div className="flex text-[16px]">
            {getSeats(cafeData?.seatingCount)}
          </div>
        </div>
      </section>
      {/* Legend */}
      {/* Idk why I have to put grow-3 to make it even... I know it's cuz of the icons but idk how to fix this other than doing this */}
      <section
        className={`p-2 grow flex justify-around flex-col light-text-color ${
          lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
        } grow-3`}
        style={{
          boxShadow: `3px 3px 2px ${
            lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
          }`,
        }}
      >
        <div className="flex items-center gap-2 font-bold p-1">
          <GrWifi className="text-[16px]" />
          <p> = Strong Wifi</p>
        </div>
        <div className="flex items-center gap-2 font-bold p-1">
          <MdMoneyOffCsred className="text-[16px]" />
          <p> = Free Wifi</p>
        </div>
        <div className="flex items-center gap-2 font-bold p-1">
          <IoIosOutlet className="text-[16px]" />
          <p> = 1~3 Outlets </p>
        </div>
        <div className="flex items-center gap-2 font-bold p-1">
          <MdChair className="text-[16px]" />
          <p> = 6~7 Chairs </p>
        </div>
      </section>
    </div>
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

  const filled = Array.from({ length: outlets }, (_, i) => (
    <IoIosOutlet key={`filled-${i}`} />
  ));

  const empty = Array.from({ length: 5 - outlets }, (_, i) => (
    <BsOutlet key={`empty-${i}`} />
  ));

  return (
    <>
      {filled}
      {empty}
    </>
  );
}

function getSeats(seating: number | undefined) {
  if (!seating) seating = 5;

  const filled = Array.from({ length: seating }, (_, i) => (
    <MdChair key={`filled-${i}`} />
  ));

  const empty = Array.from({ length: 5 - seating }, (_, i) => (
    <MdOutlineChair key={`empty-${i}`} />
  ));

  return (
    <>
      {filled}
      {empty}
    </>
  );
}
