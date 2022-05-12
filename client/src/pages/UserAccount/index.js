import React from "react";
import { useLogin } from "../../context/LoginProvider";
import { NavButton, LogoutButton, JoinRoomFeature } from "../../components";
import { Footer } from "../../layout";
import { Home } from "../Home";

export function UserAccount() {

    // const {isLoggedIn} = useLogin()
    return (
        <>
        <NavButton id="newBtn" value="Start new Game" path="/StreamingService"/>
        <NavButton id="prefBtn" value="Use previous preferences" path="/UsedPreferences"/>
        <NavButton id="editBtn" value="Edit previous preferences" path="/EditPreferences"/>
        <JoinRoomFeature />
        <NavButton id="HowItWorksBtn" value="How it Works" path="/HowItWorks"/>
        <LogoutButton/>
        <Footer />
        </>
    )

    // return isLoggedIn ? (
    //     <>
    //     <NavButton id="newBtn" value="Start new Game" path="/StreamingService"/>
    //     <NavButton id="prefBtn" value="Use previous preferences" path="/UsedPreferences"/>
    //     <NavButton id="editBtn" value="Edit previous preferences" path="/EditPreferences"/>
    //     <JoinRoomFeature />
    //     <NavButton id="HowItWorksBtn" value="How it Works" path="/HowItWorks"/>
    //     <LogoutButton/>
    //     </>
    // ) : (
    //     <Home />
    // )
}
