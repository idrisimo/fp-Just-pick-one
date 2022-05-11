import React from "react";
import { useEffect } from "react";
import { LoginForm, BackButton } from "../../components";

export function Login() {
    
    useEffect(() => {
        localStorage.clear()
    }, [])

    return(
        <>
        <LoginForm />
        <BackButton />
        </>
    )
}