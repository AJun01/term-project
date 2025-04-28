interface WeatherDetailsProps {
    data: {
      name: string;
      sys: { country: string };
      main: { temp: number };
      weather: { description: string }[];
    };
  }
  
  export default function WeatherDetails({ data }: WeatherDetailsProps) {
    const tempC = (data.main.temp - 273.15).toFixed(2);
  
    return (
      <div className="space-y-1">
        <p>
          Weather in {data.name} ({data.sys.country})
        </p>
        <p>Temperature: {tempC}°C</p>
        <p>Condition: {data.weather[0].description}</p>
      </div>
    );
  }