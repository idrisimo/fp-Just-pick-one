import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleCategoryChange, handleCountryChange, handleYearChange, numberOfMovies, numberOfPeople } from "../../actions";

export const FilterMovies = (props) => {
  const { label, options } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(e.target.value));
        break;
      case "Year":
        dispatch(handleYearChange(e.target.value));
        break;
      case "Country":
        dispatch(handleCountryChange(e.target.value));
        break;
      case "Number of People":
        dispatch(numberOfPeople(e.target.value));
        break;
      case "Number of Movies":
        dispatch(numberOfMovies(e.target.value));
        break;
      default:
        return;
    }
  };

  return (
    <Box mt={3} width="100%">
      <FormControl size="small" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
