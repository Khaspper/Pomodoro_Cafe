import type { TCommentProps } from "../../../types/types";

export function Comment({ username, comment, createdAt }: TCommentProps) {
  const time = createdAt.toLocaleTimeString();
  const date = createdAt.toDateString();
  //TODO: I need to make the avatar!!!
  //TODO: I need to format the date and time
  // Maybe get rid of the day of the week in date (mon, tues, wed... etc)
  // Also def get rid of the seconds in the time
  console.log("date, time");
  console.log(date, time);
  return (
    <div className="border-2 text-white">
      <h1>{username}</h1>
      <h1>
        {date}, {time}
      </h1>
      <h1>{comment}</h1>
    </div>
  );
}
