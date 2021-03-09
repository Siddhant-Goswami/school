import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import debounce from "lodash.debounce";
import CreatableSelect from "react-select/creatable";

import { validateForm } from "../../utils";
import RadioButtonsGroup from "../RadioButton";
import { fetchCollegeListing } from "../../services/college.service";
import CollegeModal from "./collegeModal";
import "./styles.css";

function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [] // will recreate if mounted
  );
  return debouncedFn;
}

function SignupForm({ title }) {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [collegeList, setCollegeList] = useState([]);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("2020-10-09");
  const [value, setValue] = useState("female");
  const [openSecond, setOpenSecond] = React.useState(false);
  const [collegeOffset, setCollegeOffset] = React.useState(0);
  const [collegeCount, setCollegeCount] = React.useState(0);
  const [selectedCollege, setSelectedCollege] = React.useState(null);
  const resultsPerScroll = 10;

  let history = useHistory();

  useEffect(() => {
    getPaginatedColleges(0, "");
  }, [collegeOffset]);

  const debouncedSave = useDebounce(
    (nextValue) => searchCollege(nextValue),
    1000
  );

  const searchCollege = (query) => {
    fetchCollegeListing(query, resultsPerScroll, 0)
      .then((res) => {
        setCollegeList(res.data.results);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleCollege = (input) => {
    setCollege(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name,
      college,
      email,
      date,
    };
    if (validateForm(userDetails)) {
      history.push("/");
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } else alert("Error");
  };

  const collegeOptions = collegeList.map((college) => ({
    label: college.name,
    value: college.slug,
  }));

  const getPaginatedColleges = (offset = 0, query = "") => {
    fetchCollegeListing(college, resultsPerScroll, collegeList.length)
      .then((res) => {
        setCollegeList([...res.data.results, ...collegeList]);
        if (collegeCount === 0) setCollegeCount(res.data.count);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleCollegeChange = (input) => {
    setCollege(input);
    debouncedSave(input);
  };

  const renderForm = () => {
    return (
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h4>{title}</h4>
        </div>
        <TextField
          required
          fullWidth
          color="primary"
          className="mt-3"
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
          className="mt-3"
          margin="dense"
          variant="outlined"
          type="email"
          value={email}
          label="Email"
          onChange={(input) => setEmail(input.target.value)}
        />
        <TextField
          required
          fullWidth
          color="primary"
          className="mt-3"
          margin="dense"
          variant="outlined"
          type="date"
          value={date}
          label="Date of Birth"
          onChange={(input) => setDate(input.target.value)}
        />
        <CreatableSelect
          isClearable
          className="mt-3"
          value={selectedCollege}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          onMenuScrollToBottom={() => {
            setCollegeOffset((collegeOffset) => collegeOffset + 10);
          }}
          onChange={(newVal) => {
            if (newVal) {
              setSelectedCollege(newVal);
            } else {
              setSelectedCollege(null);
            }
          }}
          onCreateOption={() => {
            setOpenSecond(true);
          }}
          onInputChange={handleCollegeChange}
          options={collegeOptions}
          value={selectedCollege}
        />

        <RadioButtonsGroup value={value} setValue={setValue} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-3"
          style={{ backgroundColor: "rgba(35, 118, 229, 1)", padding: "0.6em" }}
        >
          Sign up
        </Button>
      </form>
    );
  };

  return (
    <div className="signup-box">
      <CollegeModal
        open={openSecond}
        setOpen={setOpenSecond}
        handleCollege={handleCollege}
        setSelectedCollege={setSelectedCollege}
      />
      {renderForm()}
    </div>
  );
}

export default SignupForm;

