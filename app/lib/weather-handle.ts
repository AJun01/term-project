export async function getWeather(zip: string, countryCode: string) {
    const res = await fetch('http://localhost:3000/api/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zip, countryCode }),
      cache: 'no-store',
    })
  
    if (!res.ok) throw new Error('Failed to fetch weather')
    return res.json()
  }
  