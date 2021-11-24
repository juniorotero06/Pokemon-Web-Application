import React from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { singOut } from "../redux/actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Container, Navbar, Button } from "react-bootstrap";

function NavBar(props) {
  let history = useHistory();
  const cerrarSesion = () => {
    signOut(auth);
    props.singOut();
    history.push("/");
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <img
            src="https://imagenpng.com/wp-content/uploads/2016/09/Pokebola-pokeball-png-2.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="pokeApp logo"
          />
          <Navbar.Brand href="#">Poke App</Navbar.Brand>
          <Button variant="danger" onClick={cerrarSesion}>
            Cerrar Sesion
          </Button>
        </Container>
      </Navbar>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    singOut: () => dispatch(singOut()),
  };
}

export default connect(null, mapDispatchToProps)(NavBar);
