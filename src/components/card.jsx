import React from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { deletePokemon, pokemonSelected } from "../redux/actions";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";

export function CardComponent(props) {
  const user = auth.currentUser;
  const deletePokemon = async () => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "team", props.documentId));
      props.deletePokemon(props.id);
    } catch (error) {}
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
  return (
    <div>
      <Card style={{ width: "10rem" }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>ID: {props.id}</ListGroupItem>
          <ListGroupItem>
            <Badge pill bg="info">
              Types: {props.types.map((type) => type.type.name + " ")}
            </Badge>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <div className="mb-2">
            <Button variant="outline-danger" size="sm" onClick={deletePokemon}>
              Borrar del equipo
            </Button>{" "}
            <Button variant="outline-primary" size="sm" onClick={SelectPokemon}>
              Seleccionar Pokemon
            </Button>
          </div>
        </Card.Body>
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);
