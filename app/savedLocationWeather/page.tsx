
// Author:Kavya Verma
// Displays all saved locations weather cards, 
// allows users to add and delete locations connected to MongoDB, 
// fetches live weather data using OpenWeatherMap API. 
// Built with TailwindCSS and mobile-first responsive design.

'use client'

import { useEffect, useState } from 'react'

export default function SavedLocationsWeatherPage() {
  // State variables for locations, weather data, input form, and loading state
  const [locations, setLocations] = useState<{ _id: string; zip: string; countryCode: string }[]>([])
  const [weatherData, setWeatherData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [zipInput, setZipInput] = useState('')
  const [countryInput, setCountryInput] = useState('')

  useEffect(() => {
    fetchAllLocationsAndWeather()
  }, [])

// Fetching all saved locations from the API and retrieves live weather data for each
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

  //Submits a new location to the API and reloads the page with new data
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
  //sends a delete request to remove a saved location from MongoDB and also updates the UI
  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this location?')) return;
  
    try {
      await fetch('/api/save-route', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
  
      // Refresh locations and weather data after delete
      fetchAllLocationsAndWeather();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  }
  //page layout
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

      {/* Yujun Liu: 
      to improve performance, we could upload the jpgs to cloud storage service like AWS S3, which reducing load times instead of save them in the server*/}

      {/* Weather Cards */}
      <div className="space-y-6 max-w-2xl mx-auto">
      {weatherData.map((weather, index) => {
        //here are the logic to get the background image based on the weather condition dynamically: Yujun Liu
        const main = weather.weather?.[0]?.main || 'Clear'
        const allowedWeather = ['Clear', 'Clouds', 'Mist', 'Rain', 'Snow', 'Windy'] as const
        const bg = allowedWeather.includes(main) ? `/Images/${main}.jpg` : '/Images/clear.jpg'
        
        //rendering cards for each saved location with its weather data
        return (
          <div
            key={index}
            className="relative rounded-2xl bg-contain bg-repeat p-6 text-white shadow-md border border-white/20"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <button
              onClick={() => handleDelete(locations[index]._id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xl"
              title="Delete Location"
            >
              Remove ✖
            </button>
            <h2 className="text-2xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h2>
            <p className="text-white">Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
            <p className="text-white">Condition: {weather.weather?.[0]?.description}</p>
          </div>
        )
      })}
        
      </div>
    </main>
  )
}
