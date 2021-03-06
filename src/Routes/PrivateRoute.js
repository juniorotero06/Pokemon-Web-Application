import React from "react";
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated) return <Component {...props} />;
        if (!authenticated) return <Redirect to="/" />;
      }}
    />
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
//export default PrivateRoute;
