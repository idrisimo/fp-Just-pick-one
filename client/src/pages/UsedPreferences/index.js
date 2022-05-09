import React, {useState} from "react";
import { BackButton } from "../../components";

export function UsedPreferences() {

    const [players, setPlayers] = useState("2");

    return (
        <>
        <form id="UsedPrefForm">
            <label htmlFor="numPeople">Number of people:</label>
            <input type="number" name="numPeople" min="2" max="10" value={players || "2"}/>
            <input type="submit" value="START" style={{cursor: 'pointer'}}/>          

        </form>
        <BackButton />
        </>
    )
}