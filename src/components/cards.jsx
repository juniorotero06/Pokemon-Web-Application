import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig.js";
import { onAuthStateChanged } from "@firebase/auth";
import Card from "./card.jsx";

export default function Cards() {
  React.useEffect(() => {
    function obtenerDatosTeam() {
      onAuthStateChanged(auth, async (userFirebase) => {
        const datosTeam = await getDocs(
          collection(db, "users", userFirebase.uid, "team")
        );
        datosTeam.forEach((documento) => {
          console.log(documento.data());
        });
      });
    }
    obtenerDatosTeam();
  }, []);
  return (
    <div>
      <h1>Team:</h1>
      {/* {pokemons.map((p) => (
        <Card key={p.id} name={p.name} types={p.types} img={p.img} id={p.id} />
      ))} */}
    </div>
  );
}
