import type { TCommentProps } from "../../../types/types";

export function Comment({ username, comment, createdAt }: TCommentProps) {
  const time = createdAt.toLocaleTimeString();
  const date = createdAt.toDateString();
  //TODO: I need to make the avatar!!!
  //TODO: I need to format the date and time
  // Maybe get rid of the day of the week in date (mon, tues, wed... etc)
  // Also def get rid of the seconds in the time
  return (
    <section className="flex gap-2">
      <UserIcon username={username} />
      <div className="text-[#fae3ad] max-w-[300px]">
        <h1 className="font-extrabold">
          {username}{" "}
          <span className="text-xs font-medium text-[#b54228]">
            {date}, {time}
          </span>
        </h1>
        <p className="p-3 rounded-b-2xl rounded-tr-2xl bg-[#0a3353] text-lg">
          {comment}
        </p>
      </div>
    </section>
  );
}

function UserIcon({ username }: { username: string }) {
  const randomColor =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  return (
    <div
      style={{ backgroundColor: randomColor }}
      className="rounded-full w-9 h-9 flex items-center justify-center shrink-0"
    >
      <p className="font-extrabold text-lg text-white">
        {username[0].toUpperCase()}
      </p>
    </div>
  );
}
