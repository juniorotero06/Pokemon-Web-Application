import axios from "axios";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

const ON_SEARCH = "ON_SEARCH";
const GET_TEAMS = "GET_TEAMS";
const CREATE_TEAM_COLLECTION = "CREATE_TEAM_COLLECTION";
const DELETE_POKEMON = "DELETE_POKEMON";

//Actions creators
//-OnSearch
export function onSearch(payload) {
  return function (dispatch) {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${payload}`)
      .then((obj) => dispatch({ type: ON_SEARCH, payload: obj.data }))
      .catch((error) => {
        if (error.obj.status === 404) {
          alert("Este pokemon no existe");
        }
      })
      .finally(() => {
        console.log("Se ejecutó la petición");
      });
  };
}
//-getTeams
export async function getTeams() {
  return async function (dispatch) {
    return onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        const datosTeam = await getDocs(
          collection(db, "users", userFirebase.uid, "team")
        );
        dispatch({ type: GET_TEAMS, payload: datosTeam.docs });
      }
    });
  };
}
//-createTeamCollection
export function createTeamCollection() {
  return {
    type: CREATE_TEAM_COLLECTION,
  };
}
//-deletePokemon
export function deletePokemon() {
  return {
    type: DELETE_POKEMON,
  };
}

export { ON_SEARCH, GET_TEAMS, CREATE_TEAM_COLLECTION, DELETE_POKEMON };
