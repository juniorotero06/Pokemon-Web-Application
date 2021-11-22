import React from "react";
import { connect } from "react-redux";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

export function CardSearch(props) {
  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="row justify-content-center">
      <Card style={{ width: "10rem" }}>
        <Card.Img variant="top" src={props.pokemon?.img} />
        <Card.Body className="text-center">
          <Card.Title>
            {capitalizarPrimeraLetra(props.pokemon?.name)}
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="text-center">
            ID: {props.pokemon?.id}
          </ListGroupItem>
          <ListGroupItem className="text-center">
            <Badge pill bg="info">
              Types: {props.pokemon?.types.map((type) => type.type.name + " ")}
            </Badge>
          </ListGroupItem>
        </ListGroup>
        <Card.Body className="text-center">
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Añadir al Equipo</Tooltip>}
          >
            <Button
              variant="success"
              size="sm"
              onClick={props.createTeamCollection}
            >
              ✓
            </Button>
          </OverlayTrigger>
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

export default connect(mapStateToProps)(CardSearch);
