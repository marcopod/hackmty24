import { useUser } from "@auth0/nextjs-auth0/client";

export default function UsuarioInfo({elementRef}){
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message} "Asdad</div>
    return <div 
            className=' z-3 p-3 shadow rounded-4 position-absolute top-100 end-0 bg-body d-flex flex-column align-items-center'
            ref={elementRef}
        >
        <img src={user?.picture} alt={user?.name} className="rounded-circle my-3" />
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <button onClick={() => {
            window.localStorage.clear()
            window.location.href = "/api/auth/logout" 
            }}
            className='btn btn-danger py-1 '
        > 
            Cerrar sesión
        </button>
    </div>
}