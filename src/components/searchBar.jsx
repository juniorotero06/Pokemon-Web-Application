import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [pokemon, setPokemon] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(pokemon);
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
  );
}
