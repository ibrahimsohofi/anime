import { fetchAnimeList } from "@/lib/api";
import { AnimeCard } from "@/components/AnimeCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateStaticParams() {
  // Generate pages for pagination
  return [
    { pageNumber: '2' },
    { pageNumber: '3' },
  ];
}

export default async function PopularPaginatedPage({ params }: { params: { pageNumber: string } }) {
  const pageNumber = Number.parseInt(params.pageNumber, 10);
  const { data: animeList, total } = await fetchAnimeList(pageNumber, 24);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Popular Anime - Page {pageNumber}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/recent">Recent</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/popular">1</Link>
          </Button>

          <Button variant={pageNumber === 2 ? "outline" : "ghost"} disabled={pageNumber === 2} asChild={pageNumber !== 2}>
            {pageNumber !== 2 ? <Link href="/popular/page/2">2</Link> : <>2</>}
          </Button>

          <Button variant={pageNumber === 3 ? "outline" : "ghost"} disabled={pageNumber === 3} asChild={pageNumber !== 3}>
            {pageNumber !== 3 ? <Link href="/popular/page/3">3</Link> : <>3</>}
          </Button>

          {pageNumber < 3 && (
            <Button variant="ghost" asChild>
              <Link href={`/popular/page/${pageNumber + 1}`}>Next</Link>
            </Button>
          )}

          {pageNumber > 1 && (
            <Button variant="ghost" asChild>
              <Link href={pageNumber === 2 ? "/popular" : `/popular/page/${pageNumber - 1}`}>Previous</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
