import React, { useState } from "react";
import SearchBar from "./searchBar";
import CardSearch from "../components/cardSearch";
import { clearSearchCard } from "../redux/actions";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import LoadingComponent from "./Loading";

function ModalComponent(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.clearSearchCard();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        disabled={props.loading === true}
        variant="success"
        onClick={handleShow}
      >
        Añadir Pokemon
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Añadir Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBar />
          <div>
            <h5 className="mt-3">Pokemon Buscado:</h5>
            {props.loading ? (
              <LoadingComponent />
            ) : props.pokemon ? (
              <CardSearch
                key={props.pokemon.id}
                createTeamCollection={props.createTeamCollection}
              />
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemonInfo,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearSearchCard: () => dispatch(clearSearchCard()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
