import React from "react";
import "../styles/Notfound.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Notfound() {
  return (
    <div className="page-notfound">
      <div className="error-content">
        <Link to="/" className="gohome">
          <FontAwesomeIcon icon={solid("house")} className="circle" />
          Volver a Inicio
        </Link>
        <a href="https://www.freepik.es/vectores/404">
          <img
            src="/images/404.jpg"
            alt="Vector de 404 creado por pikisuperstar - www.freepik.es"
          />
          Vector de 404 creado por pikisuperstar - www.freepik.es
        </a>
        <h1>Whoops! Link no encontrado.</h1>
      </div>
    </div>
  );
}

export default Notfound;
