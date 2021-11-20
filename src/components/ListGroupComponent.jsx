import React from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { deletePokemon, pokemonSelected } from "../redux/actions";
import { connect } from "react-redux";
import { ListGroup, Button, Badge } from "react-bootstrap";

function ListGroupComponent(props) {
  const user = auth.currentUser;
  const deletePokemon = async () => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "team", props.documentId));
      props.deletePokemon(props.id);
    } catch (error) {
      console.log("ya no hay usuario loggeado: ", error);
    }
  };
  const pokemonExist = (pokemon) => {
    let exist = props.pushArray.findIndex((push) => push.id === pokemon);
    return exist === -1 ? false : true;
  };
  const SelectPokemon = () => {
    if (!pokemonExist(props.id)) {
      props.pokemonSelected(props.id);
    } else {
      alert("Este pokemon ya ha sido seleccionado");
    }
  };
  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div>
      <ListGroup as="ol">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <img src={props.img} width="80" height="80" alt="" />
          </div>
          <div className="ms-1 me-3">
            <div className="fw-bold">{capitalizarPrimeraLetra(props.name)}</div>
            <Badge className="me-1" variant="primary" pill>
              ID: {props.id}
            </Badge>
            <Badge pill bg="info">
              Types: {props.types.map((type) => type.type.name + " ")}
            </Badge>
          </div>
          <div className="row col-sm-2 ">
            <Button
              className="mb-2"
              variant="danger"
              size="sm"
              onClick={deletePokemon}
            >
              X
            </Button>
            <Button variant="success" size="sm" onClick={SelectPokemon}>
              ✓
            </Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pushArray: state.pushArray,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePokemon: (id) => dispatch(deletePokemon(id)),
    pokemonSelected: (idP) => dispatch(pokemonSelected(idP)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGroupComponent);
