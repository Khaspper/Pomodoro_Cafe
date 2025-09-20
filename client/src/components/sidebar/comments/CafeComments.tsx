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
  const [checking, setChecking] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 500);
    const abortController = new AbortController();

    async function getComments() {
      try {
        if (import.meta.env.DEV === true) {
          console.log(
            `Cafe Comments: Fetching Cafe(${selectedCafe.id}) Comments...`
          );
        }
        const response = await fetch(
          `${BACKEND_URL}/cafe/${selectedCafe.id}/comments`,
          { signal: abortController.signal }
        );
        if (import.meta.env.DEV === true) {
          console.log(`Cafe Comments: response status: ${response.status}`);
        }
        const newComments = (await response.json()).comments;
        setComments(newComments);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Cafe Comments: Fetch aborted");
        } else {
          console.error("Cafe Comments: Fetch error:", error);
        }
      }
    }
    getComments();
    setSubmit(false);
    setChecking(false);
    clearTimeout(timer);
    return () => {
      abortController.abort();
      clearTimeout(timer);
    };
  }, [selectedCafe.id, submit]);

  if (checking && showLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1c1917] text-center">
        <div className="">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#b6432a] border-t-transparent mx-auto mb-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🍅</span>
            </div>
          </div>
          <h1 className="text-2xl text-[#fae3ad] font-semibold">
            Grabbing the comments...
          </h1>
          <p className="text-[#fae3ad] mt-2">
            Please wait while we grab the comments
          </p>
        </div>
      </div>
    );
  }

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
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                username={comment.username}
                comment={comment.message}
                createdAt={new Date(comment.createdAt)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
