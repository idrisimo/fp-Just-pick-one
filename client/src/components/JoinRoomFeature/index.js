import React from "react";
import "./index.css"

export function JoinRoomFeature(handleSubmit, updateInput) {

    return (
        <div id="joinForm">
        <form id="joinRoomForm" onSubmit={handleSubmit}>
            <label htmlFor="enterCode" id="codeLable"></label>
            <input type="text" placeholder="Enter Your Code Here..."required onChange={updateInput}></input>
            <input type="submit" id="joinRoomBtn" value="Join Room" style={{cursor: "pointer"}}/>
        </form>
        </div>
    )
};
