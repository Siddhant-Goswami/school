import React from "react";
import Box from "@material-ui/core/Box";

import appLogo from "../../assets/images/logo.svg";
import Curves from "../Curves";
import "./styles.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("userDetails")
  );

  const handleAuthentication = (event) => {
    if (isLoggedIn) {
      event.preventDefault();
      localStorage.removeItem("userDetails");
      setIsLoggedIn(false);
    }
  };

  return (
    <nav>
      <Box className="app-header">
        <img src={appLogo} alt="Brand"></img>
        <a href="/signup" onClick={handleAuthentication}>
          {isLoggedIn ? "Logout" : " Signup"}
        </a>
      </Box>
      <Curves />
    </nav>
  );
};

export default Header;
