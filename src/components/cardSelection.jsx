import React from "react";
import { deletePokemonSelected } from "../redux/actions";
import { connect } from "react-redux";

export function CardSelection(props) {
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
      <button onClick={() => props.deletePokemonSelected(props.id)}>X</button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    deletePokemonSelected: (id) => dispatch(deletePokemonSelected(id)),
  };
}

export default connect(null, mapDispatchToProps)(CardSelection);
