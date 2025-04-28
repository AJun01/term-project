"use client";

import WeatherDetails from "./WeatherDetails";
import WeatherAdvice from "./WeatherAdvice";

export default function WeatherInfo({ data }: { data: any }) {
  const tempC = data.main.temp - 273.15;
  const desc = data.weather[0].description;

  return (
    <>
      <WeatherDetails data={data} />
      <WeatherAdvice tempC={tempC} condition={desc} />
    </>
  );
}