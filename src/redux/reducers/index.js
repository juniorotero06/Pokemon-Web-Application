import {
  ON_SEARCH,
  GET_TEAMS,
  CREATE_TEAM_COLLECTION,
  DELETE_POKEMON,
} from "../actions";

const initialState = {
  pokemonInfo: null,
  pokemonTeam: [],
  createTeam: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === ON_SEARCH) {
    return {
      ...state,
      pokemonInfo: {
        name: action.payload.name,
        id: action.payload.id,
        img: action.payload.sprites.front_default,
        types: action.payload.types,
      },
    };
  }
  if (action.type === GET_TEAMS) {
  }
  if (action.type === CREATE_TEAM_COLLECTION) {
  }
  if (action.type === DELETE_POKEMON) {
  }
  return state;
}

export default rootReducer;
