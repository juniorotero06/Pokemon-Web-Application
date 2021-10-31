import { signOut } from "@firebase/auth";
import React from "react";
import { auth } from "../firebase/firebaseConfig";
import Cards from "./cards";
import SearchBar from "./searchBar";
import axios from "axios";
import CardSearch from "./cardSearch";

export default function Home() {
  const [pokemons, setPokemons] = React.useState(null);

  const cerrarSesion = () => {
    signOut(auth);
  };

  async function onSearch(pokemon) {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.name);
        if (response.data !== undefined) {
          const poke = {
            name: response.data.name,
            id: response.data.id,
            img: response.data.sprites.front_default,
            types: response.data.types,
          };
          //console.log(poke);
          setPokemons(poke);
        }
        console.log(pokemons);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("Este pokemon no existe");
        }
      })
      .finally(() => {
        console.log("Se ejecutó la petición");
      });
  }

  return (
    <div>
      <div>
        <p>Este es el home de la app</p>
        <button onClick={cerrarSesion}>Cerrar Sesion</button>
      </div>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
      <div>
        {/* {pokemons.map((pokemon) => (
          <h1 key={pokemon.id}>{pokemon.name}</h1>
        ))} */}
        {pokemons ? (
          <CardSearch
            key={pokemons.id}
            name={pokemons.name}
            types={pokemons.types}
            img={pokemons.img}
            id={pokemons.id}
          />
        ) : null}
      </div>
    </div>
  );
}
