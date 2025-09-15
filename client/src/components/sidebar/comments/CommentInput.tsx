import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { sendComment } from "../../../services/Cafe";

export default function CommentInput({ cafeID }: { cafeID: number }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      // Step 1 post comment to DB
      const response = await sendComment(comment, cafeID);
      console.log("CommentInput: response");
      console.log(response);
      // if (!errors.ok) {
      // Step 2 throw errors
      // throw new Error(`Failed to post comment`, errors);
      // } else {
      // Idk if I need the bottom
      // setCommentError("");
      // }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
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
  );
}
