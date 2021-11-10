import axios from "axios";
import { db, auth } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";

const ON_SEARCH = "ON_SEARCH";
const GET_TEAMS = "GET_TEAMS";
const DELETE_POKEMON = "DELETE_POKEMON";

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
    return onAuthStateChanged(auth, async (userFirebase) => {
      let pokms = [];
      if (userFirebase) {
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
          //console.log("documentWithId: ", documentWithId);
          pokms.push(documentWithId);
        }
        dispatch({ type: GET_TEAMS, payload: pokms });
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

export { ON_SEARCH, GET_TEAMS, DELETE_POKEMON };
