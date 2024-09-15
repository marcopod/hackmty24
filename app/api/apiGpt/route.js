// app/api/apiGpt/route.js
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que tu API Key esté en tu archivo .env.local
});

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
  try {
    const content = await request.json();
    //Data
    // .user = id del usuario
    // .date = fecha del documento
    // .content = contenido del documento

    console.log("IDDDDDDDDDDDDDDDD", content.user)

    if (!content) {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 });
    }

    const emociones = [
      "desesperacion",
      "deprimido",
      "solitario",
      "triste",
      "apatico",
      "enfurecido",
      "furioso",
      "enojado",
      "irritado",
      "molesto",
      "complacido",
      "feliz",
      "entusiasmado",
      "inspirado",
      "extático",
      "a_gusto",
      "seguro",
      "descansado",
      "confortable",
      "sereno"
    ];


    const formato = {
      "emocion": ""
  };

    const mensaje = `Basado en el siguiente diccionario:\n\n${JSON.stringify(emociones, null, 2)}\n ¿Con qué emociones clasificarías el siguiente texto en una sola emoción?: \n ${content.content} \n Entrega la respuesta en el siguiente formato \n ${JSON.stringify(formato, null, 2)}`;

    console.log(mensaje)

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", 
        content: mensaje 
      }]
    });

    const messageContent = response.choices[0].message.content;

    try {
      // Procedimiento para insertar un nuevo registro de emociones
      // console.log("PROBANDO")
      // console.log("1")
      const client = await getClient(); //Llamamos API Mongo
      // console.log("2")
      const db = client.db('hackMty24'); // Seleccionamos DB
      // console.log("3")
      const collection = db.collection('log'); // Select collection
      // console.log("4")
      const parsedResponse = JSON.parse(messageContent);
      // console.log(parsedResponse)
      // console.log("5")
      const result = await collection.insertOne(
        {
          user: content.user,
          date: content.date,
          emociones: parsedResponse
        }
      );

      return NextResponse.json({ message: parsedResponse, insertedId: result.insertedId });
    } 
    catch (error) 
    {
      // En caso que no se hayan generado emociones o el prompt regresara algo invalido 
      // no se guarda el registro de las emociones
      console.log("Error");
      return NextResponse.json({});
    }

  } catch (error) {
    return NextResponse.json({ error: 'Error with GPT request' }, { status: 500 });
  }
}
