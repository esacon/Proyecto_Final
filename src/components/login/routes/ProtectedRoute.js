import React from "react";
import { Route, Redirect } from "react-router-dom";
import { rutas } from "../../../Path";
import { useCookies } from "react-cookie";

const ProtectedRoute = (props) => {
  const [cookies, setCookie] = useCookies(["user_id", "audio_id"]);
  console.log('Protected routes')
  console.log(cookies)
  let isAuthenticated = false;
  if (cookies.user_id !== undefined) isAuthenticated = true;

  if (!isAuthenticated) {
    alert("ACCESS DENIED: Inice sesión para acceder al sistema.");
    return <Redirect to={rutas.LOGIN} />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
