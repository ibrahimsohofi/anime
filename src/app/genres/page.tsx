'use client';

import Link from "next/link";

// A more comprehensive list of anime genres
const GENRES = [
  {
    name: "Action",
    description: "Exciting sequences involving physical challenges, fights, chases, and more.",
    color: "bg-red-500/10 border-red-500/30 hover:bg-red-500/20",
  },
  {
    name: "Adventure",
    description: "Stories focused on traveling, exploration, and discovering new places.",
    color: "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20",
  },
  {
    name: "Comedy",
    description: "Shows intended to be humorous with jokes, gags, and amusing situations.",
    color: "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20",
  },
  {
    name: "Drama",
    description: "Character-driven plots focused on realistic scenarios and emotional themes.",
    color: "bg-teal-500/10 border-teal-500/30 hover:bg-teal-500/20",
  },
  {
    name: "Fantasy",
    description: "Stories with magical elements, mythical creatures, and supernatural powers.",
    color: "bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20",
  },
  {
    name: "Horror",
    description: "Content designed to frighten viewers with supernatural, suspenseful, or shocking elements.",
    color: "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20",
  },
  {
    name: "Mystery",
    description: "Stories involving solving a puzzle, crime, or uncovering secrets.",
    color: "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20",
  },
  {
    name: "Romance",
    description: "Focus on love stories and relationship development between characters.",
    color: "bg-pink-500/10 border-pink-500/30 hover:bg-pink-500/20",
  },
  {
    name: "Sci-Fi",
    description: "Stories based on scientific or technological advances, often set in the future or space.",
    color: "bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/20",
  },
  {
    name: "Slice of Life",
    description: "Portrayal of everyday experiences in realistic settings.",
    color: "bg-green-500/10 border-green-500/30 hover:bg-green-500/20",
  },
  {
    name: "Sports",
    description: "Centered around athletic competition, sports teams, or individual athletes.",
    color: "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20",
  },
  {
    name: "Supernatural",
    description: "Involves phenomena beyond the realm of scientific understanding.",
    color: "bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/20",
  },
  {
    name: "Thriller",
    description: "Creates suspense, tension, and excitement with intense situations and plot twists.",
    color: "bg-red-700/10 border-red-700/30 hover:bg-red-700/20",
  },
  {
    name: "Mecha",
    description: "Features large robots or machines controlled by people, often in combat.",
    color: "bg-gray-500/10 border-gray-500/30 hover:bg-gray-500/20",
  },
  {
    name: "Music",
    description: "Centered around music, bands, idols, or other musical themes.",
    color: "bg-pink-300/10 border-pink-300/30 hover:bg-pink-300/20",
  },
  {
    name: "Psychological",
    description: "Explores the mental and emotional aspects of characters in complex situations.",
    color: "bg-purple-900/10 border-purple-900/30 hover:bg-purple-900/20",
  },
  {
    name: "Isekai",
    description: "Characters transported to or reborn in another world, often with game-like elements.",
    color: "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20",
  },
  {
    name: "Historical",
    description: "Set in a historical period or based on historical events.",
    color: "bg-amber-800/10 border-amber-800/30 hover:bg-amber-800/20",
  },
  {
    name: "Military",
    description: "Focused on warfare, military organizations and personnel.",
    color: "bg-green-800/10 border-green-800/30 hover:bg-green-800/20",
  },
  {
    name: "Shounen",
    description: "Aimed at young male audiences, typically action-packed.",
    color: "bg-blue-600/10 border-blue-600/30 hover:bg-blue-600/20",
  },
  {
    name: "Shoujo",
    description: "Aimed at young female audiences, often focusing on romance and relationships.",
    color: "bg-pink-400/10 border-pink-400/30 hover:bg-pink-400/20",
  },
  {
    name: "Magic",
    description: "Features spells, witches, wizards, and other magical elements.",
    color: "bg-purple-400/10 border-purple-400/30 hover:bg-purple-400/20",
  },
  {
    name: "School",
    description: "Set primarily in a school environment.",
    color: "bg-yellow-600/10 border-yellow-600/30 hover:bg-yellow-600/20",
  },
  {
    name: "Harem",
    description: "Features a protagonist surrounded by multiple romantic interests.",
    color: "bg-red-300/10 border-red-300/30 hover:bg-red-300/20",
  },
];

export default function GenresPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Anime Genres</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Explore anime by genre to find shows that match your interests. Click on any genre to see a list of anime in that category.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GENRES.map((genre) => (
          <Link
            key={genre.name}
            href={`/search?q=${encodeURIComponent(genre.name)}`}
            className={`block p-6 rounded-lg border transition-all duration-200 ${genre.color}`}
          >
            <h2 className="text-xl font-semibold mb-2">{genre.name}</h2>
            <p className="text-muted-foreground">{genre.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Looking for Something Specific?</h2>
        <p className="text-muted-foreground mb-6">
          Can't find exactly what you're looking for? Try our search feature to find anime by title, theme, or any other keyword.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Go to Search
        </Link>
      </div>
    </div>
  );
}
