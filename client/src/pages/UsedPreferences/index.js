import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components";
import { getPreferences } from "../../actions";
import { Footer } from "../../layout";


export function UsedPreferences() {

    const [ userPreferences, setUserPreferences ] = useState({})

    useEffect(() => {
        const getPref = async () => {
            const preferences = await getPreferences()
            console.log(preferences)
            if(preferences){
               setUserPreferences(preferences)
            }
        }
        getPref()
    },[])

    const navigateTo = useNavigate();

    const [players, setPlayers] = useState("2");

    const handleInput = (e) => {
        console.log(userPreferences)
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

    const renderHiddenInputs = () => {
        const genre = userPreferences.genre ? userPreferences.genre : ''
        let country = userPreferences.country ? userPreferences.country : ''
        const year = userPreferences.year ? userPreferences.year : ''
        const platform = userPreferences.platform ? userPreferences.platform : ''

        return (
            <>
                <input name="genre" value={genre} hidden/>
                <input name="year" value={year} hidden/>
                <input name="country" value={country} hidden/>
                <input name="platform" value={platform} hidden/>
            </>
        )
    }
   

    return (
        <>
        <form aria-label="form" id="UsedPrefForm" onSubmit={handleSubmit}>
            {renderHiddenInputs()}
            <label htmlFor="numPeople">Number of people:</label>
            <input type="number" name="numPeople" min="2" max="10" value={players || "2"} onChange={handleInput}/>
            <input type="submit" value="START" style={{cursor: 'pointer'}}/>          

        </form>
        <BackButton />
        <Footer />
        </>
    )
}
