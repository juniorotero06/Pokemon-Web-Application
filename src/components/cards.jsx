import React from "react";
import Card from "./card.jsx";

export default function Cards({ pokemons }) {
  return (
    <div>
      {pokemons.map((p) => (
        <Card key={p.id} name={p.name} types={p.types} img={p.img} id={p.id} />
      ))}
    </div>
  );
}
