import React from "react";
import { connect } from "react-redux";
import Card from "./card.jsx";

export function Cards(props) {
  return (
    <div>
      <h1>Team:</h1>
      <div>
        {props.teams?.map((p) => (
          <Card
            key={p.id}
            name={p.name}
            types={p.types}
            img={p.img}
            id={p.id}
            documentId={p.documentId}
          />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    teams: state.pokemonTeam,
  };
}

export default connect(mapStateToProps)(Cards);
