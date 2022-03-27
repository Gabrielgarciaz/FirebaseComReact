import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext} from "../../contexts/authGoogle"
 

export const Login = () => {
  const {signInGoogle, signed} = useContext(AuthGoogleContext);

  async function handleLoginFromGoogle(){
   await signInGoogle();
  }

  if(!signed){ // se não estiver logado
    return <button onClick={handleLoginFromGoogle}>Logar com o Google</button>
  } else{
    return <Navigate to="/home"/>
  }

  
    

       
}