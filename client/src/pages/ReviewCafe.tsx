import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WifiStrength from "../components/reviewCafe/WifiStrength";
import Outlets from "../components/reviewCafe/Outlets";
import Seating from "../components/reviewCafe/Seating";
import FreeWifi from "../components/reviewCafe/FreeWifi";
import { sendReview } from "../services/ReviewCafe";

export default function ReviewCafe() {
  // Form inputs
  const [wifiStrength, setWifiStrength] = useState(3);
  const [outletAmounts, setOutletAmounts] = useState(3);
  const [seating, setSeating] = useState(3);
  const [freeWifi, setFreeWifi] = useState(true);
  // Form inputs

  const [loading, setLoading] = useState(false);
  const cafeID = useParams();
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await sendReview(
        String(cafeID.id),
        wifiStrength,
        outletAmounts,
        seating,
        freeWifi
      );
      console.log("ReviewCafe: handleSubmit: response");
      console.log(response);
      // const errors = await signupUser(
      //   username,
      //   email,
      //   password,
      //   confirmPassword
      // );
      // if (errors && errors.length !== 0) {
      //   const newErrors: TNewErrors = {};
      //   errors.forEach((error: TReceivedErrors) => {
      //     const path = error.path;
      //     const msg = error.msg;
      //     newErrors[path] = msg;
      //   });
      //   setErrors(newErrors);
      //   throw new Error(`Login failed`, errors);
      // }
      // navigate(-1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex justify-center items-center">
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
              className="cursor-pointer hover:scale-105 transform transition-transform duration-150 font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-[40%] md:w-[35%] text-[#1a1a1a]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
