import type { TCafe } from "../../types/types";
import { addSong } from "../../services/Sidebar";
import { useState } from "react";
import type { TNewErrors } from "../../types/types";

type TApiError = { path: keyof TNewErrors; msg: string };

export default function Vibe({
  selectedCafe,
  setCafeUpdated,
}: {
  selectedCafe: TCafe;
  setCafeUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const embedSrc = selectedCafe.spotifyLink
    ? toSpotifyEmbed(selectedCafe.spotifyLink)
    : null;

  const [loading, setLoading] = useState(false);
  const [spotifyLink, setSpotifyLink] = useState("");
  const [errors, setErrors] = useState<TNewErrors>({});
  const [editMode, setEditMode] = useState(false); // <- NEW

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await addSong(spotifyLink.trim(), selectedCafe.id);

      if (!response.ok) {
        const error: TApiError = (await response.json()).errors[0];
        const newErrors: TNewErrors = {};
        newErrors[error.path] = error.msg;
        setErrors(newErrors);
        throw new Error("Song Input Failed");
      } else {
        setErrors({});
        setCafeUpdated(true); // upstream refetch
        setEditMode(false); // close form
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="text-[#fbe3ad] bg-[#043253] p-4 rounded-lg mt-2 mb-2 grow">
      <h1 className="text-center text-2xl mb-2 font-extrabold">Vibe</h1>

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
          <button
            type="button"
            onClick={() => {
              setSpotifyLink(selectedCafe.spotifyLink ?? "");
              setEditMode(true);
            }}
            className="text-2xl border-2 px-4 py-2 rounded-2xl text-[#fae3ad] cursor-pointer hover:scale-105 transition-transform"
          >
            Change vibes
          </button>
        </div>
      ) : (
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="text-lg flex flex-col gap-2"
        >
          <p className="text-center">
            {embedSrc ? "Update the song" : "No Song yet! Enter one here!"}
          </p>

          <div className="flex gap-2 flex-col">
            <input
              type="url"
              inputMode="url"
              value={spotifyLink}
              onChange={(e) => setSpotifyLink(e.target.value)}
              className="border-2 container rounded-lg py-1 px-2 outline-none"
              placeholder="https://open.spotify.com/track/..."
              required
            />
            <div className="flex justify-around mt-2">
              <button
                type="submit"
                disabled={loading}
                className="border-2 py-2 px-3 rounded-4xl cursor-pointer hover:scale-105 transition-transform"
              >
                {loading ? "Sending…" : "Save"}
              </button>
              {embedSrc && (
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    setEditMode(false);
                  }}
                  className="border-2 py-2 px-3 rounded-4xl cursor-pointer hover:scale-105 transition-transform"
                >
                  Cancel
                </button>
              )}
            </div>
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
