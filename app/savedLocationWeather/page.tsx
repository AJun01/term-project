'use client'

import { useEffect, useState } from 'react'

export default function SavedLocationsWeatherPage() {
  const [locations, setLocations] = useState<{ zip: string; countryCode: string }[]>([])
  const [weatherData, setWeatherData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [zipInput, setZipInput] = useState('')
  const [countryInput, setCountryInput] = useState('')

  useEffect(() => {
    fetchAllLocationsAndWeather()
  }, [])

  async function fetchAllLocationsAndWeather() {
    try {
      setLoading(true)
      const res = await fetch('/api/save-route')
      const savedLocations = await res.json()
      setLocations(savedLocations)

      const weatherPromises = savedLocations.map(async (loc: { zip: string; countryCode: string }) => {
        const weatherRes = await fetch('/api/weather-route', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ zip: loc.zip, countryCode: loc.countryCode }),
        })
        const weather = await weatherRes.json()
        return weather
      })

      const weatherResults = await Promise.all(weatherPromises)
      setWeatherData(weatherResults)
    } catch (error) {
      console.error('Error fetching:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddLocation(e: React.FormEvent) {
    e.preventDefault()

    if (!zipInput || !countryInput) {
      alert('Please enter both ZIP code and Country Code.')
      return
    }

    try {
      await fetch('/api/save-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zip: zipInput, countryCode: countryInput.toUpperCase() }),
      })

      setZipInput('')
      setCountryInput('')
      fetchAllLocationsAndWeather()
    } catch (error) {
      console.error('Error adding location:', error)
    }
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-white">
        <p className="text-lg animate-pulse">Loading weather data...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-white px-6 py-10 pb-24">
      <h1 className="text-3xl font-bold text-center mb-6">Saved Locations Weather</h1>

      {/* Add New Location Form */}
      <form onSubmit={handleAddLocation} className="flex gap-4 mb-8 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="ZIP Code"
          className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          value={zipInput}
          onChange={(e) => setZipInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country Code (e.g., US)"
          className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
        >
          Add
        </button>
      </form>

      {/* Weather Cards */}
      <div className="space-y-6 max-w-2xl mx-auto">
        {weatherData.map((weather, index) => (
          <div key={index} className="rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-md border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h2>
            <p className="text-gray-300">Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
            <p className="text-gray-400">Condition: {weather.weather?.[0]?.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
