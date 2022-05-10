import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import './FilmSwipe.css'
import { Card, CardMedia, Container } from '@mui/material';
import useAxios from "../../hooks/useAxios";

export function FilmSwipe() {

    const { response, error, loading } = useAxios({ url: "http://127.0.0.1:8000/get_movies/" })
    console.log(response)
    const [lastDirection, setLastDirection] = useState('')
    const [movieData, setMovieData] = useState([])
    const [likedMovies, setLikedMovies] = useState([])

    useEffect(()=> {
        if(response !== null) {
            setMovieData(response['results'])
        }
    }, [response])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }
    return (
        <div>
                        <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
            <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
            <h1>React Tinder Card</h1>

            <div>
            <Container className="tinderCards__cardContainer">
                {movieData.map((movie) =>
                    <TinderCard className="swipe" key={movie.id} onSwipe={(dir) => swiped(dir, movie.id)} onCardLeftScreen={() => outOfFrame(movie.id)}>

                        <Card className="card">
                            <CardMedia component="img"
                            height="100%"
                            image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}/>
                            <h4 className="overlay">{movie.title}</h4>
                            {/* Buttons */}
                        </Card>
                    </TinderCard>
                )}
            </Container>
        </div>

            {lastDirection ? <h2>You swiped {lastDirection}</h2> : <h2 />}
        </div>
    )
}
