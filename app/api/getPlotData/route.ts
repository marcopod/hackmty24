import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

let client;
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const getClient = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
};


// GET method: Retrieve all logs from the collection
export async function GET() {
  try {
    const client = await getClient();
    const db = client.db('hackMty24'); // Replace with your database name
    const collection = db.collection('log'); // Replace with your collection name

    // Retrieve all documents from the log collection
    //const logs = await collection.find({}).toArray();
    const logs = await collection.find({ x: { $exists: true } }).toArray();

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving data' }, { status: 500 });
  }
}
