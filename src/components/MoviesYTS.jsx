"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiDownload } from "react-icons/hi";

import Loading from "@/components/Loading";

export default function ({ movie, moviesList, torrentLoading, torrentClient }) {
  if (!torrentClient === "YTS") return;

  const [listOfMovies, setListOfMovies] = useState(null)


  useEffect(() => {
    if (!torrentLoading)
      setListOfMovies(moviesList?.data?.movies?.find(oneMovie => oneMovie.title === movie.original_title).torrents)
    console.log((moviesList));
    
    
  }, [moviesList, torrentLoading])

  

  return (
    <>
      <div className="text-white font-bold px-4 py-2 mb-1 ml-2">
        YTS Download Candidates
      </div>
      {torrentLoading ? (
        <div className="flex items-center justify-center h-72">
          <Loading />
        </div>
      ) : (
        <>
          {listOfMovies?.length ? (
            listOfMovies
              // .filter(eachMovie => eachMovie.name.includes((movie.release_date.split('-')[0])))
              // .filter(eachMovie => eachMovie.name.includes(movie.title.split(' ')[0]))
              .map((eachMovie) => (
                <Link
                  href={eachMovie.url}
                  key={eachMovie.url}
                  className={`px-4 py-1 rounded-full m-2 transition-all active:bg-gray-700 bg-gray-800 text-sm text-white`}
                >
                  <div>
                    <div className="flex items-center pb-2">
                      <div className="size-7 h-full flex items-center justify-center">
                        <HiDownload color="white" size={25} />
                      </div>

                      <div className="pl-3">
                        <div className="text-xs sm:text-base p-1 pb-1">
                          {movie.original_title}
                        </div>
                        <div className="flex text-xs sm:text-sm items-center gap-2 flex-wrap text-gray-400">
                          <div className="h-2">Peers {eachMovie.peers}</div>
                          <div className="text-gray-500 h-1">•</div>
                          <div className="h-2">
                            Size {eachMovie.size}
                          </div>
                          <span className="text-gray-500 h-2">•</span>
                          <div className="h-2">
                            Added at{" "}
                            {new Date(eachMovie.date_uploaded_unix * 1000).getFullYear()}
                          </div>
                          <span className="text-gray-500 h-2">•</span>

                          <div className="h-2">Codec {eachMovie.video_codec}</div>
                          <span className="text-gray-500 h-1">•</span>
                          <div className="h-2">
                            Quality {eachMovie.quality}
                          </div>
                        </div>

                      
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <div className="text-gray-400 text-lg flex h-52 items-center justify-center">
              No YTS Torrent Clients Found
            </div>
          )}
        </>
      )}
    </>
  );
}
