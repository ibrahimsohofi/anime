'use client';

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { Anime } from "../lib/api";
import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  anime: Anime;
  isLoading?: boolean;
}

export function AnimeCard({ anime, isLoading = false }: AnimeCardProps) {
  if (isLoading) {
    return (
      <Card className="overflow-hidden h-[400px] transition-all duration-200 hover:shadow-lg">
        <CardHeader className="p-0 h-[250px] relative">
          <Skeleton className="w-full h-full" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={`/anime/${anime.id}`}>
      <Card className="overflow-hidden h-[400px] transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <CardHeader className="p-0 h-[250px] relative">
          <div className="relative w-full h-full">
            <Image
              src={anime.image}
              alt={anime.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full">
            {anime.type}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16" />
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{anime.title}</h3>
          <div className="text-sm text-muted-foreground mt-1">
            <span className="mr-2">⭐ {anime.rating}</span>
            <span>{anime.episodes} episodes</span>
          </div>
          <p className="text-sm mt-2 line-clamp-2 text-muted-foreground">{anime.synopsis}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
          {anime.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="text-xs bg-muted px-2 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
          {anime.genres?.length > 3 && (
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              +{anime.genres.length - 3} more
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
