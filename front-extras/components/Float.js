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
        p-4 p-md-5
        bg-opacity-10
    "
    >   
        <div className="px-4 bg-body rounded-4 shadow h-100">
            <div className="d-flex justify-content-end">
                <div className="p-3" onClick={close}>
                    <i className="bi bi-x text-danger fs-2"></i>
                </div>
            </div>
            <Bitacora log={bitacora}/>
        </div>
        
    </div>
}