import { ON_SEARCH, GET_TEAMS } from "../actions";

const initialState = {
  pokemonInfo: null,
  pokemonTeam: [],
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
    return {
      ...state,
      pokemonTeam: action.payload,
    };
  }
  return state;
}

export default rootReducer;
