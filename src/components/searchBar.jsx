import React, { useState } from "react";
import { connect } from "react-redux";
import { onSearch } from "../redux/actions";
import { Button, Form, FormControl } from "react-bootstrap";

export function SearchBar(props) {
  const [pokemon, setPokemon] = useState("");
  return (
    <div>
      <Form
        className="d-flex"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSearch(pokemon);
        }}
      >
        <FormControl
          type="search"
          className="me-2"
          aria-label="Search"
          placeholder="Pokemon..."
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (pokemon) => dispatch(onSearch(pokemon)),
  };
}

export default connect(null, mapDispatchToProps)(SearchBar);
