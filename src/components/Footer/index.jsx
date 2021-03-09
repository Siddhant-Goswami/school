import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import appLogo from "../../assets/images/logo.svg";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import twitter from "../../assets/images/twitter.svg";

import Curves from "../Curves";
import "./styles.css";

const Footer = () => {
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid container md={6} sm={6} lg={6} xs={12}>
        <Grid>
          <img src={appLogo} alt="Brand" />
        </Grid>
        <Grid>
          <Typography variant="subtitle">
            Newton School is a platform to learn and develop skills that you
            need for your best Tech career. We boost up your skills and prepare
            you for your dream job.
          </Typography>
        </Grid>
        <Grid container direction="row">
          <Grid>
            <img src={facebook} alt="Brand" />
          </Grid>
          <Grid>
            <img src={instagram} alt="Brand" />
          </Grid>
          <Grid>
            <img src={twitter} alt="Brand" />
          </Grid>
        </Grid>
      </Grid>
      <Grid conatiner item md={6} sm={6} lg={6} xs={12} direction="column">
        <Grid>
          <a href="#">About us</a>
        </Grid>
        <Grid>
          <a href="#">Contact us</a>
        </Grid>
        <Grid>
          <a href="#">Terms and Conditions</a>
        </Grid>
      </Grid>
      <Grid>
        <Typography variant="subtitle2">
          © 2021 Incanus Technologies Pvt Ltd | All rights reserved.
        </Typography>
      </Grid>
      <Curves footer />
    </Grid>
  );
};

export default Footer;
