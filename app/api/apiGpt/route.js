// app/api/apiGpt/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que tu API Key esté en tu archivo .env.local
});

export async function POST(request) {
  try {
    const { content } = await request.json();

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

    const mensaje = `Basado en el siguiente diccionario:\n\n${JSON.stringify(emociones, null, 2)}\n ¿Con qué emociones clasificarías el siguiente texto en una sola emoción?: \n ${content} \n Entrega la respuesta en el siguiente formato \n ${JSON.stringify(formato, null, 2)}`;

    console.log(mensaje)

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", 
        content: mensaje 
      }]
    });

    const messageContent = response.choices[0].message.content;

    try {
      const parsedResponse = JSON.parse(messageContent);
      console.log(messageContent);
      return NextResponse.json({ message: parsedResponse });
    } catch (error) {
      console.log("Error");
      return NextResponse.json({});
    }

  } catch (error) {
    return NextResponse.json({ error: 'Error with GPT request' }, { status: 500 });
  }
}
