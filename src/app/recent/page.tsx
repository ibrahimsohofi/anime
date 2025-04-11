import { fetchAnimeList } from "../../lib/api";
import { AnimeCard } from "../../components/AnimeCard";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export async function generateStaticParams() {
  // Generate pages for pagination (not used in static export)
  return [
    { page: '1' },
    { page: '2' },
    { page: '3' },
  ];
}

export default function RecentPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recently Updated Anime</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Placeholder cards */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`recent-placeholder-${i}`} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-[400px]">
            <div className="h-[250px] bg-muted" />
            <div className="p-4">
              <div className="h-5 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2 mb-2" />
              <div className="h-4 bg-muted rounded w-full mb-2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          <Link
            href="#"
            className="inline-flex items-center justify-center border rounded-md h-10 w-10 bg-background"
            aria-disabled="true"
          >
            <span className="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <Link
            href="/recent/page/1"
            className="inline-flex items-center justify-center border rounded-md h-10 w-10 bg-primary text-primary-foreground"
          >
            1
          </Link>
          <Link
            href="/recent/page/2"
            className="inline-flex items-center justify-center border rounded-md h-10 w-10 bg-background"
          >
            2
          </Link>
          <Link
            href="/recent/page/3"
            className="inline-flex items-center justify-center border rounded-md h-10 w-10 bg-background"
          >
            3
          </Link>
          <Link
            href="/recent/page/2"
            className="inline-flex items-center justify-center border rounded-md h-10 w-10 bg-background"
          >
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
