import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/login.jsx";
import Home from "./components/home";
import Register from "./components/register";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Route } from "react-router";

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userFirebase) => {
      console.log("Ya tiene sesion iniciado con: ", userFirebase);
      setUsuario(userFirebase);
    });
  }, []);

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => (usuario ? <Home /> : <Login setUsuario={setUsuario} />)}
      />
      <Route
        exact
        path="/register"
        render={() =>
          usuario ? <Home /> : <Register setUsuario={setUsuario} />
        }
      />
      <Route exact path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
