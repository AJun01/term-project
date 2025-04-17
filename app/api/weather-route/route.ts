"use server";
import { NextRequest, NextResponse } from 'next/server';

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
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${apiKey}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'API error');

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
};