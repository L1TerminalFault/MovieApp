"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import hero from "@/../public/hero.png";
import logo from "@/../public/logo.png";
import Search from "@/components/Search";
import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import noPoster from "@/../public/no-movie.png";
import { useDataStore } from "@/lib/data";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [moviesList, setMoviesList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const { setData } = useDataStore();

  useDebounce(() => setDebounceSearchTerm(searchTerm), 800, [searchTerm]);

  const loadTrendingMovies = async () => {
    try {
      const movies = await (await fetch("/api/trendingMovies")).json();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  const fetchMovies = async (query) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await (
        await fetch("/api/fetchMovies", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, page }),
        })
      ).json();

      if (response.message === "error") {
        // alert(response.message);
        throw new Error();
      }

      setMaxPage(response.total_pages);
      setMoviesList(response.results || []);
      // setData(response.results);

      if (query && response.results.length)
        await fetch("/api/postSearch", {
          method: "POST",
          body: JSON.stringify({ query, movie: response.results[0] }),
        });
    } catch (error) {
      // alert(error);
      setErrorMessage("Error: Couldn't Fetch Movies");
      setMoviesList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm, page]);

  return (
    <div className="bg-transparent">
      <div className='bg-cover flex items-center justify-center flex-col bg-no-repeat bg-center bg-[url("../../public/hero-bg.png")]'>
        <div className="flex flex-col items-center justify-center">
          {/* <div className='flex items-center justify-center'> */}
          <Image src={logo} alt="" className="pt-9 translate-y-6" />
          {/* </div> */}
          <Image src={hero} alt="" className="px-8" />
          <div className=" text-center px-3 sm:max-w-[600px] max-w-80 sm:text-5xl text-4xl font-bold text-white">
            Find{" "}
            <span className=" bg-clip-text bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-transparent">
              Movies{" "}
            </span>
            You'll Enjoy Without the Hassle
          </div>
        </div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {loading ? (
        <div className="flex items-center justify-center p-9">
          <Loading />
        </div>
      ) : errorMessage ? (
        <div className="flex items-center justify-center text-xl text-red-500">
          {errorMessage}
        </div>
      ) : moviesList.length ? (
        <div className="text-3xl flex items-center justify-center">
          <div className="max-w-7xl px-5 py-10 xs:py-8">
            {trendingMovies?.length && !debounceSearchTerm ? (
              <div className="mb-3 mx-4">
                <div className="text-nowrap text-xl sm:pl-5 pl-2 text-gray-100 font-semibold">
                  Trending Movies
                </div>
                
                  {!trendingMovies.length ? (
                    <div>No Trending Movies</div>
                  ) : (
                    <div className="flex gap-3 mt-3 h-52 w-[calc(100vw-70px)] max-w-7xl justify-evenly overflow-x-scroll">

                      {trendingMovies.map((movie, index) => (
                      <Link
                      href={`/movies/${movie.movie_id}`}
                      key={movie.$id}
                      className="flex active:bg-gray-800 transition-all rounded-2xl flex-row gap-5 w-full"
                    >
                      <div className="flex relative pt-12 pb-2 items-center flex-row w-40 h-44 rounded-xl">
                        <div className="fancy-text text-9xl">{index + 1}</div>
                        <div className="absolute translate-x-16">
                          <Image
                            loading="lazy"
                            src={
                              !movie.poster_url ||
                              movie.poster_url ===
                              "https://image.tmdb.org/t/p/w500null"
                                ? noPoster
                                : movie.poster_url
                            }
                            alt=""
                            width={127}
                            height={163}
                            className="w-[127px] z-30 h-[163px] rounded-lg object-cover -ml-3.5"
                          />
                        </div>
                      </div>
                    </Link>
                    ))}
                    </div>
                  
                  )}
                </div>
          
            ) : null}

            <div className="text-xl sm:pl-10 pl-6 text-gray-100 font-semibold">
              {debounceSearchTerm ? "Search Results" : "All Movies"}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {moviesList.map((eachMovie) => (
                <Link
                  key={eachMovie.id}
                  href={`/movies/${encodeURIComponent(eachMovie.id)}`}
                >
                  <MovieCard movie={eachMovie} />
                </Link>
              ))}
            </div>

            <div className="flex gap-3 justify-center items-center p-1 mt-3">
              <div
                onClick={() => setPage((prev) => (prev === 1 ? prev : --prev))}
                className={`text-white rounded-full transition-app p-2 ${page === 1 ? "bg-gray-900" : " hover:bg-gray-700 bg-gray-800"}`}
              >
                <IoIosArrowBack color="white" size={40} />
              </div>
              <div className="text-white text-lg">Page {page}</div>
              <div
                // handle the maximum page that can be surfed
                onClick={() =>
                  setPage((prev) => (maxPage === page ? prev : ++prev))
                }
                className={`text-white rounded-full ${page === maxPage ? "bg-gray-900" : "hover:bg-gray-700 bg-gray-800"} transition-app p-2`}
              >
                <IoIosArrowForward size={40} color="white" />
              </div>
            </div>
            {/* <div onClick={() => setPage(prev => ++prev)} className='bg bg-purple-900 text-xl text-white font-bold p-3 flex items-center justify-center'>Next {page}</div> */}
          </div>
        </div>
      ) : (
        <div className="text-white p-4 text-2xl text-center">No Movies</div>
      )}
    </div>
  );
}
