import React from "react";
import { deletePokemonSelected } from "../redux/actions";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";

export function CardSelection(props) {
  function deletePokemonSelected() {
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
    <div>
      <Card style={{ width: "10rem" }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{capitalizarPrimeraLetra(props.name)}</Card.Title>
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
          <Button
            variant="outline-danger"
            size="sm"
            onClick={deletePokemonSelected}
          >
            X
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    deletePokemonSelected: (id) => dispatch(deletePokemonSelected(id)),
  };
}

export default connect(null, mapDispatchToProps)(CardSelection);
