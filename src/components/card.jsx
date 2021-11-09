import React from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

export default function Card(props) {
  const deletePokemon = async () => {
    onAuthStateChanged(auth, async (userFirebase) => {
      await deleteDoc(
        doc(db, "users", userFirebase.uid, "team", props.documentId)
      );
    });
  };
  return (
    <div>
      <div>
        <h5>Name: {props.name}</h5>
        <div>
          <div>
            <p>Types: {props.types.map((type) => type.type.name + " ")}</p>
          </div>
          <div>
            <p>Id: {props.id}</p>
          </div>
          <div>
            <img src={props.img} width="80" height="80" alt="" />
          </div>
        </div>
      </div>
      <button onClick={deletePokemon}>Borrar del equipo</button>
    </div>
  );
}
