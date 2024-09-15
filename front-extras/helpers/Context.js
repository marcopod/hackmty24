"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext()

const getContext = () =>{
    //let data = localStorage.getItem("user")
    return {}
}
export function AppWrapper({ children }) {
  const [data, setData] = useState({
    user: getContext()
  })

  return (
    <AppContext.Provider value={{data, setData}}>
        {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}