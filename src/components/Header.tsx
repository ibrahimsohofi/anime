"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">AnimeHub</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/popular"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Popular
          </Link>
          <Link
            href="/recent"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Recent
          </Link>
          <Link
            href="/genres"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Genres
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-auto">
            <Input
              type="search"
              placeholder="Search anime..."
              className="h-9 md:w-[200px] lg:w-[280px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              size="sm"
              variant="ghost"
              type="submit"
              disabled={isPending}
              className="absolute right-0 top-0 h-9 w-9 px-0"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
