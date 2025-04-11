import { searchAnime } from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";

export const metadata = {
  title: "Search Anime | AnimeHub",
  description: "Search for your favorite anime titles",
};

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const searchResults = query ? await searchAnime(query) : { data: [] };
  const animeList = searchResults.data;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {query ? `Search Results for "${query}"` : "Search Anime"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {animeList.length > 0
            ? `Found ${animeList.length} results`
            : query
            ? "No results found. Try a different search term."
            : "Enter a search term to find anime"}
        </p>
      </div>

      {animeList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            {query ? "No anime found matching your search term" : "Enter a search term to begin"}
          </p>
        </div>
      )}
    </div>
  );
}
