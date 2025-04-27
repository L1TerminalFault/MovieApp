import { updateSearchCount } from "@/lib/appwrite"

export const POST = async (req) => {
  const { query, movie } = await req.json()
  await updateSearchCount(query, movie)
  return Response.json({ success: true })
}