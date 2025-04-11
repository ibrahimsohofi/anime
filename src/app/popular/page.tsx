import { getPopularAnime } from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";

export const metadata = {
  title: "Popular Anime | AnimeHub",
  description: "Browse the most popular anime series and movies",
};

export default async function PopularPage() {
  const popularData = await getPopularAnime(1);
  const animeList = popularData.data;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Popular Anime</h1>
        <p className="text-muted-foreground mt-2">
          Discover the most popular anime titles loved by fans worldwide
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
