import React, { useState } from "react";
import "../styles/Login.css";
import { Button2 } from "../buttons/Button2";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { doLogin, doRegister } from "../../services/api";
import { useCookies } from "react-cookie";
import { rutas } from "../../Path";
import {
  isNameValid,
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
} from "./regex/Validations";

function Login() {
  let history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_id",
    "audio_id",
    "oregist",
  ]);
  var openRegister = false;
  if (cookies.oregist !== undefined) {
    openRegister = true;
  }
  const [registration, setRegistration] = useState(openRegister);
  removeCookie("oregist");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setVerifyPassword] = useState("");
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleSubmit = async () => {
    if (!isNameValid(name)) {
      alert("Nombre inválido");
      return;
    }
    if (age <= 0 || age > 150) {
      alert("Edad inválida");
      return;
    }
    if (!isUsernameValid(username)) {
      alert("Nombre de usuario inválido");
      return;
    }
    if (!isEmailValid(email)) {
      alert("Email inválido");
      return;
    }
    if (!isPasswordValid(password)) {
      alert("Contraseña inválida");
      return;
    }
    if (confirm_password !== password) {
      alert("Las Contraseñas no coinciden");
      return;
    }

    var message = await doRegister([
      name,
      email,
      username,
      age,
      password,
      confirm_password,
    ]);

    if (message.login === "false") {
      alert("No se pudo registrar el usuario");
      return;
    } else if (message.login === "true") {
      setCookie("user_id", message.user_id, { maxAge: 3600 });
      alert("Usuario registrado.");
      history.push(rutas.STORAGE);
    }
  };

  const handleLogin = async () => {
    var data = await doLogin([usernameLogin, passwordLogin]);

    if (data.login === "true") {
      setCookie("user_id", data.user_id, { maxAge: 3600 });
      history.push(rutas.STORAGE);
    }
  };

  if (cookies.user_id !== undefined) {
    history.push(rutas.STORAGE);
  } else {
    return (
      <div className="page">
        <div className="login__container">
          <Link to={rutas.HOME} className="goback">
            <FontAwesomeIcon icon={solid("circle-left")} className="circle" />
            Atrás
          </Link>
          <div className="login__wrapper">
            <div className="logo__section">
              <FontAwesomeIcon
                icon={solid("lungs")}
                className="brand-icon"
                fade
              />
              LungHealth
            </div>
            <div className="formdata">
              <div className="input_login">
                <FontAwesomeIcon
                  icon={solid("user")}
                  className="form-icon_login"
                />
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  className="username"
                  onChange={(e) => setUsernameLogin(e.target.value)}
                />
              </div>

              <div className="input_login">
                <FontAwesomeIcon
                  icon={solid("lock")}
                  className="form-icon_login"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="password"
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
              </div>
            </div>
            <div className="buttons__container">
              <Button2
                className="btn2 btn--sh2"
                buttonStyle="btn--primary2"
                buttonSize="btn--large2"
                onClick={() => handleLogin()}
              >
                Continuar
              </Button2>
              <Button2
                className="btn2 btn--sh2"
                buttonStyle="btn--outline2"
                buttonSize="btn--large2"
                onClick={() => setRegistration(true)}
              >
                Crear cuenta
              </Button2>
            </div>
          </div>
        </div>

        <div
          className={`register__container ${registration ? "displayed" : " "}`}
        >
          <div className="register__wrapper">
            <div className="formdata_register">
              <div className="title_register">
                <h1>Registro</h1>
                <div className="break_line"></div>
              </div>
              <div className="input_register">
                <FontAwesomeIcon
                  icon={solid("file-signature")}
                  className="form-icon_register"
                />
                <input
                  id="txb_name"
                  type="text"
                  placeholder="Nombre"
                  className="name_register"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input_register">
                <FontAwesomeIcon
                  icon={solid("calendar-days")}
                  className="form-icon_register"
                />
                <input
                  id="txb_age"
                  type="text"
                  placeholder="Edad"
                  className="age_register"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="input_register">
                <FontAwesomeIcon
                  icon={solid("user")}
                  className="form-icon_register"
                />
                <input
                  id="txb_username"
                  type="text"
                  placeholder="Nombre de usuario"
                  className="username_register"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input_register">
                <FontAwesomeIcon
                  icon={solid("envelope")}
                  className="form-icon_register"
                />
                <input
                  id="txt_mail"
                  type="text"
                  placeholder="Correo"
                  className="mail_register"
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              <div className="input_register">
                <FontAwesomeIcon
                  icon={solid("lock")}
                  className="form-icon_register"
                />
                <input
                  id="txt_password"
                  type="password"
                  placeholder="Contraseña"
                  className="password_register"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input_register">
                <FontAwesomeIcon
                  icon={solid("clipboard-check")}
                  className="form-icon_register"
                />
                <input
                  id="txt_verifypassword"
                  type="password"
                  placeholder="Confirmar contraseña"
                  className="verify_register"
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </div>
              <div className="buttons__container_register">
                <button
                  id="btnform"
                  className="btn2 btn--sh2 btn--outline2 btn--large2"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Finalizar
                </button>
              </div>
            </div>
            <div className="banner_register">
              <div className="banner_title">
                <h1>Hey!</h1>
                <h2>¿Ya has visitado nuestras redes sociales?</h2>
              </div>
              <div className="social__section">
                <Link to="#">
                  <FontAwesomeIcon
                    icon={brands("facebook")}
                    className="social-icons"
                    inverse
                  />
                </Link>
                <Link to="#">
                  <FontAwesomeIcon
                    icon={brands("twitter-square")}
                    className="social-icons"
                    inverse
                  />
                </Link>
                <Link to="#">
                  <FontAwesomeIcon
                    icon={brands("instagram-square")}
                    className="social-icons"
                    inverse
                  />
                </Link>
              </div>
            </div>

            <button
              className="close__section"
              onClick={() => setRegistration(false)}
              type="button"
            >
              <FontAwesomeIcon icon={solid("x")} inverse />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
