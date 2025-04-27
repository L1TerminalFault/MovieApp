import Image from 'next/image'

import search from '@/../public/search.svg'

export default function ({ searchTerm, setSearchTerm }) {
  return (
    <div className='flex w-full items-center justify-center my-9 px-5'>
      <div className='flex w-full max-w-96 gap-2 justify-center items-center bg-[#070830] text-xs text-gray-300 px-4 py-1 rounded-full'>
        <Image
          src={search}
          alt=''
          className='size-4'
        />
        <input
          type="text"
          className='outline-none bg-transparent w-full max-w-96'
          placeholder='Search through thousands of movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}