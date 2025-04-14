'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { searchAnime, Anime } from "../../lib/api";
import { AnimeCard } from "../../components/AnimeCard";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(searchQuery);
  const [results, setResults] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search when the component mounts if there's a query in the URL
  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const animeResults = await searchAnime(searchQuery);
      setResults(animeResults);
    } catch (err) {
      console.error('Error searching anime:', err);
      setError('Something went wrong while fetching results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);

    // Update the URL with the search query
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Anime</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2 max-w-xl">
          <Input
            type="search"
            placeholder="Search anime titles, genres, etc."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {query && !isLoading && results.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No results found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't find any anime matching "{query}". Try different keywords or browse our categories.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Back to Home
            </Link>
            <Link
              href="/genres"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Browse Genres
            </Link>
          </div>
        </div>
      ) : !query && !searchQuery ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Search for your favorite anime</h2>
          <p className="text-muted-foreground mb-8">
            Enter a title, genre, or keyword to find anime.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Back to Home
            </Link>
            <Link
              href="/genres"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Browse Genres
            </Link>
          </div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <AnimeCard key={`loading-${i}`} anime={{
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
                }} isLoading={true} />
              ))}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  {results.length} {results.length === 1 ? 'result' : 'results'} for "{query || searchQuery}"
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map(anime => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
