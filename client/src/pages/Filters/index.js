import React from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Typography } from "@mui/material";
import { FilterMovies } from "../../components/FilterMovies";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './index.css';
import { NumMovies } from "../../components/NumMovies";
import { Footer } from "../../layout";

export const Filters = () => {
  const { response, error, loading } = useAxios({ url: "https://api.themoviedb.org/3/discover/movie?api_key=63776e21ed364fcdaf334b748b8924eb&language=en-US&include_adult=false&include_video=false&page=1b" });
  const {response1, error1, loading1 } = useAxios({ url: "https://api.themoviedb.org/3/genre/movie/list?api_key=63776e21ed364fcdaf334b748b8924eb&language=en-US" });

  const navigateTo = useNavigate();
  
  const dispatch = useDispatch
  if (loading) {
    return (
      <Box mt={20}>
        <h1>Pick your categories</h1>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something went wrong
      </Typography>
    );
  }

  const handleYearChange = [
    { id: "< 1950s", name: "< 1950s" },
    { id: "1950s", name: "1950s" },
    { id: "1960s", name: "1960s" },
    { id: "1970s", name: "1970s" },
    { id: "1980s", name: "1980s" },
    { id: "1990s", name: "1990s" },
    { id: "2000s", name: "2000s" },
    { id: "2010s", name: "2010s" },
    { id: "2020s", name: "2020s" },
    { id: "current", name: "Current" },
  ];

  const numberOfPeople = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" },
    { id: "4", name: "4" },
    { id: "5", name: "5" },
    { id: "6", name: "6" },
    { id: "7", name: "7" },
    { id: "8", name: "8" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateTo("/WaitingRoom");
  };

  
  return (
    <>
    <div className="background-color">
    <form  onSubmit={handleSubmit}>
      <h1>Movie Settings</h1>
        <div className="form-container">
          <FilterMovies options={handleYearChange} label="Year" />
          <FilterMovies options={numberOfPeople} label="Number of People" onChange={(e) => {dispatch(numberOfPeople(e.target.value))}}/>
          <NumMovies />
          <Box mt={3} width="30%">
            <Button fullWidth variant="contained" type="submit">
              Get Started
            </Button>
          </Box>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
};

// api to be added!!!!!!
//<FilterMovies options={response.certification_country} label="Country" />
//<FilterMovies options={response1.with_genres} label="Category" /> 
