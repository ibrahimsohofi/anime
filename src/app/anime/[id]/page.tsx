import { getAnimeById } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, CalendarIcon, Clock, Tv2 } from "lucide-react";
import { formatDate, getAnimeImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const animeId = Number.parseInt(params.id);
  if (Number.isNaN(animeId)) return notFound();

  try {
    const animeData = await getAnimeById(animeId);
    const anime = animeData.data;

    return {
      title: `${anime.title} | AnimeHub`,
      description: anime.synopsis?.slice(0, 160) || "View anime details",
    };
  } catch (error) {
    return {
      title: "Anime Details | AnimeHub",
      description: "View anime details",
    };
  }
}

export default async function AnimeDetailPage({ params }: Props) {
  const animeId = Number.parseInt(params.id);
  if (Number.isNaN(animeId)) return notFound();

  try {
    const animeData = await getAnimeById(animeId);
    const anime = animeData.data;

    const imageUrl = getAnimeImageUrl(anime);

    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Anime Image */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src={imageUrl}
                alt={anime.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
                priority
              />
            </div>

            {/* Info Cards */}
            <div className="mt-6 space-y-4">
              {anime.score && (
                <div className="flex items-center bg-muted p-3 rounded-lg">
                  <Star className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
                  <div>
                    <p className="text-sm font-semibold">Score</p>
                    <p className="text-xl font-bold">{anime.score.toFixed(1)}</p>
                  </div>
                </div>
              )}

              {anime.aired?.from && (
                <div className="flex items-center bg-muted p-3 rounded-lg">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm font-semibold">Aired</p>
                    <p className="text-sm">{anime.aired.string || formatDate(anime.aired.from)}</p>
                  </div>
                </div>
              )}

              {anime.duration && (
                <div className="flex items-center bg-muted p-3 rounded-lg">
                  <Clock className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm font-semibold">Duration</p>
                    <p className="text-sm">{anime.duration}</p>
                  </div>
                </div>
              )}

              {anime.type && (
                <div className="flex items-center bg-muted p-3 rounded-lg">
                  <Tv2 className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm font-semibold">Type</p>
                    <p className="text-sm">{anime.type}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Anime Details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{anime.title}</h1>

            {anime.title_japanese && (
              <p className="text-muted-foreground mb-4">{anime.title_japanese}</p>
            )}

            {/* Genres */}
            {anime.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genres.map((genre) => (
                  <Link key={genre.id} href={`/genres/${genre.id}`}>
                    <Badge variant="secondary">{genre.name}</Badge>
                  </Link>
                ))}
              </div>
            )}

            {/* Synopsis */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Synopsis</h2>
              <div className="text-muted-foreground whitespace-pre-line">
                {anime.synopsis || "No synopsis available."}
              </div>
            </div>

            {/* Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {anime.episodes !== null && (
                  <div>
                    <span className="font-semibold">Episodes:</span> {anime.episodes || "Unknown"}
                  </div>
                )}

                {anime.status && (
                  <div>
                    <span className="font-semibold">Status:</span> {anime.status}
                  </div>
                )}

                {anime.source && (
                  <div>
                    <span className="font-semibold">Source:</span> {anime.source}
                  </div>
                )}

                {anime.rating && (
                  <div>
                    <span className="font-semibold">Rating:</span> {anime.rating}
                  </div>
                )}

                {anime.studios?.length > 0 && (
                  <div>
                    <span className="font-semibold">Studios:</span>{" "}
                    {anime.studios.map((studio) => studio.name).join(", ")}
                  </div>
                )}
              </div>
            </div>

            {/* Trailer */}
            {anime.trailer?.embed_url && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Trailer</h2>
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <iframe
                    src={anime.trailer.embed_url}
                    title={`${anime.title} Trailer`}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-8">
              <Button variant="outline" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
