"use client";

import { useState } from "react";

// Utility function to format a Date object or date string to DD-MM-YYYY
const formatToDMY = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function EditBitacora({
  bitacora = {
    name: "Bitacora 1",
    text: "texto de prueba",
    date: formatToDMY(new Date()), // Set the date to today's date in DD-MM-YYYY format
  },
}) {
  const [Bitacora, setBitacora] = useState(bitacora);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const changeName = (e) => {
    let value = e.target.value;
    setBitacora((prev) => {
      return { ...prev, name: value };
    });
  };

  const changeText = (e) => {
    let value = e.target.value;
    setBitacora((prev) => {
      return { ...prev, text: value };
    });
  };

  const handleSaveBitacora = async () => {
    setLoading(true);
    setResponseMessage("");

    try {
      // Obtener el content del formulario
      const content = Bitacora.text;

      // Solicitud pasando content a GPT
      const gptResponse = await fetch("/api/apiGpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }), // Pasar content en un objeto
      });

      if (!gptResponse.ok) {
        throw new Error("Error al obtener respuesta de GPT");
      }

      const gptData = await gptResponse.json();
      console.log("Respuesta GPT:", gptData);

      // Muestra la respuesta de GPT
      setResponseMessage(`Respuesta de GPT: ${gptData.message}`);

      // Ahora realizamos la segunda solicitud para guardar en la bitácora
      const res = await fetch("/api/createLog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Bitacora.name,
          date: Bitacora.date,
          content: Bitacora.text,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al guardar la bitácora");
      }

      const data = await res.json();
      console.log("Bitácora guardada con éxito", data);

      setResponseMessage(`La bitácora se actualizó correctamente`);
    } catch (error) {
      setResponseMessage("Ocurrió un error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5 p-3">
      <input
        type="text"
        className="bitacora-title form-control bg-transparent border-0 fs-1 fw-bold"
        defaultValue={Bitacora.name}
        onChange={(e) => changeName(e)}
      />

      <hr />
      {/* Mostrar la fecha pero no permitir cambiarla */}
      <div className="d-flex justify-content-end">
        <span className="d-inline mx-3">{Bitacora.date}</span>
      </div>

      <textarea
        defaultValue={Bitacora.text}
        className="vh-50 my-3 rounded-2 p-4 w-100 bg-body-tertiary border-0 rounded-4"
        onChange={(e) => changeText(e)}
      />

      <div className="w-100 d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={handleSaveBitacora}
          disabled={loading}
        >
          {loading ? "Saving..." : "Enviar"}
        </button>
      </div>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
