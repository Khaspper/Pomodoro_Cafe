import type { TCafe } from "../../types/types";

export default function Vibe({ selectedCafe }: { selectedCafe: TCafe }) {
  const embedSrc = selectedCafe.spotifyLink
    ? toSpotifyEmbed(selectedCafe.spotifyLink)
    : null;

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
        <form method="POST" className="text-lg flex flex-col gap-2">
          <p className="text-center">No Song yet! Enter one here!</p>
          <div className="flex gap-2">
            <input
              type="text"
              className="border-2 container rounded-lg py-1 px-2 outline-none"
              placeholder="Put a Spotify link here!"
            />
            <button type="submit" className="border-2 py-2 px-3 rounded-4xl">
              Submit
            </button>
          </div>
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
