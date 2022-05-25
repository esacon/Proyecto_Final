import React, { useState } from "react";
import Dashbar from "./sidebar/Dashbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "../styles/Config.css";
import "../styles/Storage.css";

function Config() {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };
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
          <div className="config-wrapper">
            <div className="profilepicture__content"></div>
            <div className="ppicture_boxes"></div>
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

export default Config;
