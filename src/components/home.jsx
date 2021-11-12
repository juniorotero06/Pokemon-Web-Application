import React from "react";
import Cards from "./cards";
import SearchBar from "./searchBar";
import CardSearch from "./cardSearch";
import CardSelection from "./cardSelection";
import { db, auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getTeams } from "../redux/actions";
import { connect } from "react-redux";

export function Home(props) {
  const user = auth.currentUser;

  const cerrarSesion = () => {
    signOut(auth);
    window.location.reload();
  };
  const pokemonExist = (pokemon) => {
    let exist = props.teams.findIndex((team) => team.id === pokemon.id);
    return exist === -1 ? false : true;
  };
  async function createTeamCollection() {
    if (props.teams.length < 6) {
      if (!pokemonExist(props.pokemon)) {
        try {
          await addDoc(collection(db, "users", user.uid, "team"), {
            name: props.pokemon.name,
            id: props.pokemon.id,
            img: props.pokemon.img,
            types: props.pokemon.types,
          });
          props.getTeams();
        } catch (error) {
          console.log("ya no hay usuario loggeado: ", error);
        }
      } else {
        alert("Este pokemon ya existe");
      }
    } else {
      alert("Ya se alcanzo el limite maximo de pokemons en el equipo");
    }
  }
  React.useEffect(() => {
    console.log("Numero de peticiones");
    props.getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <p>Este es el home de la app</p>
        <button onClick={cerrarSesion}>Cerrar Sesion</button>
      </div>
      <div>
        <SearchBar />
      </div>
      <h1>Pokemon Seleccionado</h1>
      <button onClick={() => window.location.reload()}>
        Limpiar Seleccion
      </button>
      <div>
        {props.pushArray
          ? props.pushArray.map((p) => (
              <CardSelection
                key={p.id}
                name={p.name}
                types={p.types}
                img={p.img}
                id={p.id}
                documentId={p.documentId}
              />
            ))
          : null}
      </div>
      <div>
        {props.pokemon ? (
          <CardSearch
            key={props.pokemon.id}
            createTeamCollection={createTeamCollection}
          />
        ) : null}
      </div>
      <div>{props.teams ? <Cards /> : null}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemonInfo,
    teams: state.pokemonTeam,
    pushArray: state.pushArray,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTeams: () => dispatch(getTeams()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
