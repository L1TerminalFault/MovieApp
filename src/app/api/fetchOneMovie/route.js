import { API_BASE_URL, API_OPTIONS } from "@/lib/utils";

export const PUT = async (req) => {
  const { id } = await req.json();
  const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent("john")}&page=${1}`;
  console.log(endpoint);
  console.log("it is not working");
  try {
    const response = await (await fetch(endpoint, API_OPTIONS)).json();
    console.log("response", response);
    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "error" });
  }
};
