import React from "react";
//import jwt_decode from "jwt-decode"; //look at this later
import axios from "axios";

export const loginFunction = async (e) => {
    try {
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await axios.post('http://localhost:8000/auth/login', userData) 
        const data = await response.data
        if (data.err){
            throw Error(data.err)
        }
        login(data)
        return "Successful Login"
    } catch(err) {
       return err.message
    }
}


function login(data) {
    localStorage.setItem("token", data.token)
}



export const registerFunction = async(e) => {
    try {
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await axios.post('http://localhost:8000/auth/register/', userData)
        const data = await response.data
        if (data.err){
            throw Error(data.err)
        }
        return "Successful registration"
    } catch(err) {
        return err.message
    }
}