import type { TCafe } from "../../types/types";
import { addSong } from "../../services/Sidebar";
import { useState } from "react";
import type { TNewErrors } from "../../types/types";

type TApiError = {
  path: keyof TNewErrors;
  msg: string;
};

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await addSong(spotifyLink, selectedCafe.id);

      //TODO: THIS CHANGES RETURNS ONE THING CHANGE IT
      if (!response.ok) {
        const error: TApiError = (await response.json()).errors[0];
        const newErrors: TNewErrors = {};
        newErrors[error.path] = error.msg;
        setErrors(newErrors);
        throw new Error(`Song Input Failed`);
      } else {
        setErrors({});
        setCafeUpdated(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="text-[#fbe3ad] bg-[#043253] p-4 rounded-lg mt-2 mb-2 grow">
      <h1 className="text-center text-xl mb-2">Vibe</h1>

      {embedSrc ? (
        <iframe
          style={{ borderRadius: 10 }}
          src={embedSrc}
          width="100%"
          height="100"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="text-lg flex flex-col gap-2"
        >
          <p className="text-center">No Song yet! Enter one here!</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={spotifyLink}
              onChange={(e) => setSpotifyLink(e.target.value)}
              className="border-2 container rounded-lg py-1 px-2 outline-none"
              placeholder="Put a Spotify link here!"
            />
            <button type="submit" className="border-2 py-2 px-3 rounded-4xl">
              {loading ? "Sending" : "Submit"}
            </button>
          </div>
          <p className="text-[#df9f3f]">
            {errors.spotifyLink ? errors.spotifyLink : ""}
          </p>
        </form>
      )}
    </section>
  );
}

function toSpotifyEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname !== "open.spotify.com") return null;
    // turns /track/ID => /embed/track/ID (preserves query if present)
    u.pathname = u.pathname.replace(
      /^\/(track|album|playlist|artist)\//,
      "/embed/$1/"
    );
    return u.toString();
  } catch {
    return null;
  }
}
