import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { createPreferences, getPreferences } from "../../actions";


export function EditForm() {

   const [ loading, setLoading ] = useState(false)
   const [ userPreferences, setUserPreferences ] = useState({})
   const [ prefStatus, setPrefStatus ] = useState(false)
   const [ formInput, setFormInput ] = useState({
      "genre": null,
      "year": null,
      "country": null,
      "platform": null
   });

   const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

   const countries= [{"value": null, "name": "--No Country Preferences--"},{"value": "AL", "Albania": "Spain"},{"value": "AT", "name": "Austria"},{"value": "BY", "name": "Belarus"},{"value": "BE", "name": "Belgium"},{"value": "BA", "name": "Bosnia and Herzegovina"},{"value": "BG", "name": "Bulgaria"},{"value": "HR", "name": "Croatia"},{"value": "CY", "name": "Cyprus"},{"value": "CZ", "name": "Czech Republic"},{"value": "DK", "name": "Denmark"},{"value": "EE", "name": "Estonia"},{"value": "FI", "name": "Finland"},{"value": "FR", "name": "France"},{"value": "DE", "name": "Germany"},{"value": "GI", "name": "Gibraltar"},{"value": "GR", "name": "Greece"},{"value": "HU", "name": "Hungary"},{"value": "IS", "name": "Iceland"},{"value": "IE", "name": "Ireland"},{"value": "IT", "name": "Italy"},{"value": "LV", "name": "Latvia"},{"value": "LT", "name": "Lithuania"},{"value": "LU", "name": "Luxembourg"},{"value": "MK", "name": "Macedonia"},{"value": "MT", "name": "Malta"},{"value": "MD", "name": "Moldova"},{"value": "MC", "name": "Monaco"},{"value": "ME", "name": "Montenegro"},{"value": "NL", "name": "Netherlands"},{"value": "NO", "name": "Norway"},{"value": "PL", "name": "Poland"},{"value": "PT", "name": "Portugal"},{"value": "RO", "name": "Romania"},{"value": "RS", "name": "Serbia"},{"value": "SK", "name": "Slovakia"},{"value": "SI", "name": "Slovenia"},{"value": "ES", "name": "Spain"},{"value": "SE", "name": "Sweden"},{"value": "CH", "name": "Switzerland"},{"value": "UA", "name": "Ukraine"},{"value": "GB", "name": "United Kingdom"},{"value": "RS", "name": "Yugoslavia"}]
   
   const platforms = [{"provider_id": 8,"provider_name": "Netflix"},{"provider_id": 9,"provider_name": "Amazon Prime"},{"provider_id": 337,"provider_name": "Disney +"},{"provider_id": 350,"provider_name": "Apple TV"},{"provider_id": 188,"provider_name": "Youtube Premium"},{"provider_id": 15,"provider_name": "Hulu"},{"provider_id": 210,"provider_name": "Sky"},{"provider_id": 531,"provider_name": "Paramount +"}]



   useEffect( () => {
      const getPref = async () => {
         const preferences = await getPreferences()
         if(preferences){
            setUserPreferences(preferences)
            setPrefStatus(true)
         }
         // await getPlatformsByCountry()
      }
      getPref()
   }, []);

   const updateInput = e => {
      const input = e.target.value;
      return setFormInput((prev) => ({ ...prev, [e.target.name]: input }))
   }

   const handleSubmit = async(e) => {
      e.preventDefault();
      try{
         setLoading(true);
         const newPreferences = await createPreferences(formInput)
         if (newPreferences === "Successful"){
            window.location.reload()
         } else {
            throw new Error('Impossible to save new preferences!')
         }
      } catch(err) {
         setLoading(false)        
      }
   }

   const renderUserPreferences = () => {
      const genre = userPreferences.genre ? userPreferences.genre.split(",") : "Any"
      let country = userPreferences.country ? userPreferences.country : "Any"
      const year = userPreferences.year ? userPreferences.year : "Any"
      const platform = userPreferences.platform ? userPreferences.platform.split(",") : "Any"
      let genreNames = ""
      let platformNames = ""

      if(genre!=="Any"){
         genre.map( code => {
            genreNames += `${genres.find( g => g.id == code).name},`
         })
         genreNames = genreNames.slice(0, -1)
      } else {
         genreNames = genre
      }

      if(country!="Any"){
         country = countries.find( c => c.value == country).name
      }

      if(platform!=="Any"){
         platform.map( code => {
            platformNames += `${platforms.find( p => p.provider_id == code).provider_name},`
         })
         platformNames = platformNames.slice(0, -1)
      } else {
         platformNames = platform
      }

      return (
         <>
            <h2>Your current preferences: </h2>
            <p>Genre(s): {genreNames}</p>
            <p>Country: {country}</p>
            <p>Year: {year}</p>
            <p>Platform(s): {platformNames}</p>
            <h2>Edit your preferences: </h2>
         </>   
      )
   }

   // If extra time: Next 2 functions could be reduced to 1
   const manageMultiGenreSelect = e => {
      const state = formInput
      const clickedValue = e.target.value
      if (state.genre){
         if (state.genre.includes(clickedValue)){
            const newValue = state.genre.replace(`,${clickedValue}`,'')
            return setFormInput((prev) => ({ ...prev, "genre": newValue }))
         } else {
            const newValue = state.genre+`,${clickedValue}`
            return setFormInput((prev) => ({ ...prev, "genre": newValue }))
         }
      } else {
          const newValue = clickedValue
          return setFormInput((prev) => ({ ...prev, "genre": newValue }))
      }
   }

   const manageMultiPlatformsSelect = e => {
      const state = formInput
      const clickedValue = e.target.value
      if (state.platform){
         if (state.platform.includes(clickedValue)){
            const newValue = state.platform.replace(`,${clickedValue}`,'')
            return setFormInput((prev) => ({ ...prev, "platform": newValue }))
         } else {
            const newValue = state.platform+`,${clickedValue}`
            return setFormInput((prev) => ({ ...prev, "platform": newValue }))
         }
      } else {
          const newValue = clickedValue
          return setFormInput((prev) => ({ ...prev, "platform": newValue }))
      }
   }

   const renderGenreOptions = () => {
      return genres.map(genre => <><input type="checkbox" aria-label="Genre" name="genre" value={genre.id} onClick={manageMultiGenreSelect}/>{genre.name}<br/></>)
   }
   
   const renderCountryOptions = () => {
      return countries.map( country => <><option value={country.value}>{country.name}</option></>)
   }

   // ************* FUTURE FEATURES **************
   // ** user will be able to choose platforms based on selected country (before submit)
   // const getPlatformsByCountry = async () => {
   //    if(formInput.country){
   //       const response = await fetch(`https://api.themoviedb.org/3/watch/providers/movie?api_key=ca97f9d1bde7122856c680263d6c4953&language=en-US&watch_region=${formInput.country}`)
   //       const platformsList = await response.json()
   //       console.log("I'm here")
   //       setPlatforms(platformsList.results)
   //    } else {
   //       const response = await fetch("https://api.themoviedb.org/3/watch/providers/movie?api_key=ca97f9d1bde7122856c680263d6c4953&language=en-US")
   //       const platformsList = await response.json()
   //       setPlatforms(platformsList.results)
   //    }
   // }

   const renderPlatformOptions = () => {
      return platforms.map(p => <><input type="checkbox" aria-label="Platforms" name="platforms" value={p.provider_id} onClick={manageMultiPlatformsSelect}/>{p.provider_name}<br/></>)
   }

   return(
      <>
         {loading && (
            <div id="loading">
               Loading Preferences . . .
            </div>
            )}
            
         {prefStatus && renderUserPreferences()}

         <form aria-label="editPreferencesForm" id="edit-preferences-form" onSubmit={handleSubmit}>
            <label htmlFor="Genre">Genre: </label><br/>
            {renderGenreOptions()}<br/>

            <label htmlFor="Year">Year: </label>
            <input type="number" aria-label="Year" name="year" onChange={updateInput}/><br/><br/>

            <label htmlFor="Country">Country: </label>
            <select aria-label="Country" name="country" onChange={updateInput}>
               {renderCountryOptions()}
            </select><br/><br/>

            <label htmlFor="Platforms">Platforms: </label><br/>
               {renderPlatformOptions()}<br/>

            <input type="submit" className="submitBtn" value="Save" style={{cursor: 'pointer'}}/><br/><br/>
         </form>
      </>
   )
}
