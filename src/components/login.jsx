import React, { useState } from "react";
import logo from "../logo.svg";
import { db, auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { validate } from "./validate";

export default function Login(props) {
  const [isRegister, setIsRegister] = useState(false);
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

  const crearUsuario = (user, password) => {
    createUserWithEmailAndPassword(auth, user, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("usuario creado: ", userCredential);
        props.setUsuario(user);
        //crear base de datos
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const user = e.target.idUsername.value;
    const password = e.target.idPassword.value;
    console.log(user, password);

    if (isRegister) {
      crearUsuario(user, password);
    }
    if (!isRegister) {
      iniciarSesion(user, password);
    }
  };

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p>{isRegister ? "Registro" : "Iniciar Sesion"}</p>
        </div>
        <form onSubmit={submitHandler}>
          <div>
            <label>Username: </label>
            <input
              className={error.username && "danger"}
              type="text"
              name="username"
              id="idUsername"
              onChange={handleInputChange}
              value={input.username}
            />
            {error.username && <h6 className="danger">{error.username}</h6>}
          </div>
          <div>
            <label>Password: </label>
            <input
              className={error.password && "danger"}
              type="text"
              name="password"
              id="idPassword"
              onChange={handleInputChange}
              value={input.password}
            />
            {error.password && <h6 className="danger">{error.password}</h6>}
          </div>
          <input
            type="submit"
            value={isRegister ? "Registrarse" : "Ingresar"}
          />
        </form>
        <div>
          <h6 onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "¿Ya tienes cuenta? Inicia Sesion"
              : "¿No tienes Cuenta? ¡Registrate!"}
          </h6>
        </div>
      </header>
    </div>
  );
}
