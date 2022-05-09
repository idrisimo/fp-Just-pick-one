import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from 'websocket'


export function WaitingRoom() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [username, setUsername] = useState('')
    const [roomCode, setRoomCode] = useState('test')
    const [userList, setUserList] = useState([])
    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/rooms/${roomCode}/`)

    useEffect(() => {
        client.onopen = () => {
            console.log('Websocket client connected')
            // client.send(JSON.stringify({
            //     type:'known_users',
            //     userList: userList
            // }))
        }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply!', dataFromServer)
            if (dataFromServer) {
                setMessages((messages) => messages.concat({
                    msg: dataFromServer.message,
                    username: dataFromServer.username,
                }))
                console.log(dataFromServer['userList'])
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
        setValue('')
        e.preventDefault()
    }

    const joinRoomHandler = (e) => {
        // console.log('userlist: ',userList)
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
                    {messages.map(message => <div key={Math.random()}><p>{message['username']}</p><p>{message['msg']}</p></div>)}<br></br>
                    <input id="chat-message-input" type="text" size="100" value={value} onChange={e => setValue(e.target.value)}></input><br></br>
                    <input id="chat-message-submit" type="button" value="Send" onClick={onButtonClicked}></input>
                </div>
                :
                // Lobby Selection
                <div>
                    What chat room would you like to enter?<br></br>
                    <input id="username" type="text" size="20" onChange={e =>
                        setUsername(e.target.value)
                    }></input><br></br>
                    <input id="room-name-input" type="text" size="20" onChange={e =>
                        setRoomCode(e.target.value)
                    }></input><br></br>
                    <input id="room-name-submit" type="button" value="Enter" onClick={(e) => {
                        setIsLoggedIn(true)
                        joinRoomHandler(e)
                    }}></input>
                </div>
            }
        </div>
    )
}
