"use client";

import { useEffect, useState } from "react";
import Menu from "../../front-extras/components/Menu";
import TopMenu from "../../front-extras/components/TopMenu";
import { getPreferredTheme } from "../../front-extras/helpers/Theme";

export default function Analisis() {
    const [Theme, setTheme] = useState(null)
    const fetchLogs = async () => {
        try {
          const response = await fetch('/api/getLogs'); // Update with your actual API route
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          console.log('Logs:', data); // Console log the result
        } catch (error) {
          console.error('Failed to fetch logs:', error);
        }
      }; 
    useEffect(
        () => {
            fetchLogs()
            setTheme(getPreferredTheme())
        }
    )
    
    return <>
        <TopMenu/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {
                Theme != null  && 
                <iframe 
                    src={`https://appgraph-fp8hj5wlmf7mje4qfkwkja.streamlit.app/?embed=true&theme=ligth`} // Usar la variable theme en la URL${theme}
                    style={{ width: '100%', height: '100%', border: 'none' }}>
                </iframe>
            }
            
        </div>
        <Menu/>
    </>
}