import { useState } from "react";
import WifiStrength from "../components/reviewCafe/WifiStrength";
import Outlets from "../components/reviewCafe/Outlets";
import Seating from "../components/reviewCafe/Seating";
import FreeWifi from "../components/reviewCafe/FreeWifi";
import { sendReview } from "../services/ReviewCafe";
import type { TNewErrors, TReceivedErrors } from "../types/types";

export default function ReviewCafe({
  lightMode,
  cafeID,
  setReviewAdded,
}: {
  lightMode: boolean;
  cafeID: number;
  setReviewAdded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Form inputs
  const [wifiStrength, setWifiStrength] = useState(3);
  const [outletAmounts, setOutletAmounts] = useState(3);
  const [seating, setSeating] = useState(3);
  const [freeWifi, setFreeWifi] = useState(1);
  // Form inputs

  const [errors, setErrors] = useState<TNewErrors>({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await sendReview(
        String(cafeID),
        wifiStrength,
        outletAmounts,
        seating,
        freeWifi
      );
      setReviewAdded(true);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      if (!response.ok) {
        const reviewErrors = (await response.json()).errors;
        const newErrors: TNewErrors = {};
        console.log("reviewErrors");
        console.log(reviewErrors);
        reviewErrors.forEach((error: TReceivedErrors) => {
          const path = error.path;
          const msg = error.msg;
          newErrors[path] = msg;
        });
        setErrors(newErrors);
        throw new Error(`Login failed`, reviewErrors);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={`flex flex-col mt-5 gap-5 container transition-colors ${
        lightMode ? "bg-light-background-color" : "bg-dark-background-color"
      }`}
      onSubmit={handleSubmit}
    >
      <h1
        className={`text-4xl text-center font-bold light-text-color py-3 ${
          lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
        }`}
        style={{
          boxShadow: `3px 3px 2px ${
            lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
          }`,
        }}
      >
        Review Cafe
      </h1>

      <div className="flex flex-col gap-5 mt-3">
        <Outlets
          lightMode={lightMode}
          setOutletAmounts={setOutletAmounts}
          outletAmounts={outletAmounts}
        />
        <Seating
          lightMode={lightMode}
          setSeating={setSeating}
          seating={seating}
        />
        <WifiStrength lightMode={lightMode} setWifiStrength={setWifiStrength} />
        <FreeWifi
          lightMode={lightMode}
          setFreeWifi={setFreeWifi}
          freeWifi={freeWifi}
        />
      </div>

      <div className="flex justify-between">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfzlGs7YKGTL3ioCKYLOsX9yDZu-diytfiTR2tJ0COnN3yHvA/viewform"
          target="blank"
          className={`text-lg font-extrabold light-text-color p-4 hover:scale-105 transform transition-transform duration-150 ${
            lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
          }`}
          style={{
            boxShadow: `3px 3px 2px ${
              lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
            }`,
          }}
        >
          Review website!
        </a>
        <button
          className={`cursor-pointer font-bold py-2 md:text-xl w-[40%] md:w-[35%] light-text-color transition-all duration-75 active:translate-x-[3px] active:translate-y-[3px] ${
            lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
          }`}
          style={{
            boxShadow: `3px 3px 2px ${
              lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
            }`,
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = `3px 3px 2px ${
              lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
            }`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `3px 3px 2px ${
              lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
            }`;
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting" : "Submit"}
        </button>
      </div>
      <p
        className={`text-2xl text-center ${
          success ? "block" : "hidden"
        } text-[#afc69f]`}
      >
        Review posted
      </p>
      <p className={`text-[#b6442a] ${errors.freeWifi ? "block" : "hidden"}`}>
        {errors.freeWifi}
      </p>
      <p className={`text-[#b6442a] ${errors.seating ? "block" : "hidden"}`}>
        {errors.seating}
      </p>
      <p className={`text-[#b6442a] ${errors.outlets ? "block" : "hidden"}`}>
        {errors.outlets}
      </p>
      <p
        className={`text-[#b6442a] ${errors.wifiStrength ? "block" : "hidden"}`}
      >
        {errors.wifiStrength}
      </p>
    </form>
  );
}
