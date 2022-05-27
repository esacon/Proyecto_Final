import "./App.css";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Storage from "./components/dashboard/Storage";
import Results from "./components/dashboard/Results";
import Notfound from "./components/views/Notfound";
import ProtectedRoute from "./components/login/routes/ProtectedRoute";
import PublicRoute from "./components/login/routes/PublicRoute";
import { rutas } from "./Path";
import cookie from "react-cookies";
import Download from "./components/views/Download";

function App() {
  //Imprime cookies (Test)
  console.log("user_id: ", cookie.load("user_id"));
  console.log("audio_id: ", cookie.load("audio_id"));
  console.log("openRegister: ", cookie.load("oregist"));

  return (
    <Router>
      <Switch>
        <PublicRoute exact path={rutas.HOME} component={Home} />
        <PublicRoute exact strict path={rutas.LOGIN} component={Login} />
        <PublicRoute exact strict path={rutas.DESCARGA} component={Download} />
        <ProtectedRoute path={rutas.STORAGE} component={Storage} />
        <ProtectedRoute path={rutas.RESULTS} component={Results} />
        <PublicRoute path={rutas.NOTFOUND} component={Notfound} />
        <Route path="*">
          <Redirect to={rutas.NOTFOUND} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
