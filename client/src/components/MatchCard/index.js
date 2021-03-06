import { Card, CardMedia, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

export function MatchCard({ winMovie }) {

  console.log("win movie: ", winMovie)

  return (
    <>
      <main id="matchMain">
        <div className="matchCard" id="userMatch">
          <h1 className="matchTitle">It's a Match!</h1>
          <h3>You have picked...</h3>
          <Card className="card">
            <CardMedia component="img" height="100%" image={`https://image.tmdb.org/t/p/w500${localStorage.getItem('winningMoviePoster_path')}`}/>
            <h4 className="overlay">{localStorage.getItem('winningMovieTitle')}</h4>
          </Card>
        </div>
      </main>
    </>
  );
}
