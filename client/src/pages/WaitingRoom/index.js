import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { BackButton, UserCard } from "../../components";
import { Container, FormControlLabel, Switch, FormGroup, Paper, Card, CardHeader, Grid } from '@mui/material'
import { maxWidth } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

export function WaitingRoom() {
    const location = useLocation()

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [movingOn, setMovingOn] = useState(false)
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [username, setUsername] = useState(location.state.username)
    const [roomCode, setRoomCode] = useState(location.state.roomCode)
    const [userList, setUserList] = useState([])
    // const [groupUsers, setGroupUsers] = useState([])
    const [partyReady, setPartyReady] = useState(false)

    const navigate = useNavigate();

    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/rooms/${roomCode}/`)

    // const client = new W3CWebSocket(`ws://just-pick-1-api.herokuapp.com/ws/rooms/${roomCode}/`)

    useEffect(() => {

        client.onopen = () => {
            console.log('Websocket client connected')
        }
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply!', dataFromServer)
            if (dataFromServer) {
                setMessages((messages) => messages.concat({
                    msg: dataFromServer.message,
                    username: dataFromServer.username,
                }))
                // console.log('data', dataFromServer)
                if (dataFromServer['userList']) {
                    console.log('userlist stuff')
                    console.log(userList)
                    console.log(dataFromServer['userList'])
                    // setUserList(dataFromServer['userList'])
                    setUserList((userList) => [...userList, dataFromServer['userList']])
                    
                    console.log(userList)
                }
            }

        }

    }, [])

    // useEffect(()=>{
    //     joinRoomHandler()
    // },[username])

    useEffect(() => {
        handleParty()
        // joinRoomHandler()
    }, [userList])

    const handleParty = () => {
        let counter = 0;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i]['isReady']) {
                counter++
            }
        }
        if (counter === userList.length && isLoggedIn && counter > 0) {
            // navigate('/filmswipe', { state: { roomCode: roomCode, username: username, userList: userList } })
        }
    }

    // Checks if use has left the page. Sends message to backend with current user list and the user that has disconnected.
    window.onbeforeunload = () => {
        if (!movingOn) {
            client.send(JSON.stringify({
                type: 'disconnect_user',
                userList: userList,
                'disconnectedUser': username
            }))
        }
    }

    const joinRoomHandler = () => {
        let newList = userList
        console.log('join room')
        console.log(userList)
        console.log(newList)
        if(newList.includes(username, 0)){
            console.log('user exists')
        } else{
            let newList = userList
        
            newList.push({ 'username': username, 'isReady': false })
            // newList.push(serverList)
            console.log(newList)
           client.onopen = () => client.send(JSON.stringify({
                type: 'known_users',
                userList: newList
            }))
        }

        // e.preventDefault()
    }

    const handleReadyUp = (e) => {
        const checked = e.target.checked
        const checkedUser = e.target.value

        const newList = userList.map(user => {
            if (user.username === checkedUser) {
                return { ...user, isReady: checked }
            }
            return user;
        })
        // setUserList(newList)
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

                        <form onSubmit={(e) => {
                            // setRoomCode(e.target[0].value)
                            setIsLoggedIn(true)
                            // joinRoomHandler(e)
                        }}>
                            <input id="username" type="text" size="20" onChange={e => setUsername(e.target.value)}></input>
                            <br></br>
                            <input id="room-name-input" type="text" size="20" onChange={e => setRoomCode(e.target.value)} ></input>
                            <br></br>
                            <input id="room-name-submit" type="submit" value="join room"></input>
                        </form>
                    </div>
                }
                <BackButton />
            </div>
        </Grid>
    )
}
