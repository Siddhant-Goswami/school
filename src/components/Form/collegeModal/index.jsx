import React from "react";
import { Modal } from "react-responsive-modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import collegeIcon from "../../../assets/images/college.png";

const CollegeModal = ({ open, setOpen, handleCollege }) => {
  const [college, setCollege] = React.useState("");
  const [city, setCity] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCollege(college + " " + city);
    setOpen(false);
    console.log("college, city", college, city);
  };

  return (
      <Modal
        classNames={{
          modal: "custom-modal",
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit} className="college-form">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid>
              <img
                src={collegeIcon}
                alt="Welcome Illustration"
                className="mw-100"
              />
            </Grid>

            <h3>Enter your college details</h3>
          </Grid>
          <TextField
            required
            color="primary"
            style={{ marginTop: "1em" }}
            margin="dense"
            variant="outlined"
            type="text"
            value={college}
            label="College name"
            onChange={(input) => setCollege(input.target.value)}
          />
          <TextField
            required
            color="primary"
            style={{ marginTop: "1em" }}
            margin="dense"
            variant="outlined"
            type="text"
            value={city}
            label="City"
            onChange={(input) => setCity(input.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "rgba(35, 118, 229, 1)",
              marginTop: "1em",
            }}
          >
            Submit & continue
          </Button>
        </form>
      </Modal>
  );
};
export default CollegeModal;
