import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { numberOfMovies } from "../../actions";

export const NumMovies = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(numberOfMovies(e.target.value));
  };

  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth size="small">
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Number of Movies"
          type="number"
          size="small"
        />
      </FormControl>
    </Box>
  );
};
