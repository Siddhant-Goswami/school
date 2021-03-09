import React from "react";

import curves from "../../assets/images/waves.svg";
import footerCurves from "../../assets/images/footer-waves.svg";


const Curves = ({footer}) => {
  if(footer) 
    return <img src={footerCurves} alt="curves" className="mw-100" />;
    
  return <img src={curves} alt="curves" className="mw-100" />;
};

export default Curves;
