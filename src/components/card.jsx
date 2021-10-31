import React from "react";

export default function CardSearch({ name, types, id, img }) {
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
      <button>Borrar del equipo</button>
    </div>
  );
}
