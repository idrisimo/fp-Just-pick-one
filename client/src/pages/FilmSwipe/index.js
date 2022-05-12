import React, { useEffect, useInsertionEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import './FilmSwipe.css'
import { Button, Card, CardMedia, Container } from '@mui/material';
import useAxios from "../../hooks/useAxios";
import useAxiosPost from "../../hooks/useAxiosPost";
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { useLocation } from "react-router-dom";


export function FilmSwipe() {



    const [roomCode, setRoomCode] = useState('bob')
    const [username, setUsername] = useState('')
    const [userList, setUserList] = useState([])

    const [numMoviesLeft, setNumMoviesLeft] = useState(20)
    const [lastDirection, setLastDirection] = useState('')
    const [movieData, setMovieData] = useState([])
    const [likedMovies, setLikedMovies] = useState([])
    const [groupMovies, setGroupMovies] = useState([])

    const location = useLocation()

    useEffect(()=>{
        setRoomCode(location.state.roomCode)
        setUsername(location.state.username)
        setUserList(location.state.userList)
    },[])

    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/rooms/1${roomCode}/`)

    useEffect(() => {
        client.onopen = () => {
            console.log('Websocket client connected')
        }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply!', dataFromServer)
            if(dataFromServer){
                if (dataFromServer['groupMovies']) {
                    setGroupMovies(dataFromServer['groupMovies'])
                }
            }
            
        }
    }, [])


    // const { response, error, loading } = useAxios({ url: "http://127.0.0.1:8000/get_movies/" })
    const { response, error, loading } = useAxiosPost({
        url: "http://127.0.0.1:8000/get_movies/",
        header: JSON.stringify({
            "Access-Control-Allow-Origin": "*"
        }),
        body: JSON.stringify({
            genre: '35'
        })
    })

    useEffect(() => {
        if (response !== null) {
            setMovieData(response['results'])
        }
    }, [response])

    const swiped = (direction, movieId) => {
        console.log('removing: ' + movieId)
        setLastDirection(direction)

        if (direction === "right") {
            let updatedLikedMovies = likedMovies;
            updatedLikedMovies.push(movieId)
            setLikedMovies(updatedLikedMovies);
        }
        setNumMoviesLeft(prevCount =>prevCount - 1)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const handleUserFinished = (e) => {
        console.log('click')
        client.send(JSON.stringify({
            type: 'selected_movies',
            groupMovies: groupMovies
        }))
    }

    useEffect(() => {
        if (numMoviesLeft === 0) {
            //to send info to backend and loading
            let newGroupList = groupMovies
            newGroupList.push({ 'username': username, 'likedMovies': likedMovies })
            setGroupMovies(newGroupList)
            console.log(newGroupList)

        }
    }, [numMoviesLeft])

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
            <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
            <h1 className="recommendation" style={{ textAlign: 'center' }}>We recommend you:</h1>
            <div>{numMoviesLeft}</div>
            <Button variant="contained" onClick={()=> handleUserFinished()}>submit</Button>
            <div>
                <Container className="tinderCards__cardContainer">
                    {movieData.map((movie) =>
                        <TinderCard className="swipe" key={movie.id} onSwipe={(dir) => swiped(dir, movie.id)} onCardLeftScreen={() => outOfFrame(movie.id)}>
                            
                            <Card className="card">
                                <CardMedia component="img"
                                    height="100%"
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                <h4 className="overlay">{movie.title}</h4>
                                {/* Buttons */}
                            </Card>
                        </TinderCard>
                    )}
                </Container>
            </div>

            {lastDirection ? <h2 className="choice" style={{ textAlign: 'center' }}>You swiped {lastDirection}</h2> : <h2 />}
        </div>
    )
}
