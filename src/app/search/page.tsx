import Link from "next/link";

// This needs to be a static page for export
export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  // For static export, we'll just show the empty search state
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Anime</h1>

      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Use the search bar above</h2>
        <p className="text-muted-foreground mb-8">
          Search for anime titles or genres using the search bar at the top of the page.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Home
          </Link>
          <Link
            href="/genres"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Browse Genres
          </Link>
        </div>
      </div>
    </div>
  );
}

// Static generation for search page
export async function generateStaticParams() {
  // Here you can define the static parameters that will be used for rendering
  return {
    params: {
      q: "", // Example of static parameter
    },
  };
}
