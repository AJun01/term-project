// Author: Kavya Verma
// Establishes MongoDB Atlas connection for saving and retrieving 
// saved location data. Used in /api/save-route API routes.

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const options = {}
let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI){
  throw new Error('Please add your Mongo URI to .env.local')
}
if (process.env.NODE_ENV === 'development') {
  //Reusing the client during development (cached connection) 
  //and making a new one in production.
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  //not using global in production to prevent memory leaks
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
