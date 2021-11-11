import React from "react";

export default function CardSelection(props) {
  return (
    <div>
      <h1>Pokemon Seleccionado</h1>
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
      {/* <button>Borrar del equipo</button> */}
    </div>
  );
}
