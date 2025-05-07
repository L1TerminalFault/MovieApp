"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import MoviesYTS from "@/components/MoviesYTS";
import MoviesTPB from "@/components/MoviesTPB";
import MovieDetails from "@/components/MovieDetails";
import Loading from "@/components/Loading";
import { useDataStore } from "@/lib/data";

export default function () {
  const { id } = useParams();
  const { data } = useDataStore();
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [torrentClient, setTorrentClient] = useState("TPB");
  const [torrentLoading, setTorrentLoading] = useState(true);

  //  const movie = data.find(
  //    (eachMovie) => eachMovie.original_title === decodeURIComponent(id),
  //  );

  const getTheMovie = async () => {
    setLoading(true);
    try {
      const response = await (
        await fetch("/api/fetchMovies", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })
      ).json();

      setMovie(response);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchThePirateBay = async () => {
    setTorrentLoading(true);

    try {
      const res = await (
        await fetch("/api/downloadMovies", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: movie.original_title }),
        })
      ).json();

      setMoviesList(res);
    } catch (err) {
      setError(true);
    } finally {
      setTorrentLoading(false);
    }
  };

  const fetchYTS = async () => {
    setTorrentLoading(true);

    try {
      const res = await (
        await fetch("/api/downloadMovies", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: movie.original_title }),
        })
      ).json();

      setMoviesList(res);
    } catch (err) {
      setError(true);
    } finally {
      setTorrentLoading(false);
    }
  };

  useEffect(() => {
    getTheMovie();
  }, []);

  useEffect(() => {
    if (movie) fetchThePirateBay();
  }, [movie]);

  useEffect(() => {
    if (movie) {
      if (torrentClient === "TPB") fetchThePirateBay();
      else if (torrentClient === "YTS") fetchYTS();
      else return;
    }
  }, [torrentClient, movie]);

  return (
    <div>
      {loading ? (
        <div className={"flex w-full h-screen items-center justify-center"}>
          <Loading />
        </div>
      ) : !error ? (
        <div>
          <div className="text-white text-3xl font-bold p-5 m-2 pl-6">
            Movie Details
          </div>

          <MovieDetails movie={movie} />

          <div className="flex flex-col">
            <div className="px-9 pt-9 pb-0 text-white text-lg font-bold">
              Available APIs
            </div>

            <div className="flex overflow-scroll ml-5 m-3 items-center gap-3">
              <div
                onClick={() => {
                  setTorrentLoading(true);
                  setTorrentClient("TPB");
                }}
                className={`rounded-full transition-all ${torrentClient === "TPB" ? "bg-gray-600" : "bg-gray-800"} active:bg-gray-600 py-1 px-5 text-lg text-white w-24 text-center`}
              >
                TPB
              </div>

              <div
                onClick={() => {
                  setTorrentLoading(true);
                  setTorrentClient("YTS");
                }}
                className={`rounded-full transition-all ${torrentClient === "YTS" ? "bg-gray-600" : "bg-gray-800"} active:bg-gray-600 py-1 px-5 text-lg text-white w-24 text-center`}
              >
                YTS
              </div>
            </div>

            {torrentClient === "TPB" ? (
              <MoviesTPB
                torrentClient={torrentClient}
                moviesList={moviesList}
                torrentLoading={torrentLoading}
              />
            ) : torrentClient === "YTS" ? (
              <MoviesYTS
                movie={movie}
                torrentClient={torrentClient}
                moviesList={moviesList}
                torrentLoading={torrentLoading}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="text-white text-lg text-center">Error</div>
      )}
    </div>
  );
}

// const genreMap = {
//   28: "Action",
//   12: "Adventure",
//   16: "Animation",
//   35: "Comedy",
//   80: "Crime",
//   99: "Documentary",
//   18: "Drama",
//   10751: "Family",
//   14: "Fantasy",
//   36: "History",
//   27: "Horror",
//   10402: "Music",
//   9648: "Mystery",
//   10749: "Romance",
//   878: "Science Fiction",
//   10770: "TV Movie",
//   53: "Thriller",
//   10752: "War",
//   37: "Western",
// };
