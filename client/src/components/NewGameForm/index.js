import React, {useState} from "react";
import { genres, platforms, countries } from "../../data/data"
import { useNavigate } from 'react-router-dom';

export function NewGameForm() {

   const navigateTo = useNavigate();

   const [ formInput, setFormInput ] = useState({
      "genre": null,
      "year": null,
      "country": null,
      "platform": null
   });

   const updateInput = e => {
      const input = e.target.value;
      return setFormInput((prev) => ({ ...prev, [e.target.name]: input }))
   }

   const handleSubmit = async(e) => {
      e.preventDefault();
      try{
         console.log("Send data to the waiting room?")
         console.log(formInput)
         navigateTo("/UsedPreferences")
      } catch(err) {
      }
   }
   
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
      return genres.map(genre => <><div><input type="checkbox" aria-label="Genre" name="genre" value={genre.id} onClick={manageMultiGenreSelect}/>{genre.genre_name}<br/></div></>)
   }
   
   const renderCountryOptions = () => {
      return countries.map( country => <><option value={country.value}>{country.name}</option></>)
   }

   const renderPlatformOptions = () => {
      return platforms.map(p => <><div><input type="checkbox" aria-label="Platforms" name="platforms" value={p.provider_id} onClick={manageMultiPlatformsSelect}/>{p.provider_name}</div><br/></>)
   }

  
   return(
      <>
         
         <h2 class="form-titles">Filters: </h2>
         <form aria-label="editPreferencesForm" id="edit-preferences-form" onSubmit={handleSubmit}>
           
            <label htmlFor="Genre">Genre: </label>
            <div id="genres-wrapper">
               {renderGenreOptions()}
            </div><br/>

            <label htmlFor="Year">Year: </label>
            <input type="number" aria-label="Year" name="year" onChange={updateInput}/><br/><br/>

            <label htmlFor="Country">Country: </label>
            <select aria-label="Country" name="country" onChange={updateInput}>
               {renderCountryOptions()}
            </select><br/><br/>

            <label htmlFor="Platforms">Platforms: </label><br/>
               <div id="platforms-wrapper">
               {renderPlatformOptions()}<br/>
               </div>

            <input type="submit" className="submitBtn" value="NEXT" style={{cursor: 'pointer'}}/><br/><br/>
         </form>

      </>
   )
}
