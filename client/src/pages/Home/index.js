import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinRoomFeature, NavButton } from '../../components';
import "./index.css";

export function Home() {

    const [roomID, setRoomID] = useState("")
    const navigateTo = useNavigate();
   
    const handleSubmit = e => {
        e.preventDefault();
        navigateTo("/WaitingRoom")
    }

    // updateInput = e => {
    //     const input = e.target.value;
    //     setRoomID(input);
    // }

    return (
        <div id="homepage-buttons-wrapper">
            <NavButton id="LoginBtnNav" data-testid="LoginBtnNav" value="Login" path="/Login"/>
            <NavButton id="RegisterBtnNav" value="Register" path="/Register"/>
            <NavButton id="HowItWorksBtn" value="How it Works" path="/HowItWorks"/><br/>
            <JoinRoomFeature handleSubmit={handleSubmit}/> 
        </div>
    )
}
