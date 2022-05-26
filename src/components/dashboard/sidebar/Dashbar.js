import React from "react";
import "../../styles/Dashbar.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "animate.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { rutas } from "../../../Path";
import { useCookies } from "react-cookie";

function Dashbar({
  collapsed,
  toggled,
  handleToggleSidebar,
  active1,
  active2,
  active3,
}) {
  let history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();

  const options = {
    title: "Cierre de sesión",
    message:"¿Está segur@ que desea cerrar sesión?",
    buttons: [
      {
        label: "Sí",
        onClick: () => {
          console.log("Antes", cookies);
          removeCookie("user_id");
          removeCookie("audio_id");
          console.log("Después", cookies);
          history.push(rutas.HOME);
          alert("Ha cerrado sesión exitosamente.");
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

  function doLogout() {
    if (toggled) handleToggleSidebar(false);
    confirmAlert(options);
  }

  return (
    <ProSidebar
      collapsed={collapsed}
      image=""
      breakPoint="md"
      toggled={toggled}
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          className="headersidebar"
        >
          <FontAwesomeIcon icon={solid("lungs")} />
          {!collapsed && "LungHealth"}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FontAwesomeIcon icon={solid("database")} />}
            active={active1}
          >
            Almacenamiento <Link to={rutas.STORAGE} />
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={solid("wave-square")} />}
            active={active2}
          >
            Resultados <Link to={rutas.RESULTS} />
          </MenuItem>
          {/*
          <MenuItem
            icon={<FontAwesomeIcon icon={solid("screwdriver-wrench")} />}
            active={active3}
          >
            Configuración <Link to={rutas.CONFIG} />
          </MenuItem> */}
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <div className="sidebar-btn">
            <button onClick={() => doLogout()} type="button">
              <FontAwesomeIcon icon={solid("right-from-bracket")} inverse />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {!collapsed && "Cerrar sesión"}
              </span>
            </button>
          </div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
}

export default Dashbar;
