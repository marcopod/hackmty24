// app/api/updateLog/route.js
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

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

export async function PATCH(request) {
  try {
    // Parse the request body to get the id and new content
    const { id, content } = await request.json();

    if (!id || !content) {
      return NextResponse.json({ error: 'Missing required fields: id and content' }, { status: 400 });
    }

    // Ensure the ID is valid
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const client = await getClient();
    const db = client.db('hackMty24'); // Replace with your database name
    const collection = db.collection('log'); // Replace with your collection name

    // Update the log entry by its ID, only modifying the 'content' field
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { content: content } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'No log entry found with the provided ID' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating content', details: error.message }, { status: 500 });
  }
}
