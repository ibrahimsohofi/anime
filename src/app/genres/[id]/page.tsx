import AnimeCard from "@/components/AnimeCard";
import { getAnimeByGenre, getGenres } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const genreId = Number.parseInt(params.id);
  if (Number.isNaN(genreId)) return notFound();

  try {
    const genresData = await getGenres();
    const genre = genresData.data.find((g) => g.id === genreId);

    if (!genre) return notFound();

    return {
      title: `${genre.name} Anime | AnimeHub`,
      description: `Browse anime in the ${genre.name} genre`,
    };
  } catch (error) {
    return {
      title: "Genre | AnimeHub",
      description: "Browse anime by genre",
    };
  }
}

export default async function GenrePage({ params }: Props) {
  const genreId = Number.parseInt(params.id);
  if (Number.isNaN(genreId)) return notFound();

  try {
    const [genresData, animeData] = await Promise.all([
      getGenres(),
      getAnimeByGenre(genreId),
    ]);

    const genre = genresData.data.find((g) => g.id === genreId);
    if (!genre) return notFound();

    const animeList = animeData.data;

    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{genre.name} Anime</h1>
          <p className="text-muted-foreground mt-2">
            Browsing {animeList.length} titles in the {genre.name} genre
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>

        {animeList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No anime found in this genre</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
