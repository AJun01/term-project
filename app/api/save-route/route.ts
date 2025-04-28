import clientPromise from '../../lib/mongodb'
import { NextResponse } from 'next/server'
import {ObjectId} from 'mongodb'

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

export async function DELETE(req: Request){
  const {id} = await req.json();
  if(!id){
    return NextResponse.json({message: "Missing Location ID"}, {status:400});
  }
  try{
    const client=await clientPromise;
    const db = client.db('savedWeather');
    const result= await db.collection('locations').deleteOne({_id: new ObjectId(id)});

    if(result.deletedCount === 0){
      return NextResponse.json({message:"Location Not Found"},{status:404});
    }
    return NextResponse.json({message: "Location deleted successfully"});
  }
  catch(error){
    console.error(error);
    return NextResponse.json({message: "Error deleting location"},{status:500});
  }
}