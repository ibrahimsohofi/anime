export interface Anime {
  id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  image: string;
  images?: {
    jpg?: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  rank: number;
  popularity: number;
  synopsis: string;
  genres: {
    id: number;
    name: string;
  }[];
  year: number;
  studios: {
    id: number;
    name: string;
  }[];
}

export interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface SingleAnimeResponse {
  data: Anime;
}

export interface Genre {
  id: number;
  name: string;
  count: number;
}

export interface GenreResponse {
  data: Genre[];
}

import { popularAnimeFallback, recentAnimeFallback, genresFallback } from "./fallbackData";

const BASE_URL = "https://api.jikan.moe/v4";

// Add a delay function to avoid hitting rate limits
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches data from the Jikan API with rate limiting
 */
async function fetchWithRateLimit<T>(endpoint: string, fallbackData?: T): Promise<T> {
  // Add a short delay before each request to avoid rate limits (Jikan API allows 3 requests per second)
  await delay(400);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { cache: 'force-cache' });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      if (fallbackData) {
        console.log("Using fallback data due to API rate limiting");
        return fallbackData;
      }
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from API:", error);
    if (fallbackData) {
      console.log("Using fallback data due to API error");
      return fallbackData;
    }
    throw error;
  }
}

/**
 * Get top anime by popularity
 */
export async function getPopularAnime(page = 1): Promise<AnimeResponse> {
  return fetchWithRateLimit(`/top/anime?page=${page}&filter=bypopularity`, popularAnimeFallback);
}

/**
 * Get recently aired/updated anime
 */
export async function getRecentAnime(page = 1): Promise<AnimeResponse> {
  return fetchWithRateLimit(`/anime?page=${page}&order_by=start_date&sort=desc&status=airing`, recentAnimeFallback);
}

/**
 * Get anime by genre
 */
export async function getAnimeByGenre(genreId: number, page = 1): Promise<AnimeResponse> {
  return fetchWithRateLimit(`/anime?page=${page}&genres=${genreId}`, popularAnimeFallback);
}

/**
 * Get anime by search query
 */
export async function searchAnime(query: string, page = 1): Promise<AnimeResponse> {
  return fetchWithRateLimit(`/anime?page=${page}&q=${encodeURIComponent(query)}&sfw=true`, popularAnimeFallback);
}

/**
 * Get single anime details by ID
 */
export async function getAnimeById(id: number): Promise<SingleAnimeResponse> {
  // For the single anime detail, we use the first anime from the fallback data
  const fallbackSingleAnime: SingleAnimeResponse = {
    data: popularAnimeFallback.data[0]
  };
  return fetchWithRateLimit(`/anime/${id}/full`, fallbackSingleAnime);
}

/**
 * Get all anime genres
 */
export async function getGenres(): Promise<GenreResponse> {
  return fetchWithRateLimit("/genres/anime", genresFallback);
}
