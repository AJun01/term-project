/*
Daryl Young
This file is use to get grab the weather data from the lib libe file after the form is submitted the correct way

*/


'use client'

import { getWeather } from '../lib/weather-handle'
import { useState } from 'react'
import Result from './Result'

export default function WeatherForm() {
  // I used the useState hook to manage the state of the weather data and error messages. 
  const [weatherData, setWeatherData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // I used the FormData to grab the data from forms easier
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const zip = formData.get('zip')?.toString() || ''
    const countryCode = formData.get('countryCode')?.toString() || ''

    try {
      const result = await getWeather(zip, countryCode)
      // I used the setWeatherData to set the weather data and setError to set the error message if there is one.
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
      // I used the weatherData to display the weather data if it is available.
      {weatherData && <Result data={weatherData} />}
    </div>
  )
}