import { getRecentAnime } from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";

export const metadata = {
  title: "Recent Anime | AnimeHub",
  description: "Discover the latest anime releases and updates",
};

export default async function RecentPage() {
  const recentData = await getRecentAnime(1);
  const animeList = recentData.data;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Recent Anime</h1>
        <p className="text-muted-foreground mt-2">
          Stay up to date with the latest anime releases and episodes
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
