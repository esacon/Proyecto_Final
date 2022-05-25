import React, { useEffect } from "react";
import "../styles/Download.css";
import { rutas } from "../../Path";

function Download() {
  useEffect(() => {
    document.getElementById("download-btn").click();
  });
  return (
    <div className="page-download">
      Descargando...
      <a href={rutas.DESCARGARAPK} id="download-btn" download>
        {""}
      </a>
    </div>
  );
}

export default Download;
