import React from "react";
import { connect } from "react-redux";

export function CardSearch(props) {
  return (
    <div>
      <div>
        <h5>Name: {props.pokemon?.name}</h5>
        <div>
          <div>
            <p>
              Types: {props.pokemon?.types.map((type) => type.type.name + " ")}
            </p>
          </div>
          <div>
            <p>Id: {props.pokemon?.id}</p>
          </div>
          <div>
            <img src={props.pokemon?.img} width="80" height="80" alt="" />
          </div>
        </div>
      </div>
      <button onClick={props.createTeamCollection}>Agregar al equipo</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemonInfo,
  };
}

export default connect(mapStateToProps)(CardSearch);
