import mongoose from 'mongoose';

//schema: so far, stores data like :
// {"_id":{"$oid":"68052e47cf5fae0717f734c8"},
// "zip":"02472","countryCode":"US",
// "data":{
// "coord":{"lon":{"$numberDouble":"-71.1773"},
// "lat":{"$numberDouble":"42.37"}},
// "weather":[{"id":{"$numberInt":"803"},
// "main":"Clouds","description":"broken clouds","icon":"04d"}],
// "base":"stations","main":{"temp":{"$numberDouble":"288.75"},
// "feels_like":{"$numberDouble":"287.18"},
// "temp_min":{"$numberDouble":"287.55"},
// "temp_max":{"$numberDouble":"290.05"},
// "pressure":{"$numberInt":"1020"},
// "humidity":{"$numberInt":"31"},
// "sea_level":{"$numberInt":"1020"},
// "grnd_level":{"$numberInt":"1017"}},
// "visibility":{"$numberInt":"10000"},
// "wind":{"speed":{"$numberDouble":"10.29"},
// "deg":{"$numberInt":"320"},
// "gust":{"$numberDouble":"15.43"}},
// "clouds":{"all":{"$numberInt":"75"}},
// "dt":{"$numberInt":"1745169781"},
// "sys":{"type":{"$numberInt":"2"},
// "id":{"$numberInt":"2006202"},
// "country":"US",
// "sunrise":{"$numberInt":"1745142920"},
// "sunset":{"$numberInt":"1745191884"}},
// "timezone":{"$numberInt":"-14400"},
// "id":{"$numberInt":"0"},"name":"Watertown",
// "cod":{"$numberInt":"200"}},
// "fetchedAt":{"$date":{"$numberLong":
// "1745169991891"}},
// "__v":{"$numberInt":"0"}}
const weatherSchema = new mongoose.Schema({
  zip: String,
  countryCode: String,
  data: Object,
  fetchedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Weather || mongoose.model('Weather', weatherSchema);