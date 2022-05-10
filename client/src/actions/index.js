import React from "react";
//import jwt_decode from "jwt-decode"; //look at this later
import axios from "axios";

export const loginFunction = async (formInput) => {
    try {
        
        console.log(formInput)
        const response = await axios.post('https://just-pick-1-api.herokuapp.com/auth/login/', formInput) 
        const data = await response.data
        console.log(data)
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
    localStorage.setItem("token", data.tokens)
    localStorage.setItem('username',data.username)
}



export const registerFunction = async(formInput) => {
    try {

        const response = await axios.post('https://just-pick-1-api.herokuapp.com/auth/register/', formInput)
        const data = await response.data
        if (data.err){
            throw Error(data.err)
        }
        return "Successful registration"
    } catch(err) {
        return err.message
    }
}
