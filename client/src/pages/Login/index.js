import React from "react";
import { useEffect } from "react";
import { LoginForm, BackButton } from "../../components";
import { Footer } from "../../layout";
import "./index.css"
export function Login() {
    
    useEffect(() => {
        localStorage.clear()
    }, [])

    return(
        <>
        <img id="login-reg-logo" src='https://i.ibb.co/StfbjGd/2022-05-06-6.png'/>
        <LoginForm />
        <BackButton />
        <Footer />
        </>
    )
}
