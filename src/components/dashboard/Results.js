import React, { useState, useEffect } from "react";
import "../styles/Storage.css";
import "../styles/Results.css";
import Dashbar from "./sidebar/Dashbar";
import Graph2 from "./graphs/Graph2";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useCookies } from "react-cookie";
import { fecthAudioResult } from "../../services/api";
import { rutas } from "../../Path";
import ReactLoading from "react-loading";

function Results() {
  let history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [result, setResult] = useState([]);
  const [procesando, setProcesando] = useState(true);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const getAudioResult = async () => {
    const data = await fecthAudioResult(cookies.audio_id);
    console.log(data.audio_name);
    setProcesando(false);
    setResult(data);
  };

  const deleteCurrentAudio = async () => {
    const success = true;

    if (success) {
      alert(
        "El audio se ha eliminado exitosamente de su directorio principal."
      );
      removeCookie("audio_id");
      history.push(rutas.STORAGE);
    }
  };

  const optionsDelete = {
    title: "Cierre de sesión",
    message: <h2>¿Está segur@ que desea eliminar el audio?</h2>,
    buttons: [
      {
        label: "Sí",
        onClick: () => {
          deleteCurrentAudio();
        },
      },
      {
        label: "No",
        onClick: () => {
          return;
        },
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  };

  useEffect(() => {
    if (cookies.audio_id) {
      getAudioResult();
    }
  });

  useEffect(() => {
    //Autoscale plots when collapse button of sidebar is pressed down. (Just for PC's)
    var cbutton = document.getElementById("collapbutton");
    cbutton.addEventListener("click", function (event) {
      setTimeout(() => {
        for (var i = 0; i < 3; i++) {
          document.querySelectorAll('[data-title="Autoscale"]')[i].click();
        }
      }, 1000);
    });

    //Autoscale plots when browser window is resized.
    window.addEventListener("resize", function (event) {
      setTimeout(() => {
        for (var i = 0; i < 3; i++) {
          document.querySelectorAll('[data-title="Autoscale"]')[i].click();
        }
      }, 1000);
    });
  });

  return (
    <>
      <div className="panel">
        <Dashbar
          toggled={toggled}
          collapsed={collapsed}
          handleToggleSidebar={handleToggleSidebar}
          active1={false}
          active2={true}
          active3={false}
        />
        <div className="content">
          <div
            className={`explorer-wrapper ${
              cookies.audio_id === undefined ? "" : "show"
            } `}
          >
            <div className="explorer__header">
              <FontAwesomeIcon
                icon={solid("bars-progress")}
                className="icon-header"
                inverse
              />
              <h2>Administrador de archivos/{result.audio_name}/</h2>
            </div>
            <div className="results__content">
              <div className="results__header">
                <FontAwesomeIcon
                  icon={solid("music")}
                  className="results-header-icon"
                />
                {procesando ? (
                  <span>Procesando...</span>
                ) : (
                  <>
                    <span>{result.audio_name}</span>
                    <button
                      className="deletebtn"
                      onClick={() => confirmAlert(optionsDelete)}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={solid("trash-can")}
                        className="icon-delete"
                        inverse
                      />
                    </button>
                  </>
                )}
              </div>
              {procesando ? (
                <div className="results__overview">
                  <ReactLoading
                    type="spin"
                    color="#000000"
                    height={"10%"}
                    width={"10%"}
                  />
                </div>
              ) : (
                <div className="results__overview">
                  <div className="bpm__section">
                    <div className="status__section">
                      <div className="status__header">
                        <h1>ESTADO</h1>
                        <div className="break_line_status"></div>
                      </div>
                      {procesando ? (
                        <span></span>
                      ) : (
                        <span
                          style={{
                            color: "rgb(0, 221, 111)",
                            textShadow: "0px 0px 5px rgb(173, 255, 41)",
                          }}
                        >
                          Saludable
                        </span>
                      )}
                    </div>
                    <div className="audio__section">
                      {cookies.audio_id !== undefined && (
                        <Graph2
                          collapsed={collapsed}
                          titley=""
                          title="Audio"
                          x={result.time}
                          y={result.audio_amp}
                          linecolor="rgba(40, 108, 255,0.9)"
                        />
                      )}
                    </div>
                  </div>
                  <div className="graph__section">
                    <div className="graph__card card1">
                      {cookies.audio_id !== undefined && (
                        <Graph2
                          titley=""
                          title="Envolvente"
                          x={result.time}
                          y={result.envelope_amp}
                          linecolor="rgba(224, 52, 75,0.9)"
                        />
                      )}
                    </div>
                    <div className="graph__card card2">
                      {cookies.audio_id !== undefined && (
                        <Graph2
                          titley=""
                          title="Audio Filtrado"
                          x={result.time}
                          y={result.filter_amp}
                          linecolor="rgba(238, 166, 34,0.9)"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`no_audio ${
              cookies.audio_id === undefined ? "show" : ""
            } `}
          >
            <h1>
              No se ha podido cargar los resultados{" "}
              <FontAwesomeIcon
                icon={solid("face-sad-tear")}
                className="icon-sad"
              />
            </h1>
            <h2>
              {" "}
              Seleccione un audio desde "Almacenamiento" para visualizar su
              estado!
            </h2>
          </div>
        </div>
      </div>
      <div
        className="btn-toggle"
        onClick={() => {
          handleToggleSidebar(true);
        }}
      >
        <FontAwesomeIcon icon={solid("bars")} inverse />
      </div>
      <div
        id="collapbutton"
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

export default Results;
