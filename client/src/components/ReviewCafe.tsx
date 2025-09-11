import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ReviewCafe() {
  const [freeWifi, setFreeWifi] = useState(true);
  const cafeID = useParams();
  console.log("cafeID");
  console.log(cafeID);

  // Form states
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Add a loading and error check and when user submits make button not clickable

  function handleClick() {
    navigate(-1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
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
      navigate(-1);
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
          <fieldset className="flex flex-col gap-2">
            <label className="font-bold md:text-xl" htmlFor="wifiStrength">
              How's the Wifi?
            </label>
            <select
              name="wifiStrength"
              id="wifiStrength"
              className="border-2 py-2 px-1 rounded-lg outline-none "
            >
              <option value="3">Great</option>
              <option value="2">Good</option>
              <option value="1">Bad</option>
            </select>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label className="font-bold md:text-xl" htmlFor="outlets">
              How many outlets?
            </label>
            <select
              name="outlets"
              id="outlets"
              className="border-2 py-2 px-1 rounded-lg outline-none "
            >
              <option value="3">A lot</option>
              <option value="2">Enough</option>
              <option value="1">Few</option>
            </select>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label className="font-bold md:text-xl" htmlFor="seating">
              How is the seating?
            </label>
            <select
              name="seating"
              id="seating"
              className="border-2 py-2 px-1 rounded-lg outline-none "
            >
              <option value="3">A lot</option>
              <option value="2">Enough</option>
              <option value="1">Few</option>
            </select>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="font-bold md:text-xl">Is the wifi free?</legend>
            <div className="flex gap-3 mt-2">
              <label
                className={`${
                  freeWifi ? "border-2" : ""
                } w-fit inline py-1 px-3 rounded-2xl`}
              >
                <input
                  type="radio"
                  name="freeWifi"
                  value="true"
                  hidden
                  onClick={() => {
                    setFreeWifi((pv) => !pv);
                  }}
                />
                Yes
              </label>
              <label
                className={`${
                  !freeWifi ? "border-2" : ""
                } w-fit inline py-1 px-3 rounded-2xl`}
              >
                <input
                  type="radio"
                  name="freeWifi"
                  value="false"
                  hidden
                  onClick={() => {
                    setFreeWifi((pv) => !pv);
                  }}
                />
                No
              </label>
            </div>
          </fieldset>

          <div className="flex justify-between">
            <button
              className="cursor-pointer font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-[40%] md:w-[35%] text-[#1a1a1a]"
              type="submit"
              onClick={handleClick}
            >
              Go Home
            </button>
            <button
              className="cursor-pointer font-bold bg-[#b1372c] py-2 rounded-2xl md:text-xl w-[40%] md:w-[35%] text-[#1a1a1a]"
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
