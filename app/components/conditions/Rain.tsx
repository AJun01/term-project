import WeatherInfo from "../WeatherInfo";

export default function Rain({ data }: { data: any }) {
    return (
      <div
        className="min-h-screen bg-cover bg-center text-white p-6"
      >
        <h2 className="text-3xl font-bold">Rain</h2>
        <WeatherInfo data={data} />
      </div>
    )
  }