import Bitacora from "./Bitacora";

export default function Float({
    bitacora = {
        name: "Bitacora de prueba",
        text: "Solo tuve unas ideas",
        fecha: "2024-10-23",
        id: "1231"
    },
    close = ()=>{}
}){

    return <div className="
        fixed-top
        w-100
        h-100
        bg-dark
        p-5
        bg-opacity-10
    "
    >   
        <div className="p-4 bg-body rounded-4 shadow">
            <div className="d-flex justify-content-end">
                <div className="p-3" onClick={close}>
                    <i class="bi bi-x text-danger fs-2"></i>
                </div>
            </div>
            <Bitacora bitacora={bitacora}/>
        </div>
        
    </div>
}