import React, { useState } from "react";
import logo from "../logo.svg";
import { validate } from "../components/validate";
import { db, auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { isAuthenticated } from "../redux/actions";

export function Register(props) {
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

  const crearUsuario = (user, password) => {
    createUserWithEmailAndPassword(auth, user, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("usuario creado: ", userCredential);
        //crear base de datos
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
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
    console.log(user, password);
    crearUsuario(user, password);
    history.push("/");
  };

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p>Registro</p>
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
          <input type="submit" value="Registrar" />
        </form>
      </header>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    isAuthenticated: () => dispatch(isAuthenticated()),
  };
}

export default connect(null, mapDispatchToProps)(Register);
