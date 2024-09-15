"use client";

import { analyzeBitacora, saveBitacora } from "../helpers/API";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";

// Utility function to format a Date object or date string to DD-MM-YYYY
const formatToDMY = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


export default function EditBitacora({bitacora}) {

  const { user, error, isLoading } = useUser()
  const [Bitacora, setBitacora] = useState(bitacora);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isExistingEntry, setIsExistingEntry] = useState(false); // Flag to check if it's an update

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/checkTodayLog');
        if (response.ok) {
          const data = await response.json();

          if (data && data.data) {
            setBitacora({
              id: data.data._id, // Ensure the ID is set for updates
              title: data.data.title || "Untitled",
              content: data.data.content || "",
              date: "15/09/2024",
            });
            setBitacora((prev) => {
              return { ...prev, title: data.data.title };
            });
            setBitacora((prev) => {
              return { ...prev, content: data.data.content };
            });
            setIsExistingEntry(true); // Flag to indicate an existing entry
          }
        } else {
          console.log("No existing log for today.");
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, []);


  // Handle the Bitacora title change
  const changeName = (e) => {
    let value = e.target.value;
    setBitacora((prev) => {
      return { ...prev, title: value };
    });
  };

  // Handle the Bitacora text change
  const changeText = (e) => {
    let value = e.target.value;
    setBitacora((prev) => {
      return { ...prev, content: value };
    });
  };

  // const handleSaveBitacora = async () => {
  //   setLoading(true);
  //   setResponseMessage("");

  //   try {
  //     let emociones = await analyzeBitacora(Bitacora, user);

  //     if (isExistingEntry) {
  //       // Call the update function if it's an existing entry
  //       await handleUpdateBitacora();
  //     } else {
  //       // Create a new entry
  //       let save = await saveBitacora(Bitacora, user);
  //       setResponseMessage("La bitácora se creó correctamente.");
  //     }
  //   } catch (error) {
  //     setResponseMessage("Ocurrió un error guardando la bitácora.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSaveBitacora = async () => {
    setLoading(true);
    setResponseMessage("");
  
    try {
      // Create a new entry by sending a POST request with Bitacora data
      const response = await fetch("/api/createLog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: Bitacora.title,
          date: "15/09/2024",
          content: Bitacora.content,
        }),
        
      });
      
  
      if (response.ok) {
        const result = await response.json();
        setResponseMessage("La bitácora se creó correctamente.");
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setResponseMessage("Ocurrió un error guardando la bitácora.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpdateBitacora = async () => {
    setLoading(true);
    setResponseMessage("");

    try {
      // Create the PATCH request to update the existing Bitacora
      const response = await fetch('/api/updateLog', {
        method: 'PATCH', // Use PATCH method for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Bitacora.id, // Ensure you're sending the ID
          content: Bitacora.content, // Send the updated content
        }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response

        setResponseMessage("La bitácora se actualizó correctamente.");
        console.log("Update successful:", data);
      } else {
        setResponseMessage("No se encontró la bitácora para actualizar.");
        console.error("Update failed:", await response.json());
      }
    } catch (error) {
      setResponseMessage("Ocurrió un error actualizando la bitácora.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-2 mb-5 p-3">
      <input
        type="text"
        placeholder="Comienza a escribir tu historia..."
        className="bitacora-title form-control bg-transparent border-0 fs-1 fw-bold"
        defaultValue={Bitacora?.title}
        onChange={(e) => changeName(e)}

      />

      <hr />
      {/* Display the date, but don't allow changing it */}
      <div className="d-flex justify-content-end">
        <span className="d-inline mx-3">{formatToDMY(new Date())}</span>
      </div>

      <textarea
        defaultValue={Bitacora?.content}
        placeholder="¿Cómo estuvo tu día?"
        className="vh-50 my-3 rounded-2 p-4 w-100 bg-body-tertiary border-0 rounded-4"
        onChange={(e) => changeText(e)}
      />

      <div className="w-100 d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={handleSaveBitacora}
          disabled={loading}
        >
          {loading ? "Saving..." : isExistingEntry ? "Editar Bitácora" : "Guardar Bitácora"}
        </button>
      </div>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
