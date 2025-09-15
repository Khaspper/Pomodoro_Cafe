import type { TCafe } from "../../../types/types";
import { Comment } from "./Comment";
import CommentInput from "./CommentInput";

export default function CafeComments({
  selectedCafe,
}: {
  selectedCafe: TCafe;
}) {
  // We need a fetch function that gets the comments from
  // the db and saves them in a state variable
  const mockComments = [
    {
      id: 1,
      username: "Alice",
      comment: "Love this café! The vibes are perfect for studying.",
      createdAt: new Date("2025-09-12T14:30:00"),
    },
    {
      id: 2,
      username: "Brian",
      comment: "Wi-Fi could be better, but the coffee is amazing.",
      createdAt: new Date("2025-09-12T16:45:00"),
    },
    {
      id: 3,
      username: "Charlie",
      comment:
        "Nice place to hang out with friends. Seating is limited though.",
      createdAt: new Date("2025-09-13T09:15:00"),
    },
  ];

  console.log("CafeComments.tsx: selectedCafe");
  console.log(selectedCafe);
  return (
    // And delete the background
    <>
      <h1 className="text-center font-extrabold text-2xl bg-[#4c6850] p-2 mt-2 rounded-t-2xl">
        Comments
      </h1>
      <div className="flex flex-col gap-4">
        <CommentInput />
        {/* Then we use the state variable to loop through
        them and load them and pass data to the Comment component */}
        <div className="flex gap-2 flex-col p-2">
          {mockComments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                username={comment.username}
                comment={comment.comment}
                createdAt={comment.createdAt}
              />
            );
          })}
          {/* <Comment user={"Khaspper"} comment={"Comment 1"} />
          <Comment comment={"Comment 2"} />
          <Comment comment={"Comment 3"} />
          <Comment comment={"Comment 4"} />
          <Comment comment={"Comment 5"} /> */}
        </div>
      </div>
    </>
  );
}
