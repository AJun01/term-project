import { connectMongo } from './mongo-init';
import Weather from '../models/Weather';

//POST
export async function storeWeather(zip: string, countryCode: string, data: any) {
  try {
    await connectMongo();

    await Weather.create({ zip, countryCode, data });

    return { ok: true };
  } catch (err: any) {
    console.error('mongoose insert error:', err);
    return { ok: false, error: 'DB insert failed' };
  }
}

//READ
export async function getAllWeather() {
    try {
      await connectMongo();
      const data = await Weather.find().sort({ fetchedAt: -1 });
      return { ok: true, data };
    } catch (err: any) {
      console.error('read error:', err);
      return { ok: false, error: 'DB read failed' };
    }
  }

//Update
export async function updateWeatherById(id: string, newData: any) {
    try {
        await connectMongo();
        const updated = await Weather.findByIdAndUpdate(id, { data: newData }, { new: true });
        return { ok: true, data: updated };
    } catch (err: any) {
        console.error('update error:', err);
        return { ok: false, error: 'DB update failed' };
    }
}

//delete
export async function deleteWeatherById(id: string) {
    try {
      await connectMongo();
      await Weather.findByIdAndDelete(id);
      return { ok: true };
    } catch (err: any) {
      console.error('delete error:', err);
      return { ok: false, error: 'DB delete failed' };
    }
  }