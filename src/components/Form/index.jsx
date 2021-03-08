import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debounce from "lodash.debounce";

import { validateForm } from "../../utils";
import RadioButtonsGroup from "../RadioButton";
import { fetchCollegeListing } from "../../services/college.service";
import CollegeModal from "./collegeModal";
import "./styles.css";


function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [] 
  );
  return debouncedFn;
}

function SignupForm({ title }) {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("Select");
  const [collegeList, setCollegeList] = useState([]);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("2020-10-09");
  const [value, setValue] = useState("female");
  const [showCollegeModal, setOpenCollegeModal] = React.useState(false);

  let history = useHistory();

  useEffect(() => {
    getAllColleges();
  }, []);

  const getAllColleges = () => {
    fetchCollegeListing()
      .then((response) => {
        if (response.data && response.data.results.length !== 0)
          setCollegeList([
            ...response.data.results,
            { slug: "cannot-find-college", name: "Cannot Find College" },
          ]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const debouncedSave = useDebounce(
    (nextValue) => searchCollege(nextValue),
    1000
  );

  const searchCollege = (query) => {
    fetchCollegeListing(query)
      .then((response) => {
        if (response.data && response.data.results.length !== 0)
          setCollegeList([...response.data.results]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleCollegeChange = (input) => {
    if (isNaN(input.target.value)) {
      if (input.target.value === "Cannot Find College") {
        setOpenCollegeModal(true);
      } else {
        setCollege(input.target.value);
        debouncedSave(input.target.value);
      }
    } else {
      if (input.target.innerText === "Cannot Find College") {
        setOpenCollegeModal(true);
      } else {
        setCollege(input.target.innerText);
      }
    }
  };

  const handleCollege = (input) => {
    setCollege(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      name,
      college,
      email,
      date,
    };
    if (validateForm(userDetails)) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      history.push("/");
    } else alert("Error: Something went wrong!");
  };

  const renderForm = () => {
    return (
      <form style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
          <h4>{title}</h4>
        </Grid>
        <TextField
          required
          fullWidth
          color="primary"
          style={{ marginTop: "1em" }}
          margin="dense"
          variant="outlined"
          type="text"
          value={name}
          label="Full name"
          onChange={(input) => setName(input.target.value)}
        />
        <TextField
          required
          fullWidth
          color="primary"
          style={{ marginTop: "1em" }}
          margin="dense"
          variant="outlined"
          type="text"
          value={email}
          label="Email"
          onChange={(input) => setEmail(input.target.value)}
        />
        <TextField
          required
          fullWidth
          color="primary"
          style={{ marginTop: "1em" }}
          margin="dense"
          variant="outlined"
          type="date"
          value={date}
          label="Date of Birth"
          onChange={(input) => setDate(input.target.value)}
        />
        <Autocomplete
          id="college"
          required
          fullWidth
          options={collegeList}
          getOptionLabel={(option) => option.name}
          style={{ marginTop: "1em" }}
          onInputChange={(input) => handleCollegeChange(input)}
          renderInput={(params) => (
            <TextField {...params} label="College" variant="outlined" />
          )}
        />
        <RadioButtonsGroup value={value} setValue={setValue} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ backgroundColor: "rgba(35, 118, 229, 1)", marginTop: "1em" }}
        >
          Sign up
        </Button>
      </form>
    );
  };

  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
      <CollegeModal
        open={showCollegeModal}
        setOpen={setOpenCollegeModal}
        handleCollege={handleCollege}
      />
      {renderForm()}
    </Grid>
  );
}

export default SignupForm;