import React from "react";
import { getTeams } from "../redux/actions";
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
    pokemon: state.pokemonInfo,
    teams: state.pokemonTeam,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTeams: () => dispatch(getTeams()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
