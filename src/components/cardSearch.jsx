import React from "react";
import { clearSearchCard } from "../redux/actions";
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
    <div className="conteiner row justify-content-md-center">
      <Card style={{ width: "10rem" }}>
        <Card.Img variant="top" src={props.pokemon?.img} />
        <Card.Body>
          <Card.Title>
            {capitalizarPrimeraLetra(props.pokemon?.name)}
          </Card.Title>
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
          <div>
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled">Añadir al Equipo</Tooltip>
              }
            >
              <Button
                variant="success"
                size="sm"
                onClick={props.createTeamCollection}
              >
                ✓
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled">Limpiar Busqueda</Tooltip>
              }
            >
              <Button
                variant="danger"
                size="sm"
                onClick={() => props.clearSearchCard()}
              >
                X
              </Button>
            </OverlayTrigger>
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
