import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { BackButton, UserCard } from "../../components";

export function WaitingRoom() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [username, setUsername] = useState('')
    const [roomCode, setRoomCode] = useState('test')
    const [userList, setUserList] = useState([])
    // const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/rooms/${roomCode}/`)
    const client = new W3CWebSocket(`ws://just-pick-1-api.herokuapp.com/ws/rooms/${roomCode}/`)

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
                if(dataFromServer['userList']) {
                    setUserList(dataFromServer['userList'])
                }
            }

        }
    }, [])

    const onButtonClicked = (e) => {
        client.send(JSON.stringify({
            type: 'message',
            message: value,
            username: username
        }))

        e.preventDefault()
    }

    const joinRoomHandler = (e) => {
        let newList = userList
        newList.push(username)
        setUserList(newList)
        client.send(JSON.stringify({
            type: 'known_users',
            userList: newList
        }))
        e.preventDefault()
    }


    return (
        <div>
            {isLoggedIn ?
                // Chatroom
                <div>
                    <h3>Connected Users</h3>
                    <ul>
                    {userList.map(user => 
                        <UserCard key={Math.random()} username={user}/>
                    )}
                    </ul>

                    {messages.map(message => 
                    <div key={Math.random()}>
                        <p>{message['username']}</p>
                        <p>{message['msg']}</p>
                    </div>
                    )}
                    <br></br>
                    <input id="chat-message-input" type="text" size="100"  onChange={e => setValue(e.target.value)}></input>
                    <br></br>
                    <input id="chat-message-submit" type="button" value="Send" onClick={onButtonClicked}></input>
                </div>
                :
                // Lobby Selection
                <div>
                    What chat room would you like to enter?<br></br>
                    <input id="username" type="text" size="20" onChange={e =>setUsername(e.target.value)}></input>
                    <br></br>
                    <input id="room-name-input" type="text" size="20" value={roomCode ?? ''} onChange={e =>setRoomCode(e.target.value)}></input>
                    <br></br>
                    <input id="room-name-submit" type="button" value="Enter" onClick={(e) => {
                        setIsLoggedIn(true)
                        joinRoomHandler(e)
                    }}></input>
                </div>
            }
            <BackButton />
        </div>
    )
}
