import { API_BASE_URL, API_OPTIONS,  } from "@/lib/utils"

export const GET = async () => {
  const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

  try {
    const response = await fetch(endpoint, API_OPTIONS)
    console.log(response);
    
    return Response.json(await response.json())
  } catch (error) {
    return Response.json({ error })
  }
}


const results = [
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
  {
    title: 'The first movies',
    vote_average: 56,
    release_date: '2025',
    original_language: 'en',
  },
]


// export const GET = async () => {
//   return Response.json({ results })
// }