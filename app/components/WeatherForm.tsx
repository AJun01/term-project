'use client'

import { getWeather } from '../lib/weather-handle'
import { useState } from 'react'
import Result from './Result'

export default function WeatherForm() {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const zip = formData.get('zip')?.toString() || ''
    const countryCode = formData.get('countryCode')?.toString() || ''

    try {
      const result = await getWeather(zip, countryCode)
      setWeatherData(result)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setWeatherData(null)
    }
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit} id="weatherForm">
        <input type="text" name="zip" placeholder="ZIP Code" />
        <input type="text" name="countryCode" placeholder="Country Code" />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {weatherData && <Result data={weatherData} />}
    </div>
  )
}