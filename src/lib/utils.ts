import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Anime } from "./api";

/**
 * Combine class values using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncate text to a specific length and add ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "Unknown";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    return "Invalid date";
  }
}

/**
 * Get appropriate image URL from Jikan API
 */
export function getAnimeImageUrl(anime: Partial<Anime> | null | undefined): string {
  // Adjust this based on actual API response
  if (!anime) return "/placeholder-image.jpg";

  if (anime.images?.jpg?.image_url) {
    return anime.images.jpg.image_url;
  }

  if (anime.image) {
    return anime.image;
  }

  return "/placeholder-image.jpg";
}

/**
 * Format large numbers with k suffix
 */
export function formatNumber(num: number): string {
  if (num === undefined || num === null) return "N/A";

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  return num.toString();
}
