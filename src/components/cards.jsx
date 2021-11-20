import React from "react";
import { connect } from "react-redux";
//import CardComponent from "./card.jsx";
import ListGroupComponent from "./ListGroupComponent.jsx";

export function Cards(props) {
  return (
    <div className="container-fluid w-50">
      <h1>Team:</h1>
      <div className="row justify-content-start mb-3">
        {props.teams?.map((p) => (
          <div key={p.id}>
            <ListGroupComponent
              name={p.name}
              types={p.types}
              img={p.img}
              id={p.id}
              documentId={p.documentId}
            />
          </div>
        ))}
      </div>
      {/* <div className="row">
        {props.teams?.map((p) => (
          <div className="col mb-5" key={p.id}>
            <CardComponent
              name={p.name}
              types={p.types}
              img={p.img}
              id={p.id}
              documentId={p.documentId}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    teams: state.pokemonTeam,
  };
}

export default connect(mapStateToProps)(Cards);
