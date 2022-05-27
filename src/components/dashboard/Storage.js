import React, { useEffect, useState } from "react";
import "../styles/Storage.css";
import Dashbar from "./sidebar/Dashbar";
import { Button2 } from "../buttons/Button2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { rutas } from "../../Path";
import cookie from "react-cookies";
import { fecthAudioList } from "../../services/api";

function Storage() {
  var cookies = cookie.loadAll();
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getAudioList();
    // eslint-disable-next-line
  }, []);

  const getAudioList = async () => {
    let data = await fecthAudioList(cookies.user_id);
    console.log(data);
    // eslint-disable-next-line
    data.map((element) => {
      element = Object.assign(element, {
        frame_rate: "16000 Hz",
        channels: "1",
      });
    });
    setFiles(data);
  };

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
          <div className="user-info">
            <FontAwesomeIcon icon={solid("user")} className="icon-user" />
            <span>{"Usuario"}</span>
          </div>
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
              <button className="refreshbtn" onClick={() => getAudioList()}>
                <FontAwesomeIcon
                  icon={solid("rotate")}
                  className="icon-refresh"
                  inverse
                />
              </button>
            </div>
            <div className="files__content">
              <table className="datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Fecha de subida</th>
                    <th>Frame rate</th>
                    <th>Num. Channels</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={file?.audio_name}>
                      <td>{index + 1}</td>
                      <td className="name-td">
                        <FontAwesomeIcon
                          icon={solid("file")}
                          className="icon-file"
                        />
                        <Link
                          to={rutas.RESULTS}
                          className="name_link"
                          onClick={() => cookie.save("audio_id", file._id.$oid)}
                        >
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
            <a href={rutas.DESCARGA} target="_blank" rel="noopener noreferrer">
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
