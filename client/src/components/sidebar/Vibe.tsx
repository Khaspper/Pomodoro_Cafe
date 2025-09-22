import type { TCafe } from "../../types/types";
import { addSong } from "../../services/Sidebar";
import { useState } from "react";
import type { TNewErrors } from "../../types/types";

type TApiError = { path: keyof TNewErrors; msg: string };

export default function Vibe({
  lightMode,
  selectedCafe,
  setCafeUpdated,
}: {
  lightMode: boolean;
  selectedCafe: TCafe;
  setCafeUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const embedSrc = selectedCafe.spotifyLink
    ? toSpotifyEmbed(selectedCafe.spotifyLink)
    : null;
  const [spotifyLink, setSpotifyLink] = useState("");
  const [errors, setErrors] = useState<TNewErrors>({});
  const [editMode, setEditMode] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await addSong(spotifyLink.trim(), selectedCafe.id);
      if (!response.ok) {
        const newErrors: TNewErrors = {};
        if (response.statusText === "Unauthorized") {
          newErrors["spotifyLink"] = "You need to have an account.";
          setErrors(newErrors);
        } else {
          const error: TApiError = (await response.json()).errors[0];
          newErrors[error.path] = error.msg;
          setErrors(newErrors);
        }
        throw new Error("Song Input Failed");
      } else {
        setErrors({});
        setCafeUpdated(true);
        setEditMode(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section
      className={`p-2 px-3 mt-6 mb-2 grow light-text-color ${
        lightMode ? "bg-light-primary-color" : "bg-dark-primary-color"
      }`}
      style={{
        boxShadow: `3px 3px 2px ${
          lightMode ? "rgb(0 0 0 / 0.25)" : "rgb(255 255 255 / 0.25)"
        }`,
      }}
    >
      <div className="container relative">
        <h1 className="text-center text-2xl mb-3 font-extrabold">Vibe</h1>{" "}
        {embedSrc && !editMode ? (
          <button
            type="button"
            onClick={() => {
              setSpotifyLink(selectedCafe.spotifyLink ?? "");
              setEditMode(true);
            }}
            className={`text-[12px] w-[14px] h-[14px] font-extrabold rounded-full text-[#fae3ad] cursor-pointer hover:scale-105 transition-transform flex justify-center items-center ${
              lightMode ? "bg-light-accent-color" : "bg-dark-accent-color"
            } absolute top-0 right-0`}
          >
            +
          </button>
        ) : (
          <div className="absolute top-0 right-0 flex gap-2">
            <button
              form="songForm"
              type="submit"
              className={`text-[12px] w-[14px] h-[14px] font-extrabold rounded-full text-[#fae3ad] cursor-pointer hover:scale-105 transition-transform flex justify-center items-center ${
                lightMode ? "bg-light-accent-color" : "bg-dark-accent-color"
              }`}
            >
              +
            </button>
            {embedSrc && (
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setEditMode(false);
                }}
                className={`text-[12px] w-[14px] h-[14px] font-extrabold rounded-full text-[#fae3ad] cursor-pointer hover:scale-105 transition-transform flex justify-center items-center ${
                  lightMode ? "bg-light-accent-color" : "bg-dark-accent-color"
                }`}
              >
                x
              </button>
            )}
          </div>
        )}
      </div>

      {embedSrc && !editMode ? (
        <div className="text-center space-y-3">
          <iframe
            style={{ borderRadius: 10 }}
            src={embedSrc}
            width="100%"
            height="100"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      ) : (
        <form
          id="songForm"
          method="POST"
          onSubmit={handleSubmit}
          className="text-lg flex flex-col gap-2"
        >
          <div className="flex gap-2 flex-col">
            <input
              type="url"
              inputMode="url"
              value={spotifyLink}
              onChange={(e) => setSpotifyLink(e.target.value)}
              className={`border-2 container rounded-lg py-1 px-2 outline-none ${
                lightMode ? "border-[#93a66e]" : "border-[#e74c1d]"
              }`}
              placeholder="https://open.spotify.com/track/..."
              required
            />
          </div>

          <p className="text-[#df9f3f]">{errors.spotifyLink ?? ""}</p>
        </form>
      )}
    </section>
  );
}

function toSpotifyEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname !== "open.spotify.com") return null;
    u.pathname = u.pathname.replace(
      /^\/(track|album|playlist|artist)\//,
      "/embed/$1/"
    );
    return u.toString();
  } catch {
    return null;
  }
}
