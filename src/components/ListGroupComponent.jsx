import React from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { deletePokemon, pokemonSelected } from "../redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  ListGroup,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function ListGroupComponent(props) {
  const user = auth.currentUser;
  const deletePokemon = async () => {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Este proceso no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Borralo!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "users", user.uid, "team", props.documentId));
          props.deletePokemon(props.id);
          Swal.fire(
            "¡Pokemon Borrado!",
            "El Pokemon se ha borrado de la base de datos",
            "success"
          );
        }
      });
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
      Swal.fire({
        icon: "info",
        title: "Ooops...",
        text: "Este pokemon ya ha sido seleccionado",
      });
    }
  };
  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="col-12">
      <div>
        <ListGroup as="ol">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <img src={props.img} width="80" height="80" alt="" />
            </div>
            <div className="ms-1">
              <h5 className="fw-bold">{capitalizarPrimeraLetra(props.name)}</h5>
              <Badge className="me-1" variant="primary" pill>
                ID: {props.id}
              </Badge>
              <Badge pill bg="info">
                Types: {props.types.map((type) => type.type.name + " ")}
              </Badge>
            </div>
            <div className="row col-sm-2 ">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    Eliminar Pokemon del Team
                  </Tooltip>
                }
              >
                <Button
                  className="mb-2"
                  variant="danger"
                  size="sm"
                  onClick={deletePokemon}
                >
                  X
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Seleccionar Pokemon</Tooltip>
                }
              >
                <Button variant="success" size="sm" onClick={SelectPokemon}>
                  ✓
                </Button>
              </OverlayTrigger>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
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
