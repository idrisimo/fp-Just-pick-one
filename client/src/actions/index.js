import React from "react";
//import jwt_decode from "jwt-decode"; //look at this later
import axios from "axios";

export const loginFunction = async (e) => {
    try {
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await axios.post('http://127.0.0.1:8000/Login', userData) //change on deployment - not currently working
        const data = await response.data
        if (data.err){
            throw Error(data.err)
        }
        login(data)
    } catch(err) {
        console.warn(err);
    }
}


function login(data) {
    localStorage.setItem("token", data.token)
}



export const registerFunction = async(e) => {
    try {
        const userData = {
            username: e.taget.username.value,
            password: e.target.password.value
        }

        const response = await axios.post('http://127.0.0.1:8000/Register', userData)
        const data = await response.data
        if (data.err){
            throw Error(data.err)
        }
    } catch(err) {
        console.warn(err)
    }
}