

import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";

export const Home = () => {
  const { user, signOut } = useContext(AuthGoogleContext); // Dados que vêm do AuthGoogleContext em contexts
 
  return (
    <div>
      <h1>Bem vindo: {user.displayName}</h1>
      <button onClick={() => signOut()}>sair</button>
    </div>
  );
};
