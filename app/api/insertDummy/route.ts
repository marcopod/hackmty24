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
      {"_id": "0", "title": "Aprendí una nueva librería de JavaScript", "x": 10, "y": -10, "content": "Hoy comencé a aprender una nueva librería de JavaScript, bastante interesante. Me siento motivado a seguir aprendiendo.", "date": "31/08/2024"},
      {"_id": "1", "title": "Reencuentro con un viejo amigo", "x": -10, "y": -10, "content": "Salí a caminar y me encontré con un amigo del colegio. Me alegró mucho verlo, aunque fue un poco extraño después de tantos años.", "date": "01/09/2024"},
      {"_id": "3", "title": "Progreso en mi proyecto", "x": -10, "y": 10, "content": "Pasé la tarde trabajando en mi proyecto personal. Aunque tuve algunos obstáculos, me siento satisfecho con el progreso que he logrado.", "date": "02/09/2024"},
      {"_id": "4", "title": "Discusión en la reunión del equipo", "x": 20, "y": -10, "content": "Tuve una reunión con el equipo de trabajo. Surgió una discusión acalorada sobre las prioridades, lo que me dejó frustrado. Sin embargo, logramos llegar a un acuerdo.", "date": "03/09/2024"},
      {"_id": "5", "title": "Éxito cocinando un nuevo plato", "x": 15, "y": 15, "content": "Hoy cociné un nuevo plato y fue un éxito. Esto me hizo sentir bastante feliz, especialmente porque había tenido una semana difícil.", "date": "04/09/2024"},
      {"_id": "6", "title": "Organización de mi espacio", "x": -15, "y": 15, "content": "Me dediqué a organizar mi espacio de trabajo, pero terminé sintiéndome abrumado por la cantidad de cosas acumuladas. Aun así, logré dejarlo más cómodo.", "date": "05/09/2024"},
      {"_id": "7", "title": "Reflexión sobre mis hábitos", "x": -15, "y": -15, "content": "Leí un libro sobre productividad que me hizo reflexionar sobre mis malos hábitos. Me sentí un poco frustrado por no haber mejorado antes, pero estoy decidido a cambiar.", "date": "06/09/2024"},
      {"_id": "8", "title": "Tiempo de calidad con la familia", "x": 15, "y": -15, "content": "Pasé el día con la familia, lo que me hizo sentir muy bien. Aunque algunas conversaciones fueron tensas, en general fue un buen día.", "date": "07/09/2024"},
      {"_id": "9", "title": "Disfruté una película en el cine", "x": 30, "y": 10, "content": "Hoy fui al cine a ver una película que esperaba desde hace tiempo. Me encantó, pero al final del día me sentí algo solo.", "date": "08/09/2024"},
      {"_id": "10", "title": "Día tranquilo, pero algo solitario", "x": 25, "y": -20, "content": "Tuve un día tranquilo en casa, avanzando en mi curso de programación, pero sentí una profunda soledad. A veces extraño más interacción con otros.", "date": "09/09/2024"},
      {"_id": "11", "title": "Conferencia online, pero con estrés", "x": -20, "y": -25, "content": "Hoy asistí a una conferencia online sobre tecnología. Aprendí mucho, pero el estrés de los proyectos en curso me dejó agotado.", "date": "10/09/2024"},
      {"_id": "12", "title": "Hice ejercicio, me siento renovado", "x": -25, "y": 20, "content": "Hice ejercicio después de un tiempo sin hacerlo. Me siento renovado físicamente, aunque emocionalmente sigo algo decaído por problemas personales.", "date": "11/09/2024"},
      {"_id": "13", "title": "Día de investigación sobre desarrollo web", "x": 5, "y": 25, "content": "Pasé parte del día investigando sobre nuevas tendencias en desarrollo web. Aunque aprendí mucho, siento una presión constante de no estar al día.", "date": "12/09/2024"},
      {"_id": "14", "title": "Conversación inspiradora", "x": 10, "y": -10, "content": "Tuve una conversación muy interesante con un colega sobre inteligencia artificial. Me dejó inspirado y con ganas de profundizar más en el tema.", "date": "13/09/2024"},
      {"_id": "15", "title": "Organizando mis metas", "x": -10, "y": -10, "content": "Dediqué parte del día a organizar mis próximas metas a corto y largo plazo. Fue un proceso productivo, aunque también me sentí abrumado por la cantidad de cosas que quiero lograr.", "date": "14/09/2024"},
      {"_id": "16", "title": "Terminé mi primer hackathon", "x": 10, "y": 10, "content": "Hoy acabé mi primer hackathón! Estoy muy felix por haber tenido esta experiencia", "date": "15/09/2024"},
    ];
    // Insert the data
    const result = await collection.insertMany(data);

    return NextResponse.json({ message: 'Data inserted successfully', insertedCount: result.insertedCount }, { status: 200 });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Error inserting data' }, { status: 500 });
  }
}
