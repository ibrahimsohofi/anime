import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Header } from "../components/Header"; // Fixed import path

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnimeStream - Watch Anime Online",
  description: "Stream the latest anime episodes in HD with English subtitles. New episodes added daily!",
  keywords: "anime, streaming, watch anime, anime episodes, anime online, free anime",
  authors: [{ name: "AnimeStream" }],
  openGraph: {
    title: "AnimeStream - Watch Anime Online",
    description: "Stream the latest anime episodes in HD with English subtitles. New episodes added daily!",
    url: "https://animestream.example.com",
    siteName: "AnimeStream",
    images: [
      {
        url: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", // Default OG image
        width: 1200,
        height: 630,
        alt: "AnimeStream",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeStream - Watch Anime Online",
    description: "Stream the latest anime episodes in HD with English subtitles. New episodes added daily!",
    images: ["https://cdn.myanimelist.net/images/anime/1223/96541.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5520b7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ClientBody>
          <Header />
          <main className="min-h-screen bg-background">{children}</main>
          <footer className="bg-background border-t py-8">
            <div className="container max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                    AnimeStream
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Stream the latest anime episodes in HD quality with English subtitles. New episodes added daily!
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Explore</h4>
                  <ul className="space-y-2">
                    <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
                    <li><a href="/popular" className="text-muted-foreground hover:text-primary transition-colors">Popular</a></li>
                    <li><a href="/recent" className="text-muted-foreground hover:text-primary transition-colors">Recent</a></li>
                    <li><a href="/genres" className="text-muted-foreground hover:text-primary transition-colors">Genres</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                    <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="/dmca" className="text-muted-foreground hover:text-primary transition-colors">DMCA</a></li>
                    <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                <p>© {new Date().getFullYear()} AnimeStream. All rights reserved.</p>
                <p className="text-sm mt-2">Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.</p>
              </div>
            </div>
          </footer>
        </ClientBody>
      </body>
    </html>
  );
}
