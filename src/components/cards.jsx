import React from "react";

import Card from "./card.jsx";

export default function Cards(props) {
  return (
    <div>
      <h1>Team:</h1>
      <div>
        {props.teams.map((p) => (
          <Card
            key={p.id}
            name={p.name}
            types={p.types}
            img={p.img}
            id={p.id}
          />
        ))}
      </div>
    </div>
  );
}
