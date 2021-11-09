import React from "react";
import Cards from "./cards";
import SearchBar from "./searchBar";
import CardSearch from "./cardSearch";
import { db, auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { getTeams } from "../redux/actions";
import { connect } from "react-redux";

export function Home(props) {
  const cerrarSesion = () => {
    signOut(auth);
  };

  async function createTeamCollection() {
    onAuthStateChanged(auth, async (userFirebase) => {
      await addDoc(collection(db, "users", userFirebase.uid, "team"), {
        name: props.pokemon.name,
        id: props.pokemon.id,
        img: props.pokemon.img,
        types: props.pokemon.types,
      }).then(props.getTeams());
    });
  }

  React.useEffect(() => {
    props.getTeams();
  }, []);

  return (
    <div>
      <div>
        <p>Este es el home de la app</p>
        <button onClick={cerrarSesion}>Cerrar Sesion</button>
      </div>
      <div className="divsearch">
        <SearchBar />
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTeams: () => dispatch(getTeams()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
