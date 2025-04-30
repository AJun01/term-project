/*
Daryl Young
I use DRY to make sure I wasn't use redundant code and to make it easier to read and understand so weatherInfo is a part of all condition components.

*/


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