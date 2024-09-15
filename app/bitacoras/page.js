"use client";

import Registro from "../../front-extras/components/Registro";
import Menu from "../../front-extras/components/Menu";
import TopMenu from "../../front-extras/components/TopMenu";
import { useState } from "react";
import Float from "../../front-extras/components/Float";

export default function Bitacoras (){
    const [Selected, setSelected] = useState()

    const set = () =>{
        setSelected({
            name:"asas",
            id:"1",
            date:"2024-20-10",
            resumen: "Hayahayasha"
        })
    }
    const list = [1,2,3,4,5,6,7,8,9,10]
   return <>
    {
        (Selected!= null) && <Float bitacora={Selected} close={()=>setSelected(null)}/>
    }
    <TopMenu/>
    <h1>Bitacoras pasadas</h1>

    {list.map((e,i) =>
        <Registro key={i} onClick={set}/>
    )}
    
   <Menu/>
   </> 
}