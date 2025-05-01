"use server";
import { NextRequest, NextResponse } from 'next/server';

/*
Yujun Liu
weather API route that takes zip and countryCode as input and returns the weather data for that location using openweathermap API
*/
const apiKey = process.env.OPENWEATHER_API_KEY;
console.log("Weather API route loaded");
export async function POST(req: NextRequest) {
  const { zip, countryCode } = await req.json();

  if (!zip || !countryCode) {
    return NextResponse.json(
      { message: 'Missing zip or countryCode' },
      { status: 400 }
    );
  }

  try {
    // we need to get the lat and lon from api first : Yujun Liu
    const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${apiKey}`  
    const geoRes = await fetch(geoUrl)  
    if (!geoRes.ok)  
      return NextResponse.json({ message: 'geo not found' }, { status: geoRes.status })  
    const { lat, lon } = await geoRes.json()  
  
    // and use it with the weather api because that is the current working one: Yujun Liu
    const weatherUrl =  
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`  
    const res = await fetch(weatherUrl)  
    const data = await res.json()  
    if (!res.ok) throw new Error(data.message || 'weather api error')  
  
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    )
  }
};