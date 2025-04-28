import WeatherInfo from "../WeatherInfo";

export default function Clouds({ data }: { data: any }) {
  return (
    <div
      className="h-screen bg-cover bg-center text-white p-6"
      style={{ backgroundImage: "url('/images/clouds.jpg')" }}
    >
      <h2 className="text-3xl font-bold">Cloudy Skies</h2>
      <WeatherInfo data={data} />
    </div>
  )
}