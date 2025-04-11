import Link from "next/link";
import Image from "next/image";

// Add static generation for all anime ids
export async function generateStaticParams() {
  // Generate static pages for anime IDs 1 through 12
  return Array.from({ length: 12 }, (_, i) => ({
    id: (i + 1).toString()
  }));
}

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
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
  },
  {
    id: "102",
    title: "That Day: The Fall of Shiganshina, Part 2",
    number: 2,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
  },
  {
    id: "103",
    title: "A Dim Light Amid Despair: Humanity's Comeback, Part 1",
    number: 3,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
  }
];

export default function AnimePage({ params }: { params: { id: string } }) {
  const anime = ANIME_DETAILS;
  const episodes = EPISODES;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={anime.image}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold tracking-tight">{anime.title}</h1>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              ⭐ {anime.rating}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {anime.genres?.map((genre) => (
              <Link
                key={genre}
                href={`/search?q=${encodeURIComponent(genre)}`}
                className="px-2 py-1 bg-muted rounded-full text-xs font-medium hover:bg-muted/80 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{anime.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">{anime.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Episodes</p>
              <p className="font-medium">{anime.episodes}</p>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <p className="text-sm text-muted-foreground">Aired</p>
              <p className="font-medium">{anime.aired}</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2">Synopsis</h2>
          <p className="text-muted-foreground mb-6">{anime.synopsis}</p>

          {episodes.length > 0 && (
            <Link
              href={`/anime/${anime.id}/watch/${episodes[0].id}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
            >
              Watch Episode 1
            </Link>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/anime/${anime.id}/watch/${episode.id}`}
                className="group"
              >
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-32">
                    <Image
                      src={episode.image || anime.image}
                      alt={episode.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1">
                      Episode {episode.number}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {episode.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-muted-foreground">No episodes available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
