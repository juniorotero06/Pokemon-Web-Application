import React from "react";
import { deletePokemonSelected } from "../redux/actions";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";

export function CardSelection(props) {
  const user = auth.currentUser;
  async function deletePokemonSelected() {
    await updateDoc(doc(db, "users", user.uid, "team", props.documentId), {
      selected: false,
    });
    props.deletePokemonSelected(props.id);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Pokemon Retirado",
      showConfirmButton: false,
      timer: 600,
    });
  }
  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="col-4 text-start my-3">
      <Card style={{ width: "10rem" }}>
        <Card.Body className="text-end p-0">
          <Button
            disabled={props.loading === true}
            variant="danger"
            size="sm"
            onClick={deletePokemonSelected}
          >
            X
          </Button>
        </Card.Body>
        <Card.Img className="p-0" variant="top" src={props.img} />
        <Card.Body className="text-center p-0">
          <Card.Title>{capitalizarPrimeraLetra(props.name)}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="text-center p-0">
            ID: {props.id}
          </ListGroupItem>
          <ListGroupItem className="text-center p-2">
            <Badge pill bg="info">
              Types: {props.types.map((type) => type.type.name + " ")}
            </Badge>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePokemonSelected: (id) => dispatch(deletePokemonSelected(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSelection);
