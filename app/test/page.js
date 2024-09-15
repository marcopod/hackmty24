'use client';
import { useState } from 'react';

export default function AddDataPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [emotions, setEmotions] = useState([])
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
        body: JSON.stringify({ name, date, content, emotions }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage(`Data added successfully: ${data.id}`);
      } else {
        setResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log("----", error)
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
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddData} disabled={loading}>
        {loading ? 'Adding...' : 'Add Data'}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
