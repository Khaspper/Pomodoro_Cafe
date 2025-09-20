import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateUser } from "../services/Account";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function getUserInfo() {
      try {
        if (import.meta.env.DEV) {
          console.log("Account: Fetching User info...");
        }
        const response = await fetch(`${BACKEND_URL}/account`, {
          credentials: "include",
        });
        if (import.meta.env.DEV) {
          console.log(`Account: Response status: ${response.status}`);
        }
        if (!response.ok) {
          throw new Error("Couldn't get user");
        }
        const userData = await response.json();
        setNewUsername(userData.username);
        setNewEmail(userData.email);
      } catch (error) {
        console.error("Something went wrong getting the account:", error);
      }
    }
    getUserInfo();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await updateUser(
        newUsername,
        newEmail,
        newPassword,
        confirmPassword
      );
      // TODO: Remove console.log statements - use proper logging
      console.log("Account: response");
      console.log(response);
      // TODO: Implement proper error handling and user feedback
      // TODO: Add success/error messages for account updates
      // const errors = await loginUser(email, password);
      // if (!errors.ok) {
      //   setLoginError("Email or Password is incorrect.");
      //   throw new Error(`Login failed`, errors);
      // } else {
      //   setLoginError("");
      // }
      // navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#1a1a1a] h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#043253] text-[#fbe3ad] w-fit p-6 rounded-2xl"
      >
        <h1 className="text-2xl text-[#d02329] font-bold">
          Change Personal Information
        </h1>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="username">Change Username</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="text"
            name="username"
            id="username"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="email">Change Email</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="text"
            name="email"
            id="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="password">Change Password</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="password"
            name="password"
            id="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="mt-6 p-3 bg-[#fbe3ad] text-[#1a1a1a] font-bold rounded-lg cursor-pointer hover:scale-105 transform transition-transform duration-150"
          >
            {loading ? "Changing..." : "Change Information"}
          </button>
          <button type="button" className="mt-6 text-[#d02329] font-bold">
            <Link to={"/"}>Go Home</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
