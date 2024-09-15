'use client';
import Menu from "../front-extras/components/Menu";
import TopMenu from "../front-extras/components/TopMenu";
import Image from "next/image";

import { useState, useEffect } from 'react';

export default function Home() {
  const [getMessage, setGetMessage] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the GET API route
    const fetchGetMessage = async () => {
      try {
        const response = await fetch('/api/hello');
        const data = await response.json();
        setGetMessage(data.message);
      } catch (error) {
        console.error('Error fetching the GET message:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGetMessage();
  }, []);

  const handlePostRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'John Doe', age: 30 }), // Send data in POST request
      });
      const data = await response.json();
      setPostMessage(data.message + ': ' + JSON.stringify(data.data));
    } catch (error) {
      console.error('Error with the POST request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

    <TopMenu/>
      <h1>Handling Multiple API Requests Example</h1>

      {loading ? <p>Loading...</p> : <p>GET Message: {getMessage}</p>}

      <button onClick={handlePostRequest}>Send POST Request</button>
      {postMessage && <p>POST Message: {postMessage}</p>}
      
    <Menu/>
    </div>
    

  );
}
