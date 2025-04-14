'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAnimeList, Anime } from "../../lib/api";
import { AnimeCard } from "../../components/AnimeCard";
import { Button } from "../../components/ui/button";

export default function RecentPage() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAnime, setTotalAnime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchAnimeList(currentPage + 2, itemsPerPage);
        setAnime(result.data);
        setTotalAnime(result.total);
      } catch (err) {
        console.error("Error fetching recent anime:", err);
        setError("Failed to load recent anime. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(totalAnime / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Recently Updated</h1>
        <div className="text-sm text-muted-foreground">
          Showing {anime.length} of {totalAnime} titles
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <AnimeCard
                key={`loading-${i}`}
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
          : anime.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isLoading}
            className="flex items-center gap-1"
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
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Previous
          </Button>

          <div className="mx-4 text-sm">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isLoading}
            className="flex items-center gap-1"
          >
            Next
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
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
