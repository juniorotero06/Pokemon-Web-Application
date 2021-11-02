import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import Cards from "./cards";
import SearchBar from "./searchBar";
import axios from "axios";
import CardSearch from "./cardSearch";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

export default function Home() {
  const [pokemons, setPokemons] = React.useState(null);

  const cerrarSesion = () => {
    signOut(auth);
  };

  async function onSearch(pokemon) {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => {
        if (response.data !== undefined) {
          const poke = {
            name: response.data.name,
            id: response.data.id,
            img: response.data.sprites.front_default,
            types: response.data.types,
          };
          setPokemons(poke);
        }
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

  const [teams, setTeams] = useState([]);
  let pokms = [];

  async function getTeams() {
    onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        const datosTeam = await getDocs(
          collection(db, "users", userFirebase.uid, "team")
        );
        //console.log("DatosTeam:", datosTeam.docs[1].data());
        for (let team of datosTeam.docs) {
          pokms.push(team.data());
        }
        setTeams(...teams, pokms);
      }
    });
    console.log("se ejecuto la funcion marrano");
    console.log(pokms);
  }

  useEffect(() => {
    getTeams();
  }, []);

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
        {pokemons ? (
          <CardSearch
            key={pokemons.id}
            name={pokemons.name}
            types={pokemons.types}
            img={pokemons.img}
            id={pokemons.id}
            getTeams={getTeams}
          />
        ) : null}
      </div>
      <div>{teams ? <Cards teams={teams} /> : null}</div>
    </div>
  );
}
