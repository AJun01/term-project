/*
Daryl Young
I know typically we are suppose to separate the components into different files, but I put them in the same file to make it easier to read and understand due to issues I was having earlier 
*/

interface WeatherDetailsProps {
  // I used the WeatherDetailsProps interface to define the structure of the data prop that the WeatherDetails component expects.
    data: {
      name: string;
      sys: { country: string };
      main: { temp: number };
      weather: { description: string }[];
    };
  }
  
  export default function WeatherDetails({ data }: WeatherDetailsProps) {
    const tempC = (data.main.temp - 273.15).toFixed(2);
  // I used the toFixed method to round the temperature to 2 decimal places for better readability.
  // I used the data object to display the weather data in a readable format.
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