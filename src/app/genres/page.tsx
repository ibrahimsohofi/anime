import Link from "next/link";
import { getGenres } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Anime Genres | AnimeHub",
  description: "Browse anime by genres - action, comedy, drama, romance and more",
};

export default async function GenresPage() {
  const genresData = await getGenres();

  // Filter out genres with 0 count and sort alphabetically
  const genres = genresData.data
    .filter((genre) => genre.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Anime Genres</h1>
        <p className="text-muted-foreground mt-2">
          Browse anime by your favorite genre
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genres/${genre.id}`}>
            <Card className="h-full hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle>{genre.name}</CardTitle>
                <CardDescription>
                  <Badge variant="outline" className="mt-1">
                    {genre.count} titles
                  </Badge>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
