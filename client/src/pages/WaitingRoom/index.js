import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { BackButton, UserCard } from "../../components";
import { Container, FormControlLabel, Switch, FormGroup, Paper, Card, CardHeader, Grid } from '@mui/material'
import { maxWidth } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import {Footer} from '../../layout'


export function WaitingRoom({}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [movingOn, setMovingOn] = useState(false)
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [username, setUsername] = useState('idris')
    const [roomCode, setRoomCode] = useState('test')
    const [userList, setUserList] = useState([])
    const [partyReady, setPartyReady] = useState(false)


    const navigate = useNavigate();
    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/rooms/${roomCode}/`)
    // const client = new W3CWebSocket(`ws://just-pick-1-api.herokuapp.com/ws/rooms/${roomCode}/`)

    useEffect(() => {
        client.onopen = () => {
            console.log('Websocket client connected')
        }

        client.onmessage = (message) => {
            console.log('onmessage')
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply!', dataFromServer)
            if (dataFromServer) {
                setMessages((messages) => messages.concat({
                    msg: dataFromServer.message,
                    username: dataFromServer.username,
                }))
                if (dataFromServer['userList']) {
                    setUserList(dataFromServer['userList'])
                }
                if(dataFromServer['winningMovie']){
                    console.log('test')
                    localStorage.clear()
                    localStorage.setItem('test', dataFromServer['winningMovie'])
                    localStorage.setItem('winningMovieTitle', dataFromServer['winningMovie'].title)
                    localStorage.setItem('winningMoviePoster_path', dataFromServer['winningMovie'].poster_path)
                }
            }
            console.log('endof onmessage')
        }
        client.onclose = () => {
            client.close()
        }


    }, [])
    useEffect(() => {
        handleParty()
    }, [userList])

    const handleParty = () => {
        let counter = 0;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i]['isReady']) {
                counter++
            }
        }
        if (counter === userList.length && isLoggedIn && counter > 0) {
            setMovingOn(false)
            // client.onclose = () => client.close()
            navigate('/filmswipe', { state: { roomCode: roomCode, username: username, userList: userList} })
        }
    }

    // Checks if use has left the page. Sends message to backend with current user list and the user that has disconnected.
    window.onbeforeunload = () => {
        client.send(JSON.stringify({
            type: 'disconnect_user',
            userList: userList,
            'disconnectedUser': username
        }))
        // if (!movingOn) {
        //     client.send(JSON.stringify({
        //         type: 'disconnect_user',
        //         userList: userList,
        //         'disconnectedUser': username
        //     }))
        // }
    }

    const joinRoomHandler = (e) => {
        let newList = userList
        console.log('join handler')
        newList.push({'username':username, 'isReady': false})
        setUserList(newList)
        client.send(JSON.stringify({
            type: 'known_users',
            userList: newList
        }))
        e.preventDefault()
        console.log('endof join handler')
    }

    const handleReadyUp = (e) => {
        const checked = e.target.checked
        const checkedUser = e.target.value

        const newList = userList.map(user => {
            if(user.username === checkedUser) {
                return {...user, isReady: checked}
            }
            return user;
        })
        setUserList(newList)
        client.send(JSON.stringify({
            type: 'known_users',
            userList: newList
        }))
    }


    return (
        <Grid container spacing={0} diretion="column" alignItems="center" justifyContent="center" style={{ minHeight: '60vh' }}>
            <div>
                {isLoggedIn ?
                    // Chatroom
                    <Grid item>
                        <Card style={{ minWidth: '90vw' }}>
                            <h3>{username}</h3>
                            <CardHeader align="center" title='Connected Users' />
                            <Grid container spacing={0} diretion="column" alignItems="center" justifyContent="center">

                                <FormGroup>
                                    {userList.map(user =>
                                        <FormControlLabel key={user.username} value={user.username} control={<Switch checked={user.isReady} onChange={handleReadyUp} color='success' />} labelPlacement="start" label={user.username} />
                                        // <UserCard key={Math.random()} username={user}/>
                                    )}
                                </FormGroup>
                            </Grid>
                        </Card>
                    </Grid>
                    :
                    // Lobby Selection
                    <div>
                        What chat room would you like to enter?<br></br>
                        <input id="username" type="text" size="20" onChange={e => setUsername(e.target.value)}></input>
                        <br></br>
                        <input id="room-name-input" type="text" size="20" value={roomCode ?? ''} onChange={e => setRoomCode(e.target.value)}></input>
                        <br></br>
                        <input id="room-name-submit" type="button" value="Enter" onClick={(e) => {
                            setIsLoggedIn(true)
                            joinRoomHandler(e)
                        }}></input>
                    </div>
                }
                <BackButton />
            </div>
            <Footer/>
        </Grid>

    )
}
