import React, { useEffect, useState } from "react";
import "../styles/Storage.css";
import Dashbar from "./sidebar/Dashbar";
import { Button2 } from "../buttons/Button2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { rutas } from "../../Path";
import { useCookies } from "react-cookie";
import { getAudioList } from '../../services/api';

function Storage() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_id",
    "audio_id",
    "oregist",
  ]);
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getAudios();
  }, []);

  const getAudios = async () => {
    let data = await getAudioList(cookies.user_id);
    data.map(element => {
      element = Object.assign(element, {frame_rate: "16000 Hz", channels: "1"});
    })
    console.log(data)
    setFiles(data);
}

const handleToggleSidebar = (value) => {
  setToggled(value);
};

const handleCollapsedChange = (checked) => {
  setCollapsed(checked);
};


const total_audios = files.length;

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
                  <th>Fecha de subida</th>
                  <th>Frame rate</th>
                  <th>Num. Channels</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file?.audio_name}>
                    <td className="name-td">
                      <FontAwesomeIcon
                        icon={solid("file")}
                        className="icon-file"
                      />
                      <Link to="/probando" className="name_link">
                        {file?.audio_name}
                      </Link>
                    </td>
                    <td>{file?.upload_date}</td>
                    <td>{file?.frame_rate}</td>
                    <td>{file?.channels}</td>
                  </tr>
                ))}
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
      className={`btn-collapse ${collapsed ? "btn-collapse-enabled" : "btn-collapse-disabled"
        }`}
      onClick={() => handleCollapsedChange(!collapsed)}
    >
      <FontAwesomeIcon icon={solid("arrows-to-circle")} inverse />
    </div>
  </>
);
}

export default Storage;
