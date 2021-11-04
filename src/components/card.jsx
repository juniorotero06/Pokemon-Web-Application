import React from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

export default function Card({ name, types, id, img, documentId }) {
  const deletePokemon = async () => {
    onAuthStateChanged(auth, async (userFirebase) => {
      await deleteDoc(
        doc(db, "users", userFirebase.uid, "team", documentId)
      ).then();
    });
  };
  return (
    <div>
      <div>
        <h5>Name: {name}</h5>
        <div>
          <div>
            <p>Types: {types.map((type) => type.type.name + " ")}</p>
          </div>
          <div>
            <p>Id: {id}</p>
          </div>
          <div>
            <img src={img} width="80" height="80" alt="" />
          </div>
        </div>
      </div>
      <button onClick={deletePokemon}>Borrar del equipo</button>
    </div>
  );
}
