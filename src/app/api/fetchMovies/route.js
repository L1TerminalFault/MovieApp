import { API_BASE_URL, API_OPTIONS } from "@/lib/utils";

// TODO: Make this route handler put
export const PUT = async (req) => {
  const { query, page } = await req.json();
  // console.log(query)
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  try {
    const response = await (await fetch(endpoint, API_OPTIONS)).json();
    console.log(response);
    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "error" });
  }
};

// TODO: Making this route handler patch
export const PATCH = async (req) => {
  const { id } = await req.json();
  const endpoint = `${API_BASE_URL}/movie/${id}`;
  console.log(endpoint);
  try {
    const response = await (await fetch(endpoint, API_OPTIONS)).json();
    console.log("response", response);
    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "error" });
  }
};

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

export const PUTbak = async () => {
  return Response.json({ results });
};

const oneResult = {
  adult: false,
  status: "Released",
  budget: 4000000,
  revenue: 5000000,
  popularity: 789.9898,
  tagline: "this is the tagline",
  production_companies: [
    { name: "Microsoft" },
    { name: "Facebook" },
    { name: "SomeBullshit" },
  ],
  genres: [
    { name: "Action" },
    { name: "Adventure" },
    { name: "Science Fiction" },
    { name: "Fight" },
  ],

  origin_country: ["US", "EN"],
  backdrop_path: "/hmMnCqNnHPvQhuxynSVAqQWmQVK.jpg",
  genre_ids: [{ name: "Action" }, { name: "Adventure" }],
  id: 346685,
  original_language: "en",
  original_title: "The Girl on the Train",
  overview:
    "Rachel Watson, devastated by her recent divorce, spends her daily commute fantasizing about the seemingly perfect couple who live in a house that her train passes every day, until one morning she sees something shocking happen there and becomes entangled in the mystery that unfolds.",
  popularity: 100.792,
  poster_path: null,
  release_date: "2016-10-05",
  title: "The Girl on the Train",
  video: false,
  vote_average: 6.442,
  vote_count: 5776,
};

export const POST = () => {
  return Response.json(oneResult);
};

// TODO: remove this route
// export const GET = async () => {
//   const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

//   try {
//     const response = await fetch(endpoint, API_OPTIONS);
//     console.log(response);

//     return Response.json(await response.json());
//   } catch (error) {
//     return Response.json({ error });
//   }
// }
