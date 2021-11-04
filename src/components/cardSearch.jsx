import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function CardSearch({ name, types, id, img, getTeams }) {
  const createTeamCollection = () => {
    onAuthStateChanged(auth, async (userFirebase) => {
      await addDoc(collection(db, "users", userFirebase.uid, "team"), {
        name: name,
        id: id,
        img: img,
        types: types,
      });
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
      <button onClick={createTeamCollection}>Agregar al equipo</button>
    </div>
  );
}
