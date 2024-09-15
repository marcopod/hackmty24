import OpenAI from "openai";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

dotenv.config();

let client;
const uri = process.env['MONGODB_URI'];

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const getClient = async () => {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
    }
    return client;
};

export async function POST(request) {
    try {
      // Obtener el body de la solicitud (que contiene el 'inputContent')
      const { content: inputContent } = await request.json();
  
      if (!inputContent) {
        return NextResponse.json({ error: "El contenido es requerido" }, { status: 400 });
      }
  
      const client = await getClient();
      console.log("MongoDB conectado");
  
      const database = client.db('hackMty24'); // Base de datos desde donde obtendremos el content
      const collection = database.collection('log');  // Cambia 'log' si tienes otra colección
  
      // Aquí, 'dbContent' será el 'inputContent' pasado por el cliente
      const dbContent = inputContent;
  
      const OpenAIClient = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'], // Asegúrate de tener tu clave API en .env
      });

        const emociones = {
            desesperacion: {
                Y: "1",
                X: "1"
            },
            deprimido: {
                Y: "2",
                X: "2"
            },
            solitario: {
                Y: "3",
                X: "3"
            },
            triste: {
                Y: "4",
                X: "4"
            },
            apatico: {
                Y: "5",
                X: "5"
            },
            enfurecido: {
                Y: "10",
                X: "1"
            },
            furioso: {
                Y: "9",
                X: "2"
            },
            enojado: {
                Y: "8",
                X: "3"
            },
            irritado: {
                Y: "7",
                X: "4"
            },
            molesto: {
                Y: "6",
                X: "5"
            },
            complacido: {
                Y: "6",
                X: "6"
            },
            feliz: {
                Y: "7",
                X: "7"
            },
            entusiasmado: {
                Y: "8",
                X: "8"
            },
            inspirado: {
                Y: "9",
                X: "9"
            },
            extático: {
                Y: "10",
                X: "10"
            },
            a_gusto: {
                Y: "5",
                X: "6"
            },
            seguro: {
                Y: "4",
                X: "7"
            },
            descansado: {
                Y: "3",
                X: "8"
            },
            confortable: {
                Y: "2",
                X: "9"
            },
            sereno: {
                Y: "1",
                X: "10"
            }
        };

        const formato = {
            "emocion": "",
            "Energy": "",
            "Agradable": ""
        };

        // Usa el contenido recuperado de la base de datos en lugar del texto fijo
        const content = `Basado en el siguiente diccionario:\n\n${JSON.stringify(emociones, null, 2)}\n ¿Con qué emociones clasificarías el siguiente texto en una sola emoción?: \n ${dbContent} \n Entrega la respuesta en el siguiente formato \n ${JSON.stringify(formato, null, 2)}`;

        const chatCompletion = await OpenAIClient.chat.completions.create({
            model: "chatgpt-4-latest",
            messages: [{
                role: "system",
                content: content
            }]
        });

        const messageContent = chatCompletion.choices[0].message.content;
        console.log("Respuesta:", messageContent);

        // Guardar la nueva respuesta en MongoDB
        const date = new Date().toISOString(); // Fecha actual
        const result = await collection.insertOne({ content: messageContent, date });

        console.log("Datos guardados en MongoDB con ID:", result.insertedId);

        return NextResponse.json({message: messageContent });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        if (client) await client.close();
    }
};

Chat().catch(console.error);
