'use client';
import { useState } from 'react';

export default function AddDataPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleAddData = async () => {
    setLoading(true);
    setResponseMessage('');

    try {
      const res = await fetch('/api/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage(`Data added successfully: ${data.id}`);
      } else {
        setResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setResponseMessage('An error occurred while adding data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Data to MongoDB</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddData} disabled={loading}>
        {loading ? 'Adding...' : 'Add Data'}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
