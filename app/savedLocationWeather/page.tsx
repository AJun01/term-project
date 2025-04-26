'use client'

import { useState } from 'react'

const savedLocations = [
  {
    city: 'New York',
    country: 'US',
    temperature: '29°C',
    condition: 'Partly Cloudy',
    warning: 'Extreme heat warning',
  },
  {
    city: 'Toronto',
    country: 'CA',
    temperature: '21°C',
    condition: 'Scattered Showers',
  },
  {
    city: 'Tokyo',
    country: 'JP',
    temperature: '18°C',
    condition: 'Clear Skies',
  },
]

export default function SavedLocationsWeatherPage() {
  const [locations] = useState(savedLocations)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-white px-4 pt-8 pb-24">
      <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">Saved Locations</h1>

      <div className="space-y-4 max-w-xl mx-auto">
        {locations.map((loc, index) => (
          <div
            key={index}
            className="rounded-2xl p-5 shadow-lg bg-white/10 backdrop-blur-md border border-white/20"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{loc.city}, {loc.country}</h2>
                <p className="text-sm text-gray-300">{loc.condition}</p>
                {loc.warning && (
                  <div className="mt-2 text-yellow-300 text-xs font-medium">
                    ⚠️ {loc.warning}
                  </div>
                )}
              </div>
              <div className="text-4xl font-bold">{loc.temperature}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        title="Add Location"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 text-white text-3xl font-bold shadow-md flex items-center justify-center backdrop-blur"
      >
        +
      </button>
    </main>
  )
}
