import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup({ value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset" className="mt-3">
      <FormLabel component="legend">How did you hear about us ?</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        className="mt-3"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="linkedin"
          control={<Radio />}
          label="Linkedin"
        />
        <FormControlLabel
          value="facebook"
          control={<Radio />}
          label="Facebook"
        />
        <FormControlLabel
          value="instagram"
          control={<Radio />}
          label="Instagram"
        />
        <FormControlLabel
          value="news"
          control={<Radio />}
          label="News Article"
        />
      </RadioGroup>
    </FormControl>
  );
}
