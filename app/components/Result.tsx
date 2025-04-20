import Clear from './conditions/Clear'
import Clouds from './conditions/Clouds'
import Default from './conditions/Clear'

import Windy from './conditions/Windy'
import Rain from './conditions/Rain'

export default function Result({ data }: { data: any }) {
  const condition = data.weather[0].description.toLowerCase()

  const conditionComponent = () => {
    if (condition.includes('clear')) return <Clear />
    if (condition.includes('clouds')) return <Clouds />
    //adding conditions from AJ
    if (condition.includes('wind')) return < Windy/>
    if (condition.includes('rain')) return < Rain />
    
    return <Default />
  }

  return (
    <div id="results" className="fade-in">
      <p>Weather in {data.name} ({data.sys.country}):</p>
      <p>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</p>
      <p>Condition: {data.weather[0].description}</p>
      {conditionComponent()}
    </div>
  )
}
