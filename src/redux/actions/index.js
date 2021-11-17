import axios from "axios";
import { db, auth } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

const ON_SEARCH = "ON_SEARCH";
const GET_TEAMS = "GET_TEAMS";
const DELETE_POKEMON = "DELETE_POKEMON";
const POKEMON_SELECTED = "POKEMON_SELECTED";
const PUSH_ARRAY = "PUSH_ARRAY";
const DELETE_POKEMON_SELECTED = "DELETE_POKEMON_SELECTED";
const AUTHENTICATED = "AUTHENTICATED";
const SING_OUT = "SING_OUT";

//Actions creators
//-OnSearch
export function onSearch(payload) {
  return function (dispatch) {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${payload}`)
      .then((obj) => dispatch({ type: ON_SEARCH, payload: obj.data }))
      .catch((error) => {
        if (error.status === 404) {
          alert("Este pokemon no existe");
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
      } catch (error) {
        console.log("ya no hay usuario loggeado: ", error);
      }
    });
  };
}

export function deletePokemon(id) {
  return {
    type: DELETE_POKEMON,
    payload: id,
  };
}

export function pokemonSelected(id) {
  return function (dispatch) {
    dispatch({ type: POKEMON_SELECTED, payload: id });
    dispatch({ type: PUSH_ARRAY });
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
  PUSH_ARRAY,
  DELETE_POKEMON_SELECTED,
  AUTHENTICATED,
  SING_OUT,
};
