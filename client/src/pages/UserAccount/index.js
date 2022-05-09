import React from "react";
import { NavButton, LogoutButton } from "../../components";

export function UserAccount() {

    return(
        <>
        <NavButton id="newBtn" value="Start new Game" path="/StreamingService"/>
        <NavButton id="prefBtn" value="Use previous preferences" path="/UsedPreferences"/>
        <NavButton id="editBtn" value="Edit previous preferences" path="/EditPreferences"/>
        <NavButton id="HowItWorksBtn" value="How it Works" path="/HowItWorks"/>
        <LogoutButton/>
        </>
    )
}