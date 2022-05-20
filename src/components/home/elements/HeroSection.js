import React from "react";
import { Button } from "../../buttons/Button";
import "../../styles/HeroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { rutas } from "../../../Path";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function HeroSection() {
  //<video src="/videos/background-video_2.mp4" autoPlay loop muted />
  let history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["user_id", "audio_id", "oregist"]);

  function goRegister() {
    setCookie("oregist", 1);
    history.push(rutas.LOGIN);
  }

  return (
    <>
      <div className="background-hero"></div>

      <div className="hero-container">
        <h1>EXAMINA TUS PULMONES</h1>
        <p>¡CUANDO QUIERAS, DONDE QUIERAS!</p>

        <div className="hero-btns">
          <Button
            className="btn"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={() => goRegister()}
          >
            Crea tu cuenta
          </Button>
          <a href={rutas.DESCARGARAPK} download>
            <Button
              className="btn btn--sh"
              buttonStyle="btn--primary"
              buttonSize="btn--large"
            >
              Descarga la aplicación
              <FontAwesomeIcon
                icon={solid("download")}
                className="fa-descarga"
              />
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
