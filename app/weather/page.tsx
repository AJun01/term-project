'use client'


import { getWeather } from '../lib/weather-handle'
import { useState } from 'react'
import Result from '../components/Result'

export default function WeatherPage() {

    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const zip = formData.get('zip')?.toString() || ''
      const countryCode = formData.get('countryCode')?.toString() || ''
  
      try {
        const weather = await getWeather(zip, countryCode)
        setResult(weather)
        setError(null)
      } catch (err: any) {
        setError(err.message)
        setResult(null)
      }
    }
  
    //added tailwind css: Yujun Liu
    return (
        <main className="max-w-lg mx-auto py-16 px-8 flex flex-col items-center bg-gray-900 rounded-xl mt-16">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            What's the weather like in your area?
          </h1>

          <p className="text-gray-500 mb-8 text-center">
            Enter your ZIP code and country to find out.
          </p>


          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              name="zip"
              type="text"
              placeholder="ZIP here!"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="countryCode"
              type="text"
              placeholder="Country Code here!"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition">
              Check Weather
            </button>
          </form>

          {error && <p className="text-red-500 mt-6">{error}</p>}

          {result && <div className="w-full mt-8"><Result data={result} /></div>}
        </main>
    )
}