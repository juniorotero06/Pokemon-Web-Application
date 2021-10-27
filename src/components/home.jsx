import { signOut } from "@firebase/auth";
import React from "react";
import { auth } from "../firebase/firebaseConfig";

export default function Home() {
  const cerrarSesion = () => {
    signOut(auth);
  };
  return (
    <div>
      <p>Este es el home de la app</p>
      <button onClick={cerrarSesion}>Cerrar Sesion</button>
    </div>
  );
}
