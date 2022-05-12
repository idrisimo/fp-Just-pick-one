import React from "react";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {

    const navigateTo = useNavigate();

    const logoutFunction = () => {
        localStorage.clear()
    }

    const handleLogout = async () => {
        await logoutFunction();
        navigateTo('/')
    }

    return(
        <input type="submit" id="logoutBtn" value="Logout" style={{cursor: 'pointer'}} onClick={handleLogout}/>
       
    )
}