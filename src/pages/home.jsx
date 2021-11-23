import React from "react";
import Cards from "../components/cards";
import NavBar from "../components/NavBar";
import CardSelection from "../components/cardSelection";
import ModalComponent from "../components/Modal";
import LoadingComponent from "../components/Loading";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getTeams, clearSearchCard, pokemonSelected } from "../redux/actions";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import "../App.css";

export function Home(props) {
  const user = auth.currentUser;
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
            selected: false,
          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Pokemon agregado al equipo",
            showConfirmButton: false,
            timer: 1000,
          });
          props.clearSearchCard();
          props.getTeams();
        } catch (error) {}
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Este Pokemon ya existe en el equipo!!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Limite máximo alcanzado",
        text: "Ya se alcanzo el limite maximo de pokemons en el equipo",
      });
    }
  }
  React.useEffect(() => {
    props.getTeams();
    props.pokemonSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="background-home">
      <div>
        <NavBar />
      </div>
      <div className="container-fluid mt-3">
        <div className="row justify-content-md-start">
          <div className="col-12 col-md-6">
            <ModalComponent createTeamCollection={createTeamCollection} />
            {props.loading ? (
              <div className="mt-3">
                <LoadingComponent />
              </div>
            ) : props.teams ? (
              <Cards />
            ) : null}
          </div>
          <div className="col-12 col-md-6 mb-5 mt-3 mt-md-0">
            <div>
              <span className="h1">Pokemon Seleccionado</span>
            </div>
            <div className="row mb-3 px-md-5">
              {props.loading ? (
                <div className="mt-3">
                  <LoadingComponent />
                </div>
              ) : props.pokemonSelected ? (
                props.pokemonSelected.map((p) => (
                  <CardSelection
                    key={p.id}
                    name={p.name}
                    types={p.types}
                    img={p.img}
                    id={p.id}
                    documentId={p.documentId}
                  />
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemonInfo,
    teams: state.pokemonTeam,
    pokemonSelected: state.pokemonSelected,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTeams: () => dispatch(getTeams()),
    clearSearchCard: () => dispatch(clearSearchCard()),
    pokemonSelect: () => dispatch(pokemonSelected()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
