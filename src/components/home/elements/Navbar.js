import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../buttons/Button";
import "../../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "animate.css";

function Navbar() {
  const [button, setButton] = useState(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  useEffect(() => {
    //Shows or Hides button in every single refresh.
    showButton();
    //Setting animation effects for the section of logo.
    const navbar_element = document.querySelector(".navbar-logo");
    const mOverlogo = () => navbar_element.classList.add("animate__flash");
    const mOutlogo = () => navbar_element.classList.remove("animate__flash");
    navbar_element.addEventListener("mouseover", mOverlogo, false);
    navbar_element.addEventListener("mouseout", mOutlogo, false);

    const header = document.querySelector(".navbar");
    document.addEventListener("scroll", () => {
      // document.documentElement for chrome, firefox, ie or opera
      // document.body for safari since that's where overflow is set in those browsers
      if (document.documentElement.scrollTop > 10) {
        header.classList.add("navbar--alt");
      } else {
        header.classList.remove("navbar--alt");
      }
    });
  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo animate__animated">
            <FontAwesomeIcon
              icon={solid("lungs")}
              className="brand-icon"
              fade
            />
            LungHealth
          </Link>
          <div className="menu-icon">
            <Link to="/login">
              <FontAwesomeIcon icon={solid("user-lock")} inverse />
            </Link>
          </div>

          {button && (
            <Button
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              to="/login"
            >
              Iniciar sesión
            </Button>
          )}
        </div>
        <div className="navbar-container2"></div>
      </nav>
    </>
  );
}

export default Navbar;
