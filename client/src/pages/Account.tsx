import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className="bg-[#1a1a1a] min-h-screen min-w-screen flex justify-center">
      <form className="bg-[#043253] text-[#fbe3ad] w-fit p-6">
        <h1 className="text-2xl text-[#d02329] font-bold">
          Change Personal Information
        </h1>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="firstName">Change First Name</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="text"
            name="firstName"
            id="firstName"
          />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="lastName">Change Last Name</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="text"
            name="lastName"
            id="lastName"
          />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="password">Change Password</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="pfp">Change Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            name="pfp"
            id="pfp"
            className="file:bg-[#1a1a1a] file:p-3 file:mr-4 border-2 rounded-xl border-[#1a1a1a]"
          />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="track">Change Spotify Showcase Track</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="text"
            name="track"
            id="track"
          />
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="mt-6 p-3 bg-[#fbe3ad] text-[#1a1a1a] font-bold rounded-lg cursor-pointer"
          >
            Change Information
          </button>
          <button type="button" className="mt-6 text-[#d02329] font-bold">
            <Link to={"/"}>Go Home</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
