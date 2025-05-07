const someData = [
  {
    title: "this si useless",
  },
  {
    title: "this is shit",
  },
  {
    title: "nothing",
  },
];

export const GET = () => {
  return Response.json(someData);
};

// TODO: Make this route PUT
export const PUT = async (req) => {
  const { title } = await req.json();

  const pbRes = await fetch(
    // `https://yts.mx/api/v2/list_movies.json?query_term=${encodeURIComponent(title)}`
    // 'https://thepiratebay.org/search/${encodeURIComponent(title)}/0/99/0'
    `https://apibay.org/q.php?q=${encodeURIComponent(title)}&cat=201`,
  );
  const data = await pbRes.json();
  // console.log(data);
  // data = data.data.movies[0]
  // console.log(data);
  
  return Response.json(data);
};

export const PATCH = async (req) => {
  const { title } = await req.json();

  const pbRes = await fetch(
    `https://yts.mx/api/v2/list_movies.json?query_term=${encodeURIComponent(title)}`
    // 'https://thepiratebay.org/search/${encodeURIComponent(title)}/0/99/0'
    // `https://apibay.org/q.php?q=${encodeURIComponent(title)}&cat=201`,
  );
  let data = await pbRes.json();
  console.log(data);
  // data = data.data.movies[0]
  // console.log(data);
  
  return Response.json(data);
};