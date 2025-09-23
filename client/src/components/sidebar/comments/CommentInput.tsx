import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { sendComment } from "../../../services/Cafe";
import type { TNewErrors } from "../../../types/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CommentInput({
  cafeID,
  setSubmit,
  lightMode,
}: {
  lightMode: boolean;
  cafeID: number;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<TNewErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      // Step 1 post comment to DB
      const response = await sendComment(comment, cafeID);
      if (!response.ok) {
        const newErrors: TNewErrors = {};
        if (response.statusText === "Unauthorized") {
          newErrors["comment"] = "You need to have an account to post.";
          setErrors(newErrors);
        } else {
          const errors = (await response.json()).errors[0];
          newErrors["comment"] = errors.msg;
          setErrors(newErrors);
        }
      } else {
        setComment("");
        setErrors({});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmit(true);
      setLoading(false);
    }
  }

  return (
    <>
      <form
        action="POST"
        onSubmit={handleSubmit}
        className={`flex ${
          lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
        } py-1`}
        style={{
          boxShadow: `0px 3px 2px ${
            lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
          }`,
        }}
      >
        <input
          type="text"
          required
          placeholder="Post a comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="grow outline-none px-4 text-[#fae3ad] text-lg font-bold"
        />
        <button type="submit">
          {loading ? (
            <AiOutlineLoading3Quarters className="text-xl m-2 mr-3 light-text-color animate-spin" />
          ) : (
            <IoSend className="rotate-270 text-xl m-2 mr-3 light-text-color" />
          )}
        </button>
      </form>
      <p className={`text-lg font-extrabold text-center text-[#e74c1d]`}>
        {errors ? errors.comment : ""}
      </p>
    </>
  );
}
