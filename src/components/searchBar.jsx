import React, { useState } from "react";
import { connect } from "react-redux";
import { onSearch } from "../redux/actions";

export function SearchBar(props) {
  const [pokemon, setPokemon] = useState("");
  return (
    <div className="searchbar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSearch(pokemon);
        }}
      >
        <input
          type="text"
          placeholder="Pokemon..."
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
        />
        <input type="submit" value="Buscar" />
      </form>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (pokemon) => dispatch(onSearch(pokemon)),
  };
}

export default connect(null, mapDispatchToProps)(SearchBar);
