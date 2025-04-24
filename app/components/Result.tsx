import Clear from './conditions/Clear'
import Clouds from './conditions/Clouds'
import Default from './conditions/Default'

export default function Result({ data }: { data: any }) {
  const condition = data.weather[0].description.toLowerCase()

  const conditionComponent = () => {
    if (condition.includes('clear')) return <Clear data={data} />
    if (condition.includes('clouds')) return <Clouds data={data} />
    return <Default data={data} />
  }

  return <>{conditionComponent()}</>
}