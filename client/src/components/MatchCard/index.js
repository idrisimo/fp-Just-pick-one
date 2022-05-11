import { Card, CardMedia } from "@mui/material";
import React from "react";

export function MatchCard(props) {
  const { movie } = props;

  return (
    <>
      <main id="matchMain">
        <div className="matchCard" id="userMatch">
          <h1 className="matchTitle">It's a Match!</h1>
          <h3>You have picked...</h3>
          <Card className="card">
            <CardMedia
              component="img"
              height="100%"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <h4 className="overlay">{movie.title}</h4>
          </Card>
        </div>
      </main>
    </>
  );
}
