// app/api/addData/route.js
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

export async function POST(request) {
  const { name, date, content} = await request.json();

  if (!name || !date || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const client = await getClient();
    const db = client.db('hackMty24'); // Replace with your database name
    const collection = db.collection('log'); // Replace with your collection name

    const result = await collection.insertOne({ name, date, content });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Error adding data' }, { status: 500 });
  }
}