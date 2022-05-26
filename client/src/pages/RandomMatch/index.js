import React from "react";
import { useContext } from "react";
import { RandomMatchCard, NavButton } from "../../components";
import { useLogin } from "../../context/LoginProvider";


export function RandomMatch() {

    const {isLoggedIn} = useLogin()

    return isLoggedIn ? (
        <>
        <RandomMatchCard />
        <NavButton value="Finish" path='/UserAccount' />
        <NavButton value="Pick a different film" path="/WaitingRoom"/>
        </>
        ) : (
        <>
        <RandomMatchCard />
        <NavButton value="Finish" path='/' />
       
        </>
        
    )
}