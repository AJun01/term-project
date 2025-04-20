import { connectMongo } from './mongo-init';
import Weather from '../models/Weather';

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