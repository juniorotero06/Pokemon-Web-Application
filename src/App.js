import "./App.css";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase/firebaseConfig";
import Login from "./components/login.jsx";
import Home from "./components/home";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userFirebase) => {
      console.log("Ya tiene sesion iniciado con: ", userFirebase);
      setUsuario(userFirebase);
    });
  }, []);

  useEffect(() => {
    async function obtenerDatos() {
      const datos = await getDocs(collection(db, "users"));
      datos.forEach((documento) => {
        console.log(documento.data());
      });
    }
    obtenerDatos();
  }, []);

  return (
    <div className="App">
      {usuario ? <Home /> : <Login setUsuario={setUsuario} />};
      {/* <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/home" component={Home} /> */}
    </div>
  );
}

export default App;

// const obtenerDatos = async () => {
//   const datos = await getDocs(collection(db, "users"));
//   //console.log(datos.docs[0].data());
//   datos.forEach((documento) => {
//     console.log(documento.data());
//   });
// };
