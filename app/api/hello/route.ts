import { NextResponse } from 'next/server';

// Handle GET request
export async function GET(request) {
  return NextResponse.json({ message: "Hello from the GET request!" });
}

// Handle POST request
export async function POST(request) {
  const body = await request.json(); // Get the body of the request
  return NextResponse.json({ message: "Hello from the POST request!", data: body });
}

// You can also add PUT, DELETE, etc.
