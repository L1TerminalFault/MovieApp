import Image from "next/image";

import star from "@/../public/star.svg";
import noPoster from "@/../public/no-movie.png";

export default function ({ movie }) {
  return (
    <div
      className={
        "px-3 mx-2 md:mx-6 p-3 rounded-xl bg-gray-900 text-white"
      }
    >
      <div className="flex items-center">
        <div className={"w-[35%] max-w-[400px]"}>
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : noPoster
            }
            alt=""
            width={500}
            height={500}
            className={"rounded-xl"}
          />
        </div>
        <div className="w-[65%]">
          <div className={"px-4 md:py-7 py-2"}>
            <div
              className={
                "md:text-xl text-base gap-2 items-center flex mb-1 font-bold"
              }
            >
              {movie.original_title}
              <span className="text-gray-500">•</span>

              <div className={"text-gray-500 text-xs md:text-sm"}>
                {movie.status}
              </div>
            </div>

            <div className="flex gap-2 items-center mb-1">
              <div className="mb-1 md:text-base text-sm text-gray-300">
                {movie.tagline ? `#${movie.tagline}` : 'No Tag'}
              </div>
              <span className="text-gray-500">•</span>
              <div className={`text-gray-400 py-1 text-xs md:text-base`}>
                {movie.popularity > 1500 ? "Trending Now" : movie.popularity > 800 ? "Hot Pick" : "Underrated"}
              </div>
            </div>

            <div className={"flex gap-2 flex-wrap"}>
              {movie.genres.map((eachGenre) => (
                <div
                  key={eachGenre.id}
                  className={
                    "rounded-full bg-gray-700 px-4 py-[2px] text-xs md:text-base text-white font-semibold flex items-center justify-center"
                  }
                >
                  {eachGenre.name}
                </div>
              ))}
            </div>

            <div className={"flex gap-1 items-center mt-2"}>
              <div className="flex flex-row gap-1 items-center">
                <Image src={star} alt="" className="size-[14px]" />
                <div>
                  {movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </div>
              </div>

              <span className="text-gray-500">•</span>
              <div className="text-[#83939f] capitalize font-medium">
                {movie.original_language}
              </div>
              <span className="text-gray-500">•</span>
              <div className="text-[#83939f]">
                {movie.release_date
                  ? movie.release_date.split("-")[0]
                  : "N/A"}
              </div>
            </div>

            <div className="flex gap-2 items-center md:text-base text-xs">
              {movie.revenue ? (
                <div className={`text-gray-300 flex items-center`}>
                  <div className="font-bold md:text-lg">$</div>
                  {movie.revenue / 100} - In
                </div>
              )
                : <div className="text-gray-500 text-sm">No revenue data</div>
              }

              <span className="text-gray-500">•</span>

              {movie.budget ? (
                <div className={`text-gray-400 py-1`}>
                  Budget ${movie.budget / 100}
                </div>
              ) : <div className="text-gray-500 text-sm">No budget data</div>
              }
            </div>

            <OverviewSection className="md:block hidden" movie={movie} />

          </div>
        </div>
      </div>

      <OverviewSection className="block md:hidden" movie={movie} />
    </div>
  )
}

const OverviewSection = ({ movie, className }) => (
  <div
    className={`${className} text-sm text-gray-400  mt-4 bg-gray-950 rounded-xl p-3`}
  >
    <div className="text-gray-100 font-bold mb-1">Overview</div>
    {movie.overview}

    <div className="mt-2">
      <div className="mb-1 text-white text-xs md:text-sm font-semibold">
        <div className="text-gray-200">Production</div>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        {movie.production_companies.map((eachCompany, index) => (
          <div key={eachCompany.id} className="flex gap-2">
            <div className="text-xs text-gray-400 font-normal">
              {eachCompany.name}
              {!(movie.production_companies.length === index + 1) ? (
                <span className="text-gray-500 ml-2">•</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
