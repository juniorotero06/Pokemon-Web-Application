import axios from "axios";
import { db, auth } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ON_SEARCH = "ON_SEARCH";
const GET_TEAMS = "GET_TEAMS";
const DELETE_POKEMON = "DELETE_POKEMON";
const user = auth.currentUser;

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
    try {
      const datosTeam = await getDocs(
        collection(db, "users", user.uid, "team")
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
  };
}

export function deletePokemon(id) {
  return {
    type: DELETE_POKEMON,
    payload: id,
  };
}

export { ON_SEARCH, GET_TEAMS, DELETE_POKEMON };
