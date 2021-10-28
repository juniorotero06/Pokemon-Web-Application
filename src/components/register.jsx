import React, { useState } from "react";
import logo from "../logo.svg";
import { validate } from "./validate";

function saludo() {
  alert("Hola manco");
}

export default function Register() {
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

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p>Registro</p>
        </div>
        <form>
          <div>
            <label>Username: </label>
            <input
              className={error.username && "danger"}
              type="text"
              name="username"
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
              onChange={handleInputChange}
              value={input.password}
            />
            {error.password && <h6 className="danger">{error.password}</h6>}
          </div>
          <button type="button" onClick={saludo}>
            Registrarse
          </button>
        </form>
      </header>
    </div>
  );
}
