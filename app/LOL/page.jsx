"use client"
import { useState } from 'react';

const LogPage = () => {
  const [message, setMessage] = useState('');

  const handleAddLogs = async () => {
    try {
      const response = await fetch('/api/insertDummy', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: Inserted ${data.insertedCount} logs`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Log Data Insertion</h1>
      <button onClick={handleAddLogs}>Add Logs to Database</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LogPage;
