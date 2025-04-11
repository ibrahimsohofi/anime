'use client';

import Link from "next/link";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results: {query}</h1>

      {!query ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Enter a search query to find anime.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder cards */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-[400px]">
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

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Looking for something else? Try browsing our{" "}
              <Link href="/genres" className="text-primary hover:underline">
                genre categories
              </Link>
              .
            </p>
          </div>
        </>
      )}
    </div>
  );
}
