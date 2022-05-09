import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components";


export function UsedPreferences() {

    const navigateTo = useNavigate();

    const [players, setPlayers] = useState("2");

    const handleInput = (e) => {
        const input = e.target.value;
        return setPlayers((prev) => ({ ...prev, [e.target.name]:input }))
    }

    const handleSubmit = (e) => {
        try{
            console.log(players)
            e.preventDefault();
            navigateTo('/HostWaitingRoom')
        } catch(err){
            setError(err.message)
        }
    }

    return (
        <>
        <form id="UsedPrefForm" onSubmit={handleSubmit}>
            <label htmlFor="numPeople">Number of people:</label>
            <input type="number" name="numPeople" min="2" max="10" value={players || "2"} onChange={handleInput}/>
            <input type="submit" value="START" style={{cursor: 'pointer'}}/>          

        </form>
        <BackButton />
        </>
    )
}