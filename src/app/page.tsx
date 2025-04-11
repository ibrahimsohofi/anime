import Link from "next/link";
import { getPopularAnime, getRecentAnime } from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  // Fetch popular and recent anime
  const [popularData, recentData] = await Promise.all([
    getPopularAnime(1),
    getRecentAnime(1),
  ]);

  const popularAnime = popularData.data.slice(0, 8);
  const recentAnime = recentData.data.slice(0, 8);

  return (
    <div className="container py-6">
      {/* Hero Section */}
      <section className="py-10 md:py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Discover the world of Anime
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
            Explore popular anime, find new releases, and browse by genres.
          </p>
        </div>
      </section>

      {/* Popular Anime Section */}
      <section className="py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Popular Anime</h2>
          <Link href="/popular">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Recent Anime Section */}
      <section className="py-4 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Recent Releases</h2>
          <Link href="/recent">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Genres Section */}
      <section className="py-8 mt-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Explore by Genre</h2>
        <Link href="/genres">
          <Button>Browse Genres</Button>
        </Link>
      </section>
    </div>
  );
}
