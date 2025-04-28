import WeatherInfo from "../WeatherInfo";


export default function Mist({ data }: { data: any }) {
    return (
      <div
        className="h-screen bg-cover bg-center text-white p-6"
        style={{ backgroundImage: "url('/images/mist.jpg')" }}
      >
        <h2 className="text-3xl font-bold">Misty</h2>
        <WeatherInfo data={data} />
      </div>
    )
  }