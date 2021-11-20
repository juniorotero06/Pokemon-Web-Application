import React from "react";
import { clearSearchCard } from "../redux/actions";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button, Badge } from "react-bootstrap";

export function CardSearch(props) {
  return (
    <div className="conteiner row justify-content-md-center">
      <Card style={{ width: "10rem" }}>
        <Card.Img variant="top" src={props.pokemon?.img} />
        <Card.Body>
          <Card.Title>{props.pokemon?.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>ID: {props.pokemon?.id}</ListGroupItem>
          <ListGroupItem>
            <Badge pill bg="info">
              Types: {props.pokemon?.types.map((type) => type.type.name + " ")}
            </Badge>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <div className="col-md-5">
            <Button
              variant="success"
              size="sm"
              onClick={props.createTeamCollection}
            >
              ✓
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => props.clearSearchCard()}
            >
              X
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemonInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearSearchCard: () => dispatch(clearSearchCard()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSearch);
