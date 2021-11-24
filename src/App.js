import "./App.css";
import React from "react";
import Login from "./pages/login.jsx";
import Home from "./pages/home";
import Register from "./pages/register";
import PrivateRoute from "./Routes/PrivateRoute";
import RouteLogin from "./Routes/RouteLogin";
import RouteRegister from "./Routes/RouteRegister";
import { Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <RouteRegister path="/register" component={Register} />
        <PrivateRoute path="/home" component={Home} />
        <RouteLogin path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
