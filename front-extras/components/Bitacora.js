"use client"

import { useState } from "react"

export default function Bitacora ({
    bitacora = {
        id: "123",
        name: "Bitacora 1",
        text: "texto de prueba",
        fecha: "",
    }
}) {

    const [Bitacora, setBitacora] = useState(bitacora)

    const changeName = (e) =>{
        let value = e.target.value 
        setBitacora((prev) => {
            prev.name = value
            return prev
        })
    }
    const changeText = (e) =>{
        let value = e.target.value
        setBitacora((prev) => {
            prev.text = value
            return prev
        })
    }

    const action = () =>{

    }
    return <div className="
 
        mb-5
        p-3
    ">
        
        <input 
            type="text"
            className="bitacora-title form-control bg-transparent border-0 fs-1 fw-bold "
            defaultValue={Bitacora.name}
            onChange={(e)=>changeName(e)}
            disabled
        />
        
        <hr/> 
       <div className="d-flex justify-content-end">
            <input type="date" className=" d-inline  border-none bg-transparent border-0  mx-3"
                disabled/>
        </div>

        <textarea 
            defaultValue={Bitacora.text} 
            className=" vh-50 my-3 rounded-2 p-4 w-100 bg-body-tertiary border-0  
            rounded-4 
            "
            disabled
            onChange={(e) => changeText(e)}/>
        
       

    </div>
}