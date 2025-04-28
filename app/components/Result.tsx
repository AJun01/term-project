import Clear from './conditions/Clear'
import Clouds from './conditions/Clouds'
import Snow from './conditions/Snow'
import Mist from './conditions/Mist'

import Default from './conditions/Default'

export default function Result({ data }: { data: any }) {
  const condition = data.weather[0].description.toLowerCase()

  const conditionComponent = () => {
    if (condition.includes('clear')) return <Clear data={data} />
    if (condition.includes('clouds')) return <Clouds data={data} />
    if (condition.includes('snow')) return <Snow data={data}/>
    if (condition.includes('mist')) return <Mist data={data}/>
    return <Default data={data} />
  }

  return <>{conditionComponent()}</>
}