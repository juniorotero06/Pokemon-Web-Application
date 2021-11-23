import React from "react";
import { connect } from "react-redux";
//import CardComponent from "./card.jsx";
import ListGroupComponent from "./ListGroupComponent.jsx";

export function Cards(props) {
  return (
    <div className="row justify-content-start mb-3 px-md-5">
      <div className="col-12 text-center my-3">
        <span className="h1">Team:</span>
      </div>
      {props.teams?.map((p) => (
        <div key={p.id}>
          <ListGroupComponent
            name={p.name}
            types={p.types}
            img={p.img}
            id={p.id}
            selected={p.selected}
            documentId={p.documentId}
          />
        </div>
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    teams: state.pokemonTeam,
  };
}

export default connect(mapStateToProps)(Cards);
