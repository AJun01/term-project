import WeatherInfo from "../WeatherInfo";

export default function Snow({ data }: { data: any }) {
    return (
      <div
        className="h-screen bg-cover bg-center text-white p-6"
        style={{ backgroundImage: "url('/images/snow.jpg')" }}
      >
        <h2 className="text-3xl font-bold">Snow</h2>
        <WeatherInfo data={data} />
      </div>
    )
  }