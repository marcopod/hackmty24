import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

let client = null;
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

// Export a named function for the GET method
export async function POST(request) {

  try {
    const data = await request.json();

    const client = await getClient();
    const db = client.db('hackMty24'); // Replace with your database name
    const collection = db.collection('log'); // Replace with your collection name

    // Find the last document with the same id and date
    const log = await collection.findOne({ user: data.id, date: data.date });

    return NextResponse.json(log, { status: 200 });
  } 
  catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Error fetching logs' }, { status: 500 });
  }
}
