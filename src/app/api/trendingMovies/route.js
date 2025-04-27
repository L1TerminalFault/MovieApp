import { updateSearchCount, getTrendingMovies } from "@/lib/appwrite"

export const GET = async () => {
  const res = await getTrendingMovies()
  return Response.json(res)
}