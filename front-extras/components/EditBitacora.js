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

      const data = await res.json();

      setResponseMessage(`La bitácora se actualizó correctamente`);
    } catch (error) {
      setResponseMessage("Ocurrió un error actualizando la bitacora.");
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
      {/* Display the date, but don't allow changing it */}
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
