import Link from "next/link";
import Image from "next/image";

// Mock data
const ANIME_DETAILS = {
  id: "1",
  title: "Attack on Titan",
  image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
  synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.",
  type: "TV",
  status: "Completed",
  episodes: 25,
  genres: ["Action", "Drama", "Fantasy"],
  rating: "8.53",
  aired: "Apr 7, 2013 to Sep 29, 2013"
};

// Mock episodes data
const EPISODES = [
  {
    id: "101",
    title: "To You, in 2000 Years: The Fall of Shiganshina, Part 1",
    number: 1,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    sources: [{ url: "#", quality: "HD" }]
  },
  {
    id: "102",
    title: "That Day: The Fall of Shiganshina, Part 2",
    number: 2,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    sources: [{ url: "#", quality: "HD" }]
  },
  {
    id: "103",
    title: "A Dim Light Amid Despair: Humanity's Comeback, Part 1",
    number: 3,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    sources: [{ url: "#", quality: "HD" }]
  }
];

export default function WatchPage({ params }: { params: { id: string; episodeId: string; } }) {
  const { id, episodeId } = params;
  const anime = ANIME_DETAILS;
  const episodes = EPISODES;

  const currentEpisode = episodes.find((ep) => ep.id === episodeId) || episodes[0];
  const currentIndex = episodes.findIndex((ep) => ep.id === episodeId);
  const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/anime/${id}`}
          className="text-sm text-muted-foreground hover:text-primary flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to {anime.title}
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        {anime.title} - Episode {currentEpisode.number}
      </h1>
      <h2 className="text-xl mb-6 text-muted-foreground">{currentEpisode.title}</h2>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-black mb-6">
        {/* Display a placeholder for the video player */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4 text-white/50"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
            </svg>
            <p className="text-white/70">Video player placeholder</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        {prevEpisode ? (
          <Link
            href={`/anime/${id}/watch/${prevEpisode.id}`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Previous Episode
          </Link>
        ) : (
          <div />
        )}

        {nextEpisode ? (
          <Link
            href={`/anime/${id}/watch/${nextEpisode.id}`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Next Episode
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">All Episodes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/anime/${id}/watch/${episode.id}`}
              className={`block p-3 text-center rounded-md ${episode.id === episodeId ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              <span className="block font-medium">Ep {episode.number}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
