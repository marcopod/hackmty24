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

export async function POST() {
  try {
    const client = await getClient();
    const db = client.db('hackMty24'); // Replace with your database name
    const collection = db.collection('log'); // Replace with your collection name

    // Data to be inserted
    const data = [
      {"_id": "0", "title": "13/09", "x": 10, "y": 10},
      {"_id": "1", "title": "14/09", "x": 10, "y": -10},
      {"_id": "2", "title": "15/09", "x": -10, "y": -10},
      {"_id": "3", "title": "16/09", "x": -10, "y": 10},
      {"_id": "4", "title": "17/09", "x": 20, "y": -10},
      {"_id": "5", "title": "18/09", "x": 15, "y": 15},
      {"_id": "6", "title": "19/09", "x": -15, "y": 15},
      {"_id": "7", "title": "20/09", "x": -15, "y": -15},
      {"_id": "8", "title": "21/09", "x": 15, "y": -15},
      {"_id": "9", "title": "22/09", "x": 30, "y": 10},
      {"_id": "10", "title": "23/09", "x": 25, "y": -20},
      {"_id": "11", "title": "24/09", "x": -20, "y": -25},
      {"_id": "12", "title": "25/09", "x": -25, "y": 20},
      {"_id": "13", "title": "26/09", "x": 5, "y": 25}
    ];

    // Insert the data
    const result = await collection.insertMany(data);

    return NextResponse.json({ message: 'Data inserted successfully', insertedCount: result.insertedCount }, { status: 200 });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Error inserting data' }, { status: 500 });
  }
}
