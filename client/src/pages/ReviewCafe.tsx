import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WifiStrength from "../components/reviewCafe/WifiStrength";
import Outlets from "../components/reviewCafe/Outlets";
import Seating from "../components/reviewCafe/Seating";
import FreeWifi from "../components/reviewCafe/FreeWifi";
import { sendReview } from "../services/ReviewCafe";
import type { TNewErrors, TReceivedErrors } from "../types/types";

export default function ReviewCafe({
  cafeID,
  setReviewAdded,
}: {
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
  // const cafeID = useParams();
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

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

      //TODO:
      //! This part should do the validation
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
    <div className="flex justify-center items-center mt-26">
      <div className="bg-[#03304f] p-5 text-[#fae3ad] rounded-2xl w-[300px] md:w-[400px] mt-[-100px]">
        <form className="flex flex-col gap-2 md:gap-4" onSubmit={handleSubmit}>
          <h1 className="text-4xl md:text-5xl text-center font-bold text-[#b1372c]">
            Review Cafe
          </h1>

          <WifiStrength setWifiStrength={setWifiStrength} />
          <Outlets
            setOutletAmounts={setOutletAmounts}
            outletAmounts={outletAmounts}
          />
          <Seating setSeating={setSeating} seating={seating} />
          <FreeWifi setFreeWifi={setFreeWifi} freeWifi={freeWifi} />

          <div className="flex justify-between">
            <button
              className="cursor-pointer hover:scale-105 transform transition-transform duration-150 font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-[40%] md:w-[35%] text-[#1a1a1a]"
              type="submit"
              onClick={handleClick}
            >
              Go Home
            </button>
            <button
              className="cursor-pointer hover:scale-105 transform transition-transform duration-150 font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-fit md:w-[35%] text-[#1a1a1a]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          <p className="text-2xl text-center">
            {success ? "Review posted" : ""}
          </p>
          {/* Errors */}
          <p className="text-[#df9f3f]">
            {errors.freeWifi ? errors.freeWifi : ""}
          </p>
          <p className="text-[#df9f3f]">
            {errors.seating ? errors.seating : ""}
          </p>
          <p className="text-[#df9f3f]">
            {errors.outlets ? errors.outlets : ""}
          </p>
          <p className="text-[#df9f3f]">
            {errors.wifiStrength ? errors.wifiStrength : ""}
          </p>
        </form>
      </div>
    </div>
  );
}
