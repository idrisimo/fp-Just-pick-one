import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";


const LoginContext = createContext();

export function LoginProvider({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </LoginContext.Provider>
};

export const useLogin = () => useContext(LoginContext);