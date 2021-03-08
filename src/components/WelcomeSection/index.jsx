import React from "react";
import Grid from "@material-ui/core/Grid";
import welcomeIllustration from "../../assets/images/welcome.png";

const WelcomeSection = () => {
  let userDetails = localStorage.getItem("userDetails");
  let name = "Alien";

  try {
    name = JSON.parse(userDetails).name;
  } catch (error) {
    name = "Alien";
  }

  return (
    <Grid container spacing={6} alignItems="center" className="mw-100 m-0">
      <Grid container item md={6} sm={6} lg={6} xs={12} justify="center">
        <Grid item className="text-gray fw-400 text-gray">
          <h1>Welcome {name}!</h1>
        </Grid>
      </Grid>
      <Grid item md={6} sm={6} lg={6} xs={12}>
        <img
          src={welcomeIllustration}
          alt="Welcome Illustration"
          className="mw-100"
        />
      </Grid>
    </Grid>
  );
};

export default WelcomeSection;
