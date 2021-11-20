import React, { useState } from "react";
import logo from "../logo.svg";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { validate } from "../components/validate";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { isAuthenticated } from "../redux/actions";

function Login(props) {
  let history = useHistory();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});
  const handleInputChange = function (e) {
    var objError = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(objError);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = (user, password) => {
    signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Sesion iniciada con: ", user);
        props.isAuthenticated();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const user = e.target.idUsername.value;
    const password = e.target.idPassword.value;
    iniciarSesion(user, password);
    history.push("/");
  };

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Iniciar Sesión</h3>
        <form onSubmit={submitHandler}>
          <div className="container mb-3">
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
              </div>
              <div class="col-sm">
                <input
                  type="text"
                  className={`${error.username} form-control`}
                  name="username"
                  id="idUsername"
                  onChange={handleInputChange}
                  value={input.username}
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
            <div id="emailHelp" className="form-text">
              {error.username && <h6>{error.username}</h6>}
            </div>
          </div>
          <div className="container mb-3">
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
              </div>
              <div class="col-sm">
                <input
                  type="password"
                  className={`${error.password} form-control`}
                  name="password"
                  id="idPassword"
                  onChange={handleInputChange}
                  value={input.password}
                />
              </div>
            </div>
            <div id="passwordHelpInline" className="form-text">
              {error.password && <h6>{error.password}</h6>}
            </div>
          </div>
          <input
            type="submit"
            value="Ingresar"
            className="btn btn-primary mb-3"
          />
        </form>
        <div>
          <Link to="/register">
            <h6>"¿No tienes Cuenta? ¡Registrate!"</h6>
          </Link>
        </div>
      </header>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    isAuthenticated: () => dispatch(isAuthenticated()),
  };
}

export default connect(null, mapDispatchToProps)(Login);
