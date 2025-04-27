"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import hero from '@/../public/hero.png'
import Search from '@/components/Search';
import Loading from '@/components/Loading';
import MovieCard from '@/components/MovieCard';
import { API_BASE_URL } from '@/lib/utils';


const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGY5ZTQ2ZmY2ZGUyOWIwY2ZiMDVmNmRiNTIxMmE2ZCIsIm5iZiI6MTc0NTQwOTYxMC4yMTEsInN1YiI6IjY4MDhkNjRhYjJiNzIyYWVkZjhhMDU2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C64ltt_fO4Jl-QnZPQlVT-bul1uivWZFTzuun9VBUBY'

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [moviesList, setMoviesList] = useState([])
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('')

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query ) => {
    setLoading(true)
    setErrorMessage('')

    const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

    try {
      const response = await (await fetch(endpoint, API_OPTIONS)).json()
      setMoviesList(response.results)
    } catch (error) {
      setErrorMessage("Error: Couldn't Fetch Movies")
      setMoviesList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm)
  }, [debounceSearchTerm])

  return (
    <div className="bg-transparent">
      <div></div>
      <div className='bg-cover flex items-center justify-center flex-col bg-no-repeat bg-center bg-[url("../../public/hero-bg.png")]'>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={hero}
            alt=''
            className='px-8'
          />
          <div className=" text-center px-3 sm:max-w-[600px] max-w-80 sm:text-5xl text-4xl font-bold text-white">Find <span className=" bg-clip-text bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-transparent">Movies </span>You'll Enjoy Without the Hassle</div>
        </div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {loading
        ? (
          <div className='flex items-center justify-center p-9'>
            <Loading />
          </div>
        )
        : errorMessage
          ? (
            <div className='flex items-center justify-center text-xl text-red-500'>{errorMessage}</div>
          )
          : moviesList.length 
          ? (
            <div className='text-3xl flex items-center justify-center text-green-600'>
              <div className='max-w-7xl px-5 py-10 xs:py-8'>
                <div className='text-xl sm:pl-10 pl-6 text-gray-100 font-semibold'>All Movies</div>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {moviesList.map(eachMovie => (
                    <MovieCard key={eachMovie.id} movie={eachMovie} />
                  ))}
                </div>
              </div>
            </div>
          )
          : (
            <div className='text-white p-4 text-2xl text-center'>No Movies</div>
          )
      }
    </div>
  );
}
