export default function Clouds({ data }: { data: any }) {
  return (
    <div
      className="h-screen bg-cover bg-center text-white p-6"
      style={{ backgroundImage: "url('/images/clouds.jpg')" }}
    >
      <h2 className="text-3xl font-bold">Cloudy Skies</h2>
      <p>Weather in {data.name} ({data.sys.country}):</p>
      <p>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</p>
      <p>Condition: {data.weather[0].description}</p>
    </div>
  )
}