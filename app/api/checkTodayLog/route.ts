// app/api/checkLog/route.js
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import moment from 'moment';

let client;
const uri = process.env.MONGODB_URI;

// Ensure the MONGODB_URI environment variable is set
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Function to get the MongoDB client
const getClient = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
};

// API Route - GET method
export async function GET() {
  try {
    // Get the MongoDB client and connect to the database
    const client = await getClient();
    const db = client.db('hackMty24'); // Replace with your actual database name
    const collection = db.collection('log'); // Replace with your collection name

    // Get today's date in the exact format stored in the database
    const today = moment().format('DD/MM/YYYY');
    console.log("Today's date (query):", today); // Log the date to check format

    // Find an entry in the collection with today's date
    const logEntry = await collection.findOne({ date: today });

    if (logEntry) {
            // If an entry is found, return it in the response
            return NextResponse.json({ success: true, message: 'Entry found for today', data: logEntry });
        } else {
            // If no entry is found, respond with a message indicating this
            return NextResponse.json({ success: false, message: 'No entry found for today' });
        }
    } catch (error) {
        // If there's an error, return it with a status code of 500
        return NextResponse.json({ success: false, error: 'Error checking log', details: error.message }, { status: 500 });
    }
}
