'use client';

import EditBitacora from "../front-extras/components/EditBitacora";
import Bitacora from "../front-extras/components/Bitacora";
import Menu from "../front-extras/components/Menu";
import TopMenu from "../front-extras/components/TopMenu";
import Image from "next/image";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';


export default withPageAuthRequired( function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the last 3 logs on component mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/getLogs'); // Call the API route
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched logs:", data); // Log the fetched logs
          setLogs(data);
        } else {
          console.error("Failed to fetch logs");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <TopMenu />

      <EditBitacora />

      {loading ? (
        <p>Loading...</p>
      ) : (
        logs.map((log, index) => (
          <Bitacora key={index} log={log} />
        ))
      )}

      <Menu />
    </div>
  );
})
