import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinRoomFeature, NavButton } from '../../components';

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
        <>
        
        <NavButton id="LoginBtnNav" value="Login" path="/Login"/>
        <NavButton id="RegisterBtnNav" value="Register" path="/Register"/>
        <NavButton id="HowItWorksBtn" value="How it Works" path="/HowItWorks"/>
        <JoinRoomFeature handleSubmit={handleSubmit}/> 
        </>
    )
}