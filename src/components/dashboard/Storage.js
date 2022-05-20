import React, { useState } from "react";
import "../styles/Storage.css";
import Dashbar from "./sidebar/Dashbar";
import { Button2 } from "../buttons/Button2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { rutas } from "../../Path";
import ListFiles from "./ListFiles";

function Storage() {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  function getFiles() {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(function () {
          var data = [];

          for (var i = 10; i < 30; i++) {
            data.push({
              name: "AUDIO_2022" + i.toString() + "_WAP.wav",
              date: "02/13/2009",
              frame_rate: "6kHz",
              channels: "2",
            });
          }
          resolve(data);
        }, 100);
      } catch (error) {
        reject("No se pudo cargar");
      }
    });
  }

  var total_audios = getFiles().length;

  return (
    <>
      <div className="panel">
        <Dashbar
          toggled={toggled}
          collapsed={collapsed}
          handleToggleSidebar={handleToggleSidebar}
          active1={true}
          active2={false}
          active3={false}
        />
        <div className="content">
          <div
            className={`explorer-wrapper ${total_audios !== 0 ? "show" : ""} `}
          >
            <div className="explorer__header">
              <FontAwesomeIcon
                icon={solid("bars-progress")}
                className="icon-header"
                inverse
              />
              <h2>Administrador de archivos</h2>
            </div>
            <div className="files__content">
              <table className="datatable">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Frame_rate</th>
                    <th>Channels</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  <ListFiles datalist={getFiles()} />{" "}
                </tbody>
              </table>
            </div>
          </div>
          <div className={`no_files ${total_audios !== 0 ? "" : "show"}`}>
            <h1>
              {" "}
              Oh no! Tu directorio está vacío{" "}
              <FontAwesomeIcon
                icon={solid("face-sad-tear")}
                className="icon-sad"
              />
            </h1>
            <h2> Descarga la aplicacion y sube un audio de tu respiración</h2>
            <a href={rutas.DESCARGARAPK} download>
              <Button2
                className="btn2 btn--sh2"
                buttonStyle="btn--primary2"
                buttonSize="btn--large2"
              >
                Descarga la aplicación
                <FontAwesomeIcon
                  icon={solid("download")}
                  className="fa-descarga"
                />
              </Button2>
            </a>
          </div>
        </div>
      </div>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FontAwesomeIcon icon={solid("bars")} inverse />
      </div>
      <div
        className={`btn-collapse ${
          collapsed ? "btn-collapse-enabled" : "btn-collapse-disabled"
        }`}
        onClick={() => handleCollapsedChange(!collapsed)}
      >
        <FontAwesomeIcon icon={solid("arrows-to-circle")} inverse />
      </div>
    </>
  );
}

export default Storage;
