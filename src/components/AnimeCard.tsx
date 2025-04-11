import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, getAnimeImageUrl, truncateText } from "@/lib/utils";
import type { Anime } from "@/lib/api";
import { Star } from "lucide-react";

interface AnimeCardProps {
  anime: Partial<Anime>;
  showScore?: boolean;
}

export default function AnimeCard({ anime, showScore = true }: AnimeCardProps) {
  if (!anime) return null;

  // Extract image URL from the anime object based on Jikan API response
  const imageUrl = getAnimeImageUrl(anime);
  const animeId = anime.id || 0;

  return (
    <Link href={`/anime/${animeId}`} className="block">
      <Card className="overflow-hidden h-full transition-all hover:scale-[1.02] hover:shadow-md">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={imageUrl}
            alt={anime.title || "Anime"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />

          {showScore && anime.score && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{anime.score.toFixed(1)}</span>
            </div>
          )}
        </div>

        <CardContent className="p-3">
          <h3 className="font-semibold line-clamp-2 text-sm">
            {anime.title_english || anime.title || "Unknown"}
          </h3>

          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>{anime.type || "Unknown"}</span>
            {anime.episodes && (
              <span>{anime.episodes} ep{anime.episodes !== 1 ? "s" : ""}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
