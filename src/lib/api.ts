const API_KEY = '7zkTBeL6uggGVoqy1ehrjcSv6F83t4xyguMy1cc_Wpk';
const BASE_URL = 'https://anime.apiclub.site';

// Sample data for static site generation
const SAMPLE_ANIME = [
  {
    id: "1",
    title: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.",
    type: "TV",
    status: "Completed",
    episodes: 25,
    genres: ["Action", "Drama", "Fantasy"],
    rating: "8.53",
    aired: "Apr 7, 2013 to Sep 29, 2013"
  },
  {
    id: "2",
    title: "Demon Slayer",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    synopsis: "Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado's shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night.",
    type: "TV",
    status: "Completed",
    episodes: 26,
    genres: ["Action", "Fantasy"],
    rating: "8.55",
    aired: "Apr 6, 2019 to Sep 28, 2019"
  },
  {
    id: "3",
    title: "My Hero Academia",
    image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
    synopsis: "The appearance of 'quirks,' newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual.",
    type: "TV",
    status: "Ongoing",
    episodes: 113,
    genres: ["Action", "Comedy", "Super Power"],
    rating: "7.95",
    aired: "Apr 3, 2016 to ongoing"
  },
  {
    id: "4",
    title: "Jujutsu Kaisen",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    synopsis: "Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the 'King of Curses.'",
    type: "TV",
    status: "Ongoing",
    episodes: 24,
    genres: ["Action", "Demons", "Supernatural"],
    rating: "8.67",
    aired: "Oct 3, 2020 to Mar 27, 2021"
  },
  {
    id: "5",
    title: "One Piece",
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    synopsis: "Gol D. Roger was known as the 'Pirate King,' the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.",
    type: "TV",
    status: "Ongoing",
    episodes: 1000,
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    rating: "8.54",
    aired: "Oct 20, 1999 to ongoing"
  },
  {
    id: "6",
    title: "Naruto",
    image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    synopsis: "Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi's rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto.",
    type: "TV",
    status: "Completed",
    episodes: 220,
    genres: ["Action", "Adventure", "Comedy", "Martial Arts"],
    rating: "7.97",
    aired: "Oct 3, 2002 to Feb 8, 2007"
  },
  {
    id: "7",
    title: "Death Note",
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    synopsis: "A shinigami, as a god of death, can kill any person—provided they see their victim's face and write their victim's name in a notebook called a Death Note. One day, Ryuk, bored by the shinigami lifestyle and interested in seeing how a human would use a Death Note, drops one into the human realm.",
    type: "TV",
    status: "Completed",
    episodes: 37,
    genres: ["Mystery", "Psychological", "Supernatural", "Thriller"],
    rating: "8.63",
    aired: "Oct 4, 2006 to Jun 27, 2007"
  },
  {
    id: "8",
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
    synopsis: "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor.",
    type: "TV",
    status: "Completed",
    episodes: 64,
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    rating: "9.11",
    aired: "Apr 5, 2009 to Jul 4, 2010"
  },
  {
    id: "9",
    title: "Steins;Gate",
    image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
    synopsis: "The self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara, where he indulges himself in his hobby of inventing prospective 'future gadgets' with fellow lab members: Mayuri Shiina, his air-headed childhood friend, and Hashida Itaru, a perverted hacker nicknamed 'Daru.' The three pass the time by tinkering with their most promising contraption yet, a machine dubbed the 'Phone Microwave,' which performs the strange function of morphing bananas into piles of green gel.",
    type: "TV",
    status: "Completed",
    episodes: 24,
    genres: ["Drama", "Sci-Fi", "Suspense"],
    rating: "9.08",
    aired: "Apr 6, 2011 to Sep 14, 2011"
  },
  {
    id: "10",
    title: "Hunter x Hunter (2011)",
    image: "https://cdn.myanimelist.net/images/anime/11/33657.jpg",
    synopsis: "Hunter x Hunter is set in a world where Hunters exist to perform all manner of dangerous tasks like capturing criminals and bravely searching for lost treasures in uncharted territories. Twelve-year-old Gon Freecss is determined to become the best Hunter possible in hopes of finding his father, who was a Hunter himself and had long ago abandoned his young son. However, Gon soon realizes the path to achieving his goals is far more challenging than he could have ever imagined.",
    type: "TV",
    status: "Completed",
    episodes: 148,
    genres: ["Action", "Adventure", "Fantasy"],
    rating: "9.06",
    aired: "Oct 2, 2011 to Sep 24, 2014"
  },
  {
    id: "11",
    title: "Your Name",
    image: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
    synopsis: "Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the bustling city of Tokyo—a dream that stands in stark contrast to her present life in the countryside. Meanwhile in the city, Taki Tachibana lives a busy life as a high school student while juggling his part-time job and hopes for a future in architecture.",
    type: "Movie",
    status: "Completed",
    episodes: 1,
    genres: ["Drama", "Romance", "Supernatural"],
    rating: "8.85",
    aired: "Aug 26, 2016"
  },
  {
    id: "12",
    title: "Spirited Away",
    image: "https://cdn.myanimelist.net/images/anime/6/79597.jpg",
    synopsis: "Stubborn, spoiled, and naïve, 10-year-old Chihiro Ogino is less than pleased when she and her parents discover an abandoned amusement park on the way to their new house. Cautiously venturing inside, she realizes that there is more to this place than meets the eye, as strange things begin to happen once dusk falls. Ghostly apparitions and food that turns her parents into pigs are just the start—Chihiro has unwittingly crossed over into the spirit world.",
    type: "Movie",
    status: "Completed",
    episodes: 1,
    genres: ["Adventure", "Award Winning", "Supernatural"],
    rating: "8.78",
    aired: "Jul 20, 2001"
  }
];

// Sample episodes
const SAMPLE_EPISODES = [
  {
    id: "101",
    title: "To You, in 2000 Years: The Fall of Shiganshina, Part 1",
    number: 1,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    sources: [{ url: "#", quality: "HD" }]
  },
  {
    id: "102",
    title: "That Day: The Fall of Shiganshina, Part 2",
    number: 2,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    sources: [{ url: "#", quality: "HD" }]
  },
  {
    id: "103",
    title: "A Dim Light Amid Despair: Humanity's Comeback, Part 1",
    number: 3,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    sources: [{ url: "#", quality: "HD" }]
  }
];

export interface Anime {
  id: string;
  title: string;
  image: string;
  synopsis: string;
  type: string;
  status: string;
  episodes: number;
  genres: string[];
  rating: string;
  aired: string;
}

export interface Episode {
  id: string;
  title: string;
  number: number;
  image: string;
  sources: {
    url: string;
    quality: string;
  }[];
}

export async function fetchAnimeList(page = 1, limit = 20): Promise<{ data: Anime[], total: number }> {
  // For static site generation, return sample data
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' || process.env.NODE_ENV === 'production') {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = SAMPLE_ANIME.slice(startIndex, endIndex);
    return { data: paginatedData, total: SAMPLE_ANIME.length };
  }

  try {
    const response = await fetch(`${BASE_URL}/anime?page=${page}&limit=${limit}`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching anime list:', error);
    // Fallback to sample data if API fails
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = SAMPLE_ANIME.slice(startIndex, endIndex);
    return { data: paginatedData, total: SAMPLE_ANIME.length };
  }
}

export async function fetchAnimeDetails(id: string): Promise<Anime | null> {
  // For static site generation, return sample data
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' || process.env.NODE_ENV === 'production') {
    const anime = SAMPLE_ANIME.find(a => a.id === id);
    return anime || SAMPLE_ANIME[0];
  }

  try {
    const response = await fetch(`${BASE_URL}/anime/${id}`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching anime details for ID ${id}:`, error);
    // Fallback to sample data if API fails
    const anime = SAMPLE_ANIME.find(a => a.id === id);
    return anime || SAMPLE_ANIME[0];
  }
}

export async function fetchEpisodes(animeId: string): Promise<Episode[]> {
  // For static site generation, return sample data
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' || process.env.NODE_ENV === 'production') {
    return SAMPLE_EPISODES;
  }

  try {
    const response = await fetch(`${BASE_URL}/anime/${animeId}/episodes`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.episodes || [];
  } catch (error) {
    console.error(`Error fetching episodes for anime ID ${animeId}:`, error);
    // Fallback to sample data if API fails
    return SAMPLE_EPISODES;
  }
}

export async function searchAnime(query: string): Promise<Anime[]> {
  // For static site generation, return filtered sample data
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' || process.env.NODE_ENV === 'production') {
    const filteredAnime = SAMPLE_ANIME.filter(anime =>
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      anime.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
    );
    return filteredAnime;
  }

  try {
    const response = await fetch(`${BASE_URL}/anime/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error searching anime with query "${query}":`, error);
    // Fallback to sample data if API fails
    const filteredAnime = SAMPLE_ANIME.filter(anime =>
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      anime.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
    );
    return filteredAnime;
  }
}
