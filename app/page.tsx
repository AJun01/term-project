'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const gifs = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWoyMnRjbzM4M3BlMGNsdzlxaWM1MGdzYjJxODVsNTVudHd0bXpndCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LbR0KKRuoNyXRf6aOi/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGRjdHF1aHA0ZThkYTVycnprZnB2Z3BoOW04cXVmaXdzbjRpMmN2bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2HekEhPmv9yn0qzont/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2ZlaGdhZTJjbGw1MTlvdjZqYnpubjVseGk5Nmh1MDFwaTl2bjhxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/leVIS7JfHPdO0deq0q/giphy.gif"
]

export default function Home() {
  const [currentGif, setCurrentGif] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGif((prev) => (prev + 1) % gifs.length)
    }, 1450) 
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
    <h1 className="text-6xl font-extrabold text-blue-700 mb-8 drop-shadow-md">Weather App</h1>


    <div className="mb-8">
        <img
          src={gifs[currentGif]}
          alt="Weather Animation"
          className="w-72 h-72 object-contain transition-all duration-500"
        />
      </div>

      <h1 className="text-6xl font-extrabold text-blue-700 mb-8 drop-shadow-md">W<span className='text-green-400'>e</span>l<span className='text-green-400'>co</span>me
      </h1>

      <div className="flex flex-col gap-4">
        <Link  href="/weather" className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition">
          Go to Weather Page
        </Link>

        <Link href="/savedLocationWeather" className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition">
          View Saved Locations
        </Link>
      </div>
    </div>

  )
}