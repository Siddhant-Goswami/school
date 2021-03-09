import React from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

import appLogo from "../../assets/images/logo.svg";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import twitter from "../../assets/images/twitter.svg";

import Curves from "../Curves";
import "./styles.css";

const Footer = () => {
  return (
    <Grid
      container
      spacing={6}
      alignItems="center"
      className="mw-100 m-0 p-0 app-footer"
    >
      <Grid container item md={5} sm={5} lg={5} xs={12} justify="center">
        <Grid item className="text-gray" className="fw-400 text-gray">
          <Box display="flex" flexDirection="column">
            <img src={appLogo} alt="app-logo" className="footer-logo"></img>
            <Box className="text-gray footer-text" mt={2}>
              Newton School is a platform to learn and develop skills that
              <br /> you need for your best Tech career. We boost up your skills
              <br />
              and prepare you for your dream job.
            </Box>
            <Box
              display="flex"
              direction="row"
              justifyContent="flex-start"
              mt={2}
            >
              <img src={facebook} alt="facebook"></img>
              <img src={instagram} alt="instagram"></img>
              <img src={twitter} alt="twitter"></img>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item md={6} sm={6} lg={6} xs={12}>
        <Box display="flex" flexDirection="column">
          <Box className="footer-link">About Us</Box>
          <Box className="footer-link">Contact Us</Box>
          <Box className="footer-link">Terms and Conditions</Box>
          <Box mt={3} className="footer-link">
            Blog
          </Box>
          <Box mt={3} className="footer-link">
            FAQ
          </Box>
          <Box className="footer-link">Privacy Policy</Box>
        </Box>
      </Grid>
      <Grid
        container
        item
        md={12}
        sm={12}
        lg={12}
        xs={12}
        justify="center"
        className="p-0"
      >
        <Grid item className="text-gray" className="fw-400 text-gray">
          <Curves footer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
