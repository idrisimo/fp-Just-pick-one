import React from "react";

export function JoinRoomFeature(handleSubmit, updateInput) {

    return (
        <div id="joinForm">
        <form id="joinRoomForm" onSubmit={handleSubmit}>
            <label htmlFor="enterCode" id="codeLable"></label>
            <input type="text" placeholder="enter code here..."required onChange={updateInput}></input>
            <input type="submit" id="joinRoomBtn" value="Join Room" style={{cursor: "pointer"}}/>
        </form>
        </div>
    )
};