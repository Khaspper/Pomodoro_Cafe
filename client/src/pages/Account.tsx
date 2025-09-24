import { useEffect, useState } from "react";
import { updateUser } from "../services/Account";
import type { TNewErrors, TReceivedErrors } from "../types/types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function Account({ lightMode }: { lightMode: boolean }) {
  const [loading, setLoading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<TNewErrors>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      try {
        if (import.meta.env.DEV === true) {
          console.log("Account: Fetching User info...");
        }
        const response = await fetch(`${BACKEND_URL}/account`, {
          credentials: "include",
        });
        if (import.meta.env.DEV === true) {
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
      if (!response.ok) {
        const errors = (await response.json()).errors;
        console.log("errors");
        console.log(errors);
        const newErrors: TNewErrors = {};
        errors.forEach((error: TReceivedErrors) => {
          const path = error.path;
          const msg = error.msg;
          newErrors[path] = msg;
        });
        setErrors(newErrors);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setErrors({});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`h-full flex justify-center items-center ${
        lightMode ? "bg-light-background-color" : "bg-dark-background-color"
      } transition-colors`}
    >
      <form
        onSubmit={handleSubmit}
        className={`text-[#E7DFCE] text-xl font-bold w-fit p-6 ${
          lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
        }`}
        style={{
          boxShadow: `3px 3px 2px ${
            lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
          }`,
        }}
      >
        <h1
          className={`text-2xl font-bold ${
            lightMode ? "text-[#93a66e]" : "text-[#e74c1d]"
          }`}
        >
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
          <p className="text-[#b54126]">
            {errors.username ? errors.username : ""}
          </p>
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <label htmlFor="email">Change Email</label>
          <input
            className="outline-none border-3 rounded-lg border-[#1a1a1a] px-2 py-2"
            type="email"
            name="email"
            id="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
          <p className="text-[#b54126]">{errors.email ? errors.email : ""}</p>
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
          <p className="text-[#b54126]">
            {errors.password ? errors.password : ""}
          </p>
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
          <p className="text-[#b54126]">
            {errors.confirmPassword ? errors.confirmPassword : ""}
          </p>
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className={`mt-6 p-3 font-bold rounded-lg cursor-pointer hover:scale-105 transform transition-transform duration-150 ${
              lightMode ? "bg-[#93a66e]" : "bg-[#e74c1d]"
            }`}
          >
            {loading ? "Changing..." : "Change Information"}
          </button>
        </div>
        <p className={`${success ? "block" : "hidden"} mt-5 text-center`}>
          Account updated!
        </p>
      </form>
    </div>
  );
}
