import Link from "next/link";
import { HiDownload } from "react-icons/hi";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

const categories = {
  101: "Audio > Music",
  102: "Audio > Audio books",
  103: "Audio > Sound clips",
  104: "Audio > FLAC",
  199: "Audio > Other",

  201: "Video > Movies",
  202: "Video > Movies DVDR",
  203: "Video > Music videos",
  204: "Video > Movie clips",
  205: "Video > TV shows",
  206: "Video > Handheld",
  207: "Video > HD Movies",
  208: "Video > HD TV shows",
  209: "Video > 3D",
  299: "Video > Other",

  301: "Applications > Windows",
  302: "Applications > Mac",
  303: "Applications > UNIX",
  304: "Applications > Handheld",
  305: "Applications > iOS (iPad/iPhone)",
  306: "Applications > Android",
  399: "Applications > Other OS",

  401: "Games > PC",
  402: "Games > Mac",
  403: "Games > PSx",
  404: "Games > XBOX360",
  405: "Games > Wii",
  406: "Games > Handheld",
  407: "Games > iOS (iPad/iPhone)",
  408: "Games > Android",
  499: "Games > Other",

//  501: "Porn > Movies",
//  502: "Porn > Games",
//  599: "Porn > Other",

  601: "Other > E-books",
  602: "Other > Comics",
  603: "Other > Pictures",
  604: "Other > Covers",
  605: "Other > Physibles",
  699: "Other > Other",
};

export default function ({ data, torrentLoading, torrentClient }) {
  if (!torrentClient === "TPB") return;

  const [moviesList, setMoviesList] = useState(null)
  useEffect(() => {
    if (!torrentLoading && data)
      setMoviesList(data)
  }, [data, torrentLoading])

  return (
    <>
      <div className="text-white font-bold px-4 py-2 mb-1 ml-2">
        TPB Download Candidates
      </div>
      {torrentLoading || !moviesList ? (
        <div className="flex items-center justify-center h-[300px]">
          <Loading />
        </div>
      ) : (
        <>
          {moviesList.length ? (
            moviesList
              // .filter(eachMovie => eachMovie.name.includes((movie.release_date.split('-')[0])))
              // .filter(eachMovie => eachMovie.name.includes(movie.title.split(' ')[0]))
              .map((eachMovie) => (
                <Link
                  href={`magnet:?xt=urn:btih:${eachMovie.info_hash}&dn=${encodeURIComponent(eachMovie.name)}`}
                  key={eachMovie.id}
                  className={`px-4 py-2 rounded-full m-2 transition-all active:bg-gray-700 bg-gray-800 text-sm text-white`}
                >
                  <div>
                    <div className="flex items-center pb-2">
                      <div className="size-7 h-full flex items-center justify-center">
                        <HiDownload color="white" size={25} />
                      </div>

                      <div className="pl-3">
                        <div className="text-xs sm:text-base p-1 pb-1">
                          {eachMovie.name}
                        </div>
                        <div className="flex text-xs sm:text-sm items-center gap-2 flex-wrap text-gray-400">
                          <div className="h-2">Seeders {eachMovie.seeders}</div>
                          <div className="text-gray-500 h-1">•</div>
                          <div className="h-2">
                            Username {eachMovie.username}
                          </div>
                          <span className="text-gray-500 h-2">•</span>
                          <div className="h-2">
                            Added at{" "}
                            {new Date(eachMovie.added * 1000).getFullYear()}
                          </div>
                          <span className="text-gray-500 h-2">•</span>

                          <div className="h-2">Status {eachMovie.status}</div>
                          <span className="text-gray-500 h-1">•</span>
                          <div className="h-2">
                            Category {categories[parseInt(eachMovie.category)]}
                          </div>
                        </div>

                        {/**

                          id: '23883285',
                          name: 'JOHN WICK (2014) 360P X264 - YTS ARABIC مترجم',
                          info_hash: 'CB8BA4F65D0CF1D8E5DEE9DB8CDA6E3F1230AD79',
                          leechers: '0',
                          seeders: '1',                                                                                                                                              num_files: '3',                                                                                                                                            size: '3709419',
                          username: 'YTSARABIC',
                          added: '1533400034',
                          status: 'member',
                          category: '201',
                          imdb: 'tt2911666'
                        */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <div className="text-gray-400 text-lg flex h-[300px] justify-center pt-16">
              No TBP Torrent Clients Found
            </div>
          )}
        </>
      )}
    </>
  );
}
