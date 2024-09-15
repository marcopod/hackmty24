"use client"
export default function Registro({
    bitacora = {
        name:"asas",
        id:"1",
        date:"2024-20-10",
        resumen: "Hayahayasha"
    },
    onClick = ()=> {}
}){
    return <div 
        className="rounded-4 
        bg-body-tertiary
        col-12 
        col-md-10
        col-xl-8
        my-4
        p-4
        d-flex
        justify-content-between"
        onClick={onClick}
    >
        <div>
            <div className="fw-bold">{bitacora.name}</div>
            <div>{bitacora.resumen}</div>
        </div>
        <div>
            {bitacora.date}
        </div>
    </div>
}