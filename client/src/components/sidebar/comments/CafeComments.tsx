import { useEffect, useState } from "react";
import type { TCafe, TComment } from "../../../types/types";
import { Comment } from "./Comment";
import CommentInput from "./CommentInput";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function CafeComments({
  selectedCafe,
}: {
  selectedCafe: TCafe;
}) {
  const [comments, setComments] = useState<TComment[]>([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    async function getComments() {
      const response = await fetch(
        `${BACKEND_URL}/cafe/${selectedCafe.id}/comments`
      );
      const newComments = (await response.json()).comments;
      setComments(newComments);
    }
    getComments();
    setSubmit(false);
  }, [selectedCafe.id, submit]);
  return (
    // And delete the background
    <>
      <h1 className="text-center font-extrabold text-2xl bg-[#4c6850] p-2 mt-2 rounded-t-2xl">
        Comments
      </h1>
      <div className="flex flex-col gap-4">
        <CommentInput cafeID={selectedCafe.id} setSubmit={setSubmit} />
        {/* Then we use the state variable to loop through
        them and load them and pass data to the Comment component */}
        <div className="flex gap-2 flex-col p-2">
          {comments.length !== 0 ? (
            comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  username={comment.username}
                  comment={comment.message}
                  createdAt={new Date(comment.createdAt)}
                />
              );
            })
          ) : (
            <p>Be the first one to comment!</p>
          )}
        </div>
      </div>
    </>
  );
}
