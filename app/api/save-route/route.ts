import clientPromise from '../../lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  const client = await clientPromise
  const db = client.db('savedWeather')
  const locations = await db.collection('locations').find().toArray()
  return NextResponse.json(locations)
}

export async function POST(req: Request) {
  const body = await req.json()
  const client = await clientPromise
  const db = client.db('savedWeather')
  const result = await db.collection('locations').insertOne(body)
  return NextResponse.json({ insertedId: result.insertedId })
}
