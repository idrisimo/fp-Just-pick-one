import React from "react";
import { useContext } from "react";
import { MatchCard, NavButton } from "../../components";
import { useLogin } from "../../context/LoginProvider";

export function UserMatch() {

    const {isLoggedIn} = useLogin()

    return isLoggedIn ? (
        <>
        <MatchCard />
        <NavButton value="Finish" path='/UserAccount' />
        <NavButton value="Pick a different film" path="/WaitingRoom"/>
        </>
        ) : (
        <>
        <MatchCard />
        <NavButton value="Finish" path='/' />
        </>
        
    )
}