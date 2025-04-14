'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchAnimeList, Anime } from "../lib/api";
import { AnimeCard } from "../components/AnimeCard";

export default function Home() {
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [recentAnime, setRecentAnime] = useState<Anime[]>([]);
  const [featuredAnime, setFeaturedAnime] = useState<Anime | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch popular anime
        const popularResult = await fetchAnimeList(1, 4);
        setPopularAnime(popularResult.data);

        // Set featured anime to the first popular one
        if (popularResult.data.length > 0) {
          setFeaturedAnime(popularResult.data[0]);
        }

        // Fetch recent anime
        const recentResult = await fetchAnimeList(2, 4); // Using a different page to get different anime
        setRecentAnime(recentResult.data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback featured anime
  const defaultFeaturedAnime = {
    id: "1",
    title: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls.",
    rating: "8.53",
    type: "TV",
    episodes: 25,
    genres: ["Action", "Drama", "Fantasy"]
  };

  // Use the fetched featured anime or the default one
  const heroAnime = featuredAnime || defaultFeaturedAnime;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Hero section with featured anime */}
      <section className="mb-12">
        <div className="relative rounded-xl overflow-hidden h-[60vh] min-h-[400px]">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={heroAnime.image}
              alt={heroAnime.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-8 md:p-12 max-w-3xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="bg-primary/80 text-white px-2 py-0.5 rounded text-xs font-medium">FEATURED</span>
              <span className="bg-black/50 text-white/90 px-2 py-0.5 rounded text-xs">⭐ {heroAnime.rating}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">{heroAnime.title}</h1>
            <p className="text-gray-200 mb-6 line-clamp-3">{heroAnime.synopsis}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {heroAnime.genres.map(genre => (
                <Link
                  key={genre}
                  href={`/search?q=${encodeURIComponent(genre)}`}
                  className="bg-black/30 hover:bg-black/50 text-white/90 px-2 py-1 rounded-full text-xs transition-colors"
                >
                  {genre}
                </Link>
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                href={`/anime/${heroAnime.id}`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
              >
                Watch Now
              </Link>
              <Link
                href={`/anime/${heroAnime.id}`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/20 bg-white/10 hover:bg-white/20 text-white h-11 rounded-md px-8"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Popular Anime</h2>
          <Link
            href="/popular"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 font-medium"
          >
            View all
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
              className="ml-2 h-4 w-4"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <AnimeCard
                  key={`popular-loading-${i}`}
                  anime={{
                    id: `loading-${i}`,
                    title: '',
                    image: '',
                    synopsis: '',
                    type: '',
                    status: '',
                    episodes: 0,
                    genres: [],
                    rating: '',
                    aired: ''
                  }}
                  isLoading={true}
                />
              ))
            : popularAnime.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Recently Updated</h2>
          <Link
            href="/recent"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 font-medium"
          >
            View all
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
              className="ml-2 h-4 w-4"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <AnimeCard
                  key={`recent-loading-${i}`}
                  anime={{
                    id: `loading-${i}`,
                    title: '',
                    image: '',
                    synopsis: '',
                    type: '',
                    status: '',
                    episodes: 0,
                    genres: [],
                    rating: '',
                    aired: ''
                  }}
                  isLoading={true}
                />
              ))
            : recentAnime.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
        </div>
      </section>

      <section className="mb-12 rounded-lg border bg-card p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="md:flex-1">
            <h2 className="text-2xl font-bold mb-2">Explore by Genres</h2>
            <p className="text-muted-foreground mb-4">Discover anime organized by themes, styles, and content categories.</p>
            <Link
              href="/genres"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Browse All Genres
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 md:flex-1">
            {["Action", "Romance", "Comedy", "Drama", "Fantasy", "Sci-Fi"].map((genre) => (
              <Link
                key={genre}
                href={`/search?q=${encodeURIComponent(genre)}`}
                className="px-3 py-1.5 bg-muted rounded-md text-sm hover:bg-muted/80 transition-colors"
              >
                {genre}
              </Link>
            ))}
            <Link
              href="/genres"
              className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              More...
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
