import React, { useState } from "react";
import logo from "../logo.svg";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { validate } from "./validate";
import { Link } from "react-router-dom";

export default function Login(props) {
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
        props.setUsuario(user);
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
    console.log(user, password);
    iniciarSesion(user, password);
  };

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p>Iniciar Sesión</p>
        </div>
        <form onSubmit={submitHandler}>
          <div>
            <label>Username: </label>
            <input
              className={error.username}
              type="text"
              name="username"
              id="idUsername"
              onChange={handleInputChange}
              value={input.username}
            />
            {error.username && <h6>{error.username}</h6>}
          </div>
          <div>
            <label>Password: </label>
            <input
              className={error.password}
              type="text"
              name="password"
              id="idPassword"
              onChange={handleInputChange}
              value={input.password}
            />
            {error.password && <h6>{error.password}</h6>}
          </div>
          <input type="submit" value="Ingresar" />
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
