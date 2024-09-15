import OpenAI from "openai";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

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

const Chat = async () => {
    try {
        const client = await getClient();
        console.log("MongoDB conectado");

        const database = client.db('hackMty24'); // Base de datos desde donde obtendremos el content
        const collection = database.collection('log');  // Cambia 'log' si tienes otra colección

        // Recuperar el content de la base de datos
        const logEntry = await collection.findOne({}, { sort: { date: -1 } }); // Recupera el último contenido insertado, ajusta la consulta según lo que necesites
        const dbContent = logEntry ? logEntry.content : "No hay contenido disponible"; // Validamos si hay contenido

        const OpenAIClient = new OpenAI({
            apiKey: process.env['OPENAP_API_KEY']
        });

        const emociones = {
            desesperacion: {
                Energy: "1",
                Agradable: "1"
            },
            deprimido: {
                Energy: "2",
                Agradable: "2"
            },
            solitario: {
                Energy: "3",
                Agradable: "3"
            },
            triste: {
                Energy: "4",
                Agradable: "4"
            },
            apatico: {
                Energy: "5",
                Agradable: "5"
            },
            enfurecido: {
                Energy: "10",
                Agradable: "1"
            },
            furioso: {
                Energy: "9",
                Agradable: "2"
            },
            enojado: {
                Energy: "8",
                Agradable: "3"
            },
            irritado: {
                Energy: "7",
                Agradable: "4"
            },
            molesto: {
                Energy: "6",
                Agradable: "5"
            },
            complacido: {
                Energy: "6",
                Agradable: "6"
            },
            feliz: {
                Energy: "7",
                Agradable: "7"
            },
            entusiasmado: {
                Energy: "8",
                Agradable: "8"
            },
            inspirado: {
                Energy: "9",
                Agradable: "9"
            },
            extático: {
                Energy: "10",
                Agradable: "10"
            },
            a_gusto: {
                Energy: "5",
                Agradable: "6"
            },
            seguro: {
                Energy: "4",
                Agradable: "7"
            },
            descansado: {
                Energy: "3",
                Agradable: "8"
            },
            confortable: {
                Energy: "2",
                Agradable: "9"
            },
            sereno: {
                Energy: "1",
                Agradable: "10"
            }
        };

        const formato = {
            "emocion": "",
            "Energy": "",
            "Agradable": ""
        };

        // Usa el contenido recuperado de la base de datos en lugar del texto fijo
        const content = `Basado en el siguiente diccionario:\n\n${JSON.stringify(emociones, null, 2)}\n ¿Con qué emociones clasificarías el siguiente texto?: \n ${dbContent} \n Entrega la respuesta en el siguiente formato \n ${JSON.stringify(formato, null, 2)}`;

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

    } catch (error) {
        console.error("Error:", error);
    } finally {
        if (client) await client.close();
    }
};

Chat().catch(console.error);
