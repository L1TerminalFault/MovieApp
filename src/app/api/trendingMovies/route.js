import { updateSearchCount, getTrendingMovies } from "@/lib/appwrite"

// Make this route get
export const GET = async () => {
  const res = await getTrendingMovies()
  return Response.json(res)
}


const results = [
  {
    title: "The first movies",
    vote_average: 56,
    release_date: "2025",
    original_language: "en",
  },
  {
    title: "The first movies",
    vote_average: 56,
    release_date: "2025",
    original_language: "en",
  },
  {
    title: "The first movies",
    vote_average: 56,
    release_date: "2025",
    original_language: "en",
  },
  {
    title: "The first movies",
    vote_average: 56,
    release_date: "2025",
    original_language: "en",
  },
  {
    title: "The first movies",
    vote_average: 56,
    release_date: "2025",
    original_language: "en",
  },
];

export const GETbak = () => {
  return Response.json(results)
}