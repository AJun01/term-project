'use client'

import { getWeather } from '../lib/weather-handle'
import { useState } from 'react'

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
  
    return (
      <main className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Weather Lookup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="zip" type="text" placeholder="ZIP Code" className="w-full border p-2 rounded" />
          <input name="countryCode" type="text" placeholder="Country Code (e.g., US)" className="w-full border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Get Weather</button>
        </form>
  
        {error && <p className="text-red-500 mt-4">{error}</p>}
  
        {result && (
          <div className="mt-6 border p-4 rounded bg-gray-100">
            <h2 className="font-semibold text-lg">{result.name}</h2>
            <p>Temperature: {result.main.temp}°K</p>
            <p>Weather: {result.weather[0].description}</p>
          </div>
        )}
      </main>
    )
}