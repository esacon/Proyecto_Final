import React from "react";
import { Route, Redirect } from "react-router-dom";
import { rutas } from "../../../Path";
import cookie from "react-cookies";

const ProtectedRoute = (props) => {
  let isAuthenticated = false;
  if (cookie.load("user_id") !== undefined) isAuthenticated = true;

  if (!isAuthenticated) {
    alert("ACCESS DENIED: Inice sesión para acceder al sistema.");
    return <Redirect to={rutas.LOGIN} />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
