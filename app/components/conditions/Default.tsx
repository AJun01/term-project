import WeatherInfo from "../WeatherInfo";


export default function Default({ data }: { data: any }) {
    return (
      <div
        className="h-screen bg-cover bg-center text-white p-6"
        style={{ backgroundImage: "url('/images/default.jpg')" }}
      >
        <h2 className="text-3xl font-bold">Weather Conditions</h2>
        <WeatherInfo data={data} />
      </div>
    )
  }