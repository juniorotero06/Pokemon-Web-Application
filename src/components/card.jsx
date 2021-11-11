import React from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { deletePokemon } from "../redux/actions";
import { connect } from "react-redux";

export function Card(props) {
  const user = auth.currentUser;
  const deletePokemon = async () => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "team", props.documentId));
      props.deletePokemon(props.id);
    } catch (error) {
      console.log("ya no hay usuario loggeado: ", error);
    }
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
      <button>Seleccionar Pokemon</button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    deletePokemon: (id) => dispatch(deletePokemon(id)),
  };
}

export default connect(null, mapDispatchToProps)(Card);
