import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import './FilmSwipe.css'
import { Card, CardMedia, Container, Button } from '@mui/material';
import useAxios from "../../hooks/useAxios";
import useAxiosPost from "../../hooks/useAxiosPost";
import { useLocation } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { MatchCard } from "../../components";

export function FilmSwipe() {


    const { response, error, loading } = useAxiosPost({
        url: "http://127.0.0.1:8000/get_movies/",
        header: JSON.stringify({
            "Access-Control-Allow-Origin": "*"
        }),
        body: JSON.stringify({
            genre: '35'
        })
    })


    const [roomCode, setRoomCode] = useState('bob')
    const [username, setUsername] = useState('')
    const [userList, setUserList] = useState([])

    const [numMoviesLeft, setNumMoviesLeft] = useState(20)
    const [lastDirection, setLastDirection] = useState('')
    const [movieData, setMovieData] = useState([])
    const [likedMovies, setLikedMovies] = useState([])
    const [groupMovies, setGroupMovies] = useState([])
    const [isDone, setIsDone] = useState(false)
    const [winningMovie, setWinningMovie] = useState({})


    const location = useLocation()

    useEffect(() => {
        setRoomCode(location.state.roomCode)
        setUsername(location.state.username)
        setUserList(resetUserList(location.state.userList))
    }, [])

    const resetUserList = (userList) => {
        const newList = userList.map((user) => {return {...user, isReady: false}})
        return newList
    } 

    useEffect(() => {
        if (response !== null) {
            setMovieData(response['results'])
        }
    }, [response])

    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/rooms/${roomCode}/`)

    useEffect(() => {
        client.onopen = () => {
            console.log('Websocket client connected')
        }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply!', dataFromServer)
            if (dataFromServer) {
                if (dataFromServer['groupMovies']) {
                    setGroupMovies(dataFromServer['groupMovies'])
                }else if(dataFromServer['winningMovie']) {
                    setWinningMovie(dataFromServer['winningMovie'])
                    console.log(dataFromServer['winningMovie'])
                }
            }

        }
    }, [])


    const swiped = (direction, movieId) => {
        // console.log('removing: ' + movieId)
 
        setLastDirection(direction)
        if (direction === "right") {
            let updatedLikedMovies = likedMovies;
            updatedLikedMovies.push(movieId)
            setLikedMovies(updatedLikedMovies);
        }
        setNumMoviesLeft(prevCount => prevCount - 1)
    }

    const outOfFrame = (name) => {
        // console.log(name + ' left the screen!')
    }
    const handleUserFinished = () => {
        let newGroupList = groupMovies
        newGroupList.push({ 'username': username, 'likedMovies': likedMovies })
        setGroupMovies(newGroupList)
        client.send(JSON.stringify({
            type: 'selected_movies',
            groupMovies: newGroupList
        }))
        setIsDone(true)

        const newList = userList.map(user => {
            if(user.username === username) {
                return {...user, isReady: true}
            }
            return user;
        })
        setUserList(newList)

    }
    const handleTally = () => {
        client.send(JSON.stringify({
            type: 'movie_tally',
            groupMovies: groupMovies
        }))
    }
    const handleParty = () => {

        let counter = 0;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i]['isReady']) {
                counter++
            }
        }

        if (counter === userList.length && counter > 0) {
            client.onopen =()=>client.send(JSON.stringify({
                type: 'movie_tally',
                groupMovies: groupMovies,
                apiMovieList: movieData
            }))
        }
    }
    useEffect(() => {
        handleParty()
    }, [userList])

    // const handleWinning = () => {
    //    setWinningMovie(winningMovie)
    // }

    useEffect(() => {
        console.log(winningMovie)
    }, [winningMovie])

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
            <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
            <h1 className="recommendation" style={{ textAlign: 'center' }}>We recommend you:</h1>

            <div>
                {isDone ?

                    <MatchCard winMovie={winningMovie}/>
                    :
                    <Container  className="tinderCards__cardContainer">
                        {numMoviesLeft === 0 ? <Button variant="contained" onClick={() => {
                        handleUserFinished()
                        }}>Get Results!</Button>
                            :
                            ''
                        }
                        {movieData.map((movie) =>
                            <TinderCard className="swipe" key={movie.id} onSwipe={(dir) => swiped(dir, movie.id)} onCardLeftScreen={() => outOfFrame(movie.id)}>

                                <Card className="card">
                                    <CardMedia component="img"
                                        height="100%"
                                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                    <h4 className="overlay">{movie.title}</h4>

                                </Card>
                            </TinderCard>
                        )}
                    </Container>
                }
            </div>

            {lastDirection ? <h2 className="choice" style={{ textAlign: 'center' }}>You swiped {lastDirection}</h2> : <h2 />}
        </div>
    )
}
