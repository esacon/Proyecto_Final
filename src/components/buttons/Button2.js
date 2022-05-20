import React from "react";
import "../styles/Button2.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary2", "btn--outline2"];

const SIZES = ["btn--medium2", "btn--large2"];

export const Button2 = ({
  children,
  type,
  to,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  if (to === undefined) {
    return (
      <div className="btn--mobile2">
        <button
          className={`btn2 ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </div>
    );
  } else {
    return (
      <Link to={to} className="btn--mobile2">
        <button
          className={`btn2 ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
  }
};
