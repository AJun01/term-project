import WeatherInfo from "../WeatherInfo";


export default function Clear({ data }: { data: any }) {
  return (
    <div
      className="h-screen bg-cover bg-center text-white p-6"
    >
      <h2 className="text-3xl font-bold">Clear Skies</h2>
      <WeatherInfo data={data} />
    </div>
  )
}