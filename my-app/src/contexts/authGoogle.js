
import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../services/firebaseConfig'
import { Navigate } from "react-router-dom";
const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({})


export const AuthGoogleProvider = ({children }) => { //Vai receber um filho
    
    const auth = getAuth(app); // Credencial de acesso que vem de Services
    const [user, setUser] = useState(null); 

    //Utilizei o useEffect para pegar o token e o user do SessionStorage
    useEffect(() =>{ // Vai conferir se tem as informações do usuario, se não tiver logado, o fluxo segue comum
      const loadStoreAuth = () =>{
       const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
        const sessionUser= sessionStorage.getItem("@AuthFirebase:user");
        if(sessionToken && sessionUser){
          setUser(sessionUser);
        }
      }; 
      
    }, []);

    //Informações dadas pelo google
    const signInGoogle = () => {  
        signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          setUser(user)  
          sessionStorage.setItem("@AuthFirebase:token", token);
          sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
    });
  };   

  // Função de sair da conta, limpando o SessionStorage e levando o usuário para a página inicial com o Navigate
  function signOut(){
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/"/>
  }


  return(
    <AuthGoogleContext.Provider value={{signInGoogle, signed: !!user, user,  signInGoogle, signOut }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};