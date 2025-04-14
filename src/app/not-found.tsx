import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="mb-8 text-muted-foreground max-w-lg mx-auto">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Go back home
      </Link>
    </div>
  );
}
