import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { sendComment } from "../../../services/Cafe";
import type { TNewErrors } from "../../../types/types";

export default function CommentInput({ cafeID }: { cafeID: number }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<TNewErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      // Step 1 post comment to DB
      const response = await sendComment(comment, cafeID);
      console.log("response");
      console.log(response);
      if (!response.ok) {
        const newErrors: TNewErrors = {};
        const errors = (await response.json()).errors[0];
        newErrors["comment"] = errors.msg;
        setErrors(newErrors);
      } else {
        setErrors({});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        action="POST"
        onSubmit={handleSubmit}
        className="text-white flex rounded-b-2xl border-b-2 border-l-2 border-r-2 border-[#4c6850]"
      >
        <input
          type="text"
          required
          placeholder="Post a comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="grow outline-none px-4 text-[#fae3ad] text-lg"
        />
        <button type="submit">
          {loading ? (
            "Posting"
          ) : (
            <IoSend className="rotate-270 text-xl m-2 mr-3 text-[#fae3ad]" />
          )}
        </button>
      </form>
      <p>{errors ? errors.comment : ""}</p>
    </>
  );
}
