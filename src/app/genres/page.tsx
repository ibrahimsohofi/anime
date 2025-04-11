import Link from "next/link";

const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
  "Mecha",
  "Music",
  "Psychological",
  "Seinen",
  "Shoujo",
  "Shounen",
  "Martial Arts",
  "Military",
  "Historical",
  "Demons",
  "Game",
  "Ecchi",
  "School",
  "Harem",
  "Super Power",
  "Vampire",
  "Magic",
];

export default function GenresPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Anime Genres</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {GENRES.map((genre) => (
          <Link
            key={genre}
            href={`/search?q=${encodeURIComponent(genre)}`}
            className="relative group"
          >
            <div className="border rounded-lg overflow-hidden h-32 bg-gradient-to-br from-blue-900/70 to-purple-900/70 transition-all group-hover:from-blue-700/70 group-hover:to-purple-700/70">
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-lg font-medium text-white">{genre}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
