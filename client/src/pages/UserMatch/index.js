import React from "react";
import { useContext } from "react";
import { MatchCard, NavButton } from "../../components";
import { useLogin } from "../../context/LoginProvider";
import { Container } from '@mui/material';
import './UserMatch.css'
import useAxios from "../../hooks/useAxios";


export function UserMatch() {

    const {isLoggedIn} = useLogin()

    const movieId = 553; //most voted movie to be called

    const {response, error, loading } = useAxios({ url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=63776e21ed364fcdaf334b748b8924eb`});

    return (
        <>
        <MatchCard movie={response} />
        <NavButton value="Finish" path={isLoggedIn ? '/UserAccount' : '/'} />
        { isLoggedIn ? <NavButton value="Pick a different film" path="/WaitingRoom"/> : null }
        </>
    );
}
