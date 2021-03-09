import React from "react";

import "./styles.css";
import curves from "../../assets/images/waves.svg";
import footerCurves from "../../assets/images/footer-waves.svg";

const Curves = ({ footer }) => {
  if (footer)
    return (
      <img
        src={footerCurves}
        alt="curves"
        className="mw-100 h-100 footer-curves"
      />
    );

  return <img src={curves} alt="curves" className="mw-100" />;
};

export default Curves;
