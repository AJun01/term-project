export async function getWeather(zip: string, countryCode: string) {
  try {
    const res = await fetch('/api/weather-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ zip, countryCode }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}