import axios from "axios";
import Swal from "sweetalert2";
import { db, auth } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

const ON_SEARCH = "ON_SEARCH";
const GET_TEAMS = "GET_TEAMS";
const DELETE_POKEMON = "DELETE_POKEMON";
const POKEMON_SELECTED = "POKEMON_SELECTED";
const DELETE_POKEMON_SELECTED = "DELETE_POKEMON_SELECTED";
const AUTHENTICATED = "AUTHENTICATED";
const SING_OUT = "SING_OUT";
const CLEAR_CARD = "CLEAR_CARD";

//Actions creators
//-OnSearch
export function onSearch(payload) {
  return function (dispatch) {
    dispatch({ type: "LOADING" });
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${payload}`)
      .then((obj) => dispatch({ type: ON_SEARCH, payload: obj.data }))
      .catch((error) => {
        if (error.response.status === 404) {
          Swal.fire({
            icon: "error",
            allowOutsideClick: false,
            title: "Oops...",
            text: "Este Pokemon no existe, Revisa si estas escribiendo bien el nombre!!",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      })
      .finally(() => {
        console.log("Se ejecutó la petición");
      });
  };
}
//-getTeams
export function getTeams() {
  return async function (dispatch) {
    let pokms = [];
    dispatch({ type: "LOADING" });
    onAuthStateChanged(auth, async (userFirebase) => {
      try {
        const datosTeam = await getDocs(
          collection(db, "users", userFirebase.uid, "team")
        );
        for (let team of datosTeam.docs) {
          let documentWithId = team.data();
          documentWithId = Object.assign(
            {
              documentId: team.id,
            },
            documentWithId
          );
          pokms.push(documentWithId);
        }
        dispatch({ type: GET_TEAMS, payload: pokms });
      } catch (error) {}
    });
  };
}

export function clearSearchCard() {
  return {
    type: CLEAR_CARD,
  };
}

export function deletePokemon(id) {
  return {
    type: DELETE_POKEMON,
    payload: id,
  };
}

export function pokemonSelected() {
  return async function (dispatch) {
    let pokms = [];
    let pokemonSelect = [];
    dispatch({ type: "LOADING" });
    onAuthStateChanged(auth, async (userFirebase) => {
      try {
        const datosTeam = await getDocs(
          collection(db, "users", userFirebase.uid, "team")
        );
        for (let team of datosTeam.docs) {
          let documentWithId = team.data();
          documentWithId = Object.assign(
            {
              documentId: team.id,
            },
            documentWithId
          );
          pokms.push(documentWithId);
        }
        pokemonSelect = pokms.filter((pokemon) => pokemon.selected === true);
        dispatch({ type: POKEMON_SELECTED, payload: pokemonSelect });
      } catch (error) {}
    });
  };
}

export function deletePokemonSelected(id) {
  return {
    type: DELETE_POKEMON_SELECTED,
    payload: id,
  };
}

export function isAuthenticated() {
  return function (dispatch) {
    onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        dispatch({ type: AUTHENTICATED });
      }
    });
  };
}

export function singOut() {
  return {
    type: SING_OUT,
  };
}

export {
  ON_SEARCH,
  GET_TEAMS,
  DELETE_POKEMON,
  POKEMON_SELECTED,
  DELETE_POKEMON_SELECTED,
  AUTHENTICATED,
  SING_OUT,
  CLEAR_CARD,
};
