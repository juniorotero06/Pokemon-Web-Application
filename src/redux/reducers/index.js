import {
  ON_SEARCH,
  GET_TEAMS,
  DELETE_POKEMON,
  POKEMON_SELECTED,
  DELETE_POKEMON_SELECTED,
  AUTHENTICATED,
  SING_OUT,
  CLEAR_CARD,
} from "../actions";

const initialState = {
  pokemonInfo: null,
  pokemonTeam: [],
  pokemonSelected: [],
  authenticated: false,
  loading: false,
};

function rootReducer(state = initialState, action) {
  if (action.type === ON_SEARCH) {
    return {
      ...state,
      loading: false,
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
      loading: false,
      pokemonTeam: action.payload,
    };
  }
  if (action.type === DELETE_POKEMON) {
    return {
      ...state,
      pokemonTeam: state.pokemonTeam.filter(
        (pokemon) => pokemon.id !== action.payload
      ),
    };
  }
  if (action.type === POKEMON_SELECTED) {
    return {
      ...state,
      loading: false,
      pokemonSelected: action.payload,
    };
  }
  if (action.type === DELETE_POKEMON_SELECTED) {
    return {
      ...state,
      pokemonSelected: state.pokemonSelected.filter(
        (pokemon) => pokemon.id !== action.payload
      ),
    };
  }
  if (action.type === AUTHENTICATED) {
    return {
      ...state,
      authenticated: true,
    };
  }
  if (action.type === SING_OUT) {
    return {
      ...state,
      authenticated: false,
    };
  }
  if (action.type === CLEAR_CARD) {
    return {
      ...state,
      pokemonInfo: null,
    };
  }
  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }

  return state;
}

export default rootReducer;
