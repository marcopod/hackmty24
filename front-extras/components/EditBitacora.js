"use client";

import { useState } from "react";

export default function EditBitacora({
  bitacora = {
    id: "123",
    name: "Bitacora 1",
    text: "texto de prueba",
    date: "12-10-2024",
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

  const changeDate = (e) => {
    let value = e.target.value;
    setBitacora((prev) => {
      return { ...prev, date: formatToDMY(value) };
    });
  };


  const formatToDMY = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatToYMD = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleSaveBitacora = async () => {
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/addData", {
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

      if (res.ok) {
        setResponseMessage(`Bitacora updated successfully: ${data.id}`);
      } else {
        setResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log("----", error);
      setResponseMessage("An error occurred while updating the bitacora.");
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
      <div className="d-flex justify-content-end">
        <input
          type="date"
          defaultValue={formatToYMD(Bitacora.date)}
          className="d-inline border-none bg-transparent border-0 mx-3"
          onChange={(e) => changeDate(e)}
        />
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
