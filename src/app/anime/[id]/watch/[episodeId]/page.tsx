'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { fetchAnimeDetails, fetchEpisodes, Anime, Episode } from "../../../../../lib/api";

// Add static generation for all anime episodes
export function generateStaticParams() {
  // Generate static paths for the first 3 episodes of each anime (for IDs 1-12)
  const paths = [];

  for (let animeId = 1; animeId <= 12; animeId++) {
    for (let episodeId = 101; episodeId <= 103; episodeId++) {
      paths.push({
        id: animeId.toString(),
        episodeId: episodeId.toString()
      });
    }
  }

  return paths;
}

export default function WatchPage({ params }: { params: { id: string; episodeId: string; } }) {
  const { id, episodeId } = params;
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [prevEpisode, setPrevEpisode] = useState<Episode | null>(null);
  const [nextEpisode, setNextEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch anime details
        const animeDetails = await fetchAnimeDetails(id);
        if (animeDetails) {
          setAnime(animeDetails);

          // Fetch episodes
          const episodesList = await fetchEpisodes(id);
          setEpisodes(episodesList);

          // Find current episode
          const current = episodesList.find((ep) => ep.id === episodeId);
          if (current) {
            setCurrentEpisode(current);

            // Find the index of the current episode
            const currentIndex = episodesList.findIndex((ep) => ep.id === episodeId);
            if (currentIndex > 0) {
              setPrevEpisode(episodesList[currentIndex - 1]);
            }
            if (currentIndex < episodesList.length - 1) {
              setNextEpisode(episodesList[currentIndex + 1]);
            }
          } else {
            setError("Episode not found");
          }
        } else {
          setError("Anime not found");
        }
      } catch (err) {
        console.error("Error fetching episode data:", err);
        setError("Failed to load episode data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, episodeId]);

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-6 w-48 mb-6" />
        <Skeleton className="h-10 w-2/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />

        <div className="relative aspect-video overflow-hidden rounded-lg bg-black mb-6">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>

        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={`episode-${i}`} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !anime || !currentEpisode) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">
            {error || "Something went wrong"}
          </h2>
          <p className="text-muted-foreground mb-8">
            We couldn't load the episode. Please try again later.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Back to Home
            </Link>
            {anime && (
              <Link
                href={`/anime/${id}`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Back to Anime
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

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
