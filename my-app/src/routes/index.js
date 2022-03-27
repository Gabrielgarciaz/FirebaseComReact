import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthGoogleContext } from "../contexts/authGoogle"

export const  PrivateRoutes = () => {
    const {signed} = useContext(AuthGoogleContext);
    return signed ? <Outlet/> : <Navigate to='/'/>; // SE o usuário estiver logado, os componentes filhos, terao acesso a autenticação
}