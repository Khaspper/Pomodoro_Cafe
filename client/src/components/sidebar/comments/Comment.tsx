import type { TCommentProps } from "../../../types/types";

const COLOR_CLASSES = ["#fccaca", "#ded5ff", "#fdf186", "#fdf186"];
const ROTATE_CLASSES = [
  "-rotate-1",
  "-rotate-2",
  "-rotate-3",
  "-rotate-4",
  "-rotate-5",
  "-rotate-6",
  "-rotate-7",
  "-rotate-8",
  "rotate-0",
  "rotate-1",
  "rotate-2",
  "rotate-3",
  "rotate-4",
  "rotate-5",
  "rotate-6",
  "rotate-7",
  "rotate-8",
];

export function Comment({ lightMode, username, comment }: TCommentProps) {
  const colorClass =
    COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)];
  const rotateClass =
    ROTATE_CLASSES[Math.floor(Math.random() * ROTATE_CLASSES.length)];

  return (
    <div
      className={`flex relative justify-center ${rotateClass} isolate`}
      style={{ backgroundColor: colorClass }}
    >
      <section className="flex gap-3 text-black w-[170px] h-[170px] shrink-0 flex-col p-3 relative z-10">
        <p className="font-extrabold text-[13px]">
          {username[0].toUpperCase()}
          {username.slice(1)}
        </p>
        <p className="text-[14px] font-bold h-full break-words">{comment}</p>
      </section>
      <div
        style={{
          boxShadow: `0px 4px 4px ${
            lightMode ? "rgb(0 0 0 / 0.5)" : "rgb(255 255 255 / 0.5)"
          }`,
        }}
        className="w-[140px] h-[3px] absolute bottom-0 -z-10 pointer-events-none"
      ></div>
    </div>
  );
}
// Errmmmm I don't know why the z-index for the second box isn't working... so I just
// just made it 3 pixels tall and then I lowered the opacity for the shadows...
// now it looks how I want it to... why 3px? Idek, 1 & 2 didn't show the shadow that well
// and 4 and up... well look at it
