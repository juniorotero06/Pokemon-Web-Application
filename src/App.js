import "./App.css";
import React from "react";
import Login from "./pages/login.jsx";
import Home from "./pages/home";
import Register from "./pages/register";
import PrivateRoute from "./Routes/PrivateRoute";
import RouteLogin from "./Routes/RouteLogin";
import RouteRegister from "./Routes/RouteRegister";
import Error404 from "./pages/error";
import { Route } from "react-router";
import { Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <RouteRegister exact path="/register" component={Register} />
        <PrivateRoute exact path="/home" component={Home} />
        <RouteLogin exact path="/" component={Login} />
        <Route path="*" component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
