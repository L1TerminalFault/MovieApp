import Image from "next/image";

import noMovie from "@/../public/no-movie.png";
import star from "@/../public/star.svg";

export default function ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) {
  return (
    <div className="p-5 rounded-2xl bg-[#101020] active:bg-gray-800 transition-all">
      <Image
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : noMovie
        }
        alt=""
        width={500}
        height={700}
        className="rounded-lg"
      />
      <div className="mt-4 px-1 text-white">
        <div className="text-xs font-bold">{title}</div>
        <div className="flex text-xs flex-row mt-2 gap-[5px] items-center">
          <div className="flex flex-row gap-1 items-center">
            <Image src={star} alt="" className="size-[14px]" />
            <div>{vote_average ? vote_average.toFixed(1) : "N/A"}</div>
          </div>
          <span className="text-gray-500">•</span>
          <div className="text-[#83939f] capitalize font-medium">
            {original_language}
          </div>
          <span className="text-gray-500">•</span>
          <div className="text-[#83939f]">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
