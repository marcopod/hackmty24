"use client"
export default function Registro({
    bitacora = {
        title:"asas",
        id:"1",
        date:"2024-20-10",
        content: "Hayahayasha"
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
        <div className="col-9">
            <div className="fw-bold">{bitacora.title}</div>
            <div className="w-100 t-overflow-e w-100">{bitacora.content}</div>
        </div>
        <div>
            {bitacora.date}
        </div>
    </div>
}