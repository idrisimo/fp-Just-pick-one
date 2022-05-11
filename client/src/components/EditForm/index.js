import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { createPreferences, getPreferences } from "../../actions";


export function EditForm() {

   const navigateTo = useNavigate();

   const [ loading, setLoading ] = useState(false)
   const [ userPreferences, setUserPreferences ] = useState({})
   const [ prefStatus, setPrefStatus] = useState(false)
   const [formInput, setFormInput] = useState({
      "genre": null,
      "year": null,
      "country": null,
      "platform": null
   });

   useEffect( () => {
      const getPref = async () => {
         const preferences = await getPreferences()
         console.log(preferences)
         if(preferences){
            setUserPreferences(preferences)
            setPrefStatus(true)
         }   
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
         console.log(newPreferences)
         if (newPreferences === "Successful"){
            navigateTo('/UserAccount')
         } else {
            throw new Error('Impossible to save new preferences!')
         }
      } catch(err) {
         setLoading(false)        
      }
   }

   const renderUserPreferences = () => {

      const genre = userPreferences.genre ? userPreferences.genre : "Any"
      const country = userPreferences.country ? userPreferences.country : "Any"
      const year = userPreferences.year ? userPreferences.year : "Any"
      const platform = userPreferences.platform ? userPreferences.platform : "Any"

      return (
         <>
            <h2>Your current preferences: </h2>
            <p>Genre code(s): {genre}</p>
            <p>Country: {country}</p>
            <p>Year: {year}</p>
            <p>Platform(s): {platform}</p>
            <h2>Edit your preferences: </h2>
         </>
         
      )
   }

   return(
      <>

      {prefStatus && renderUserPreferences()}

      <form aria-label="editPreferencesForm" id="edit-preferences-form" onSubmit={handleSubmit}>

         <label htmlFor="Genre">Genre: </label>
         <input type="text" aria-label="Genre" name="genre" onChange={updateInput}/>

         <label htmlFor="Year">Year: </label>
         <input type="number" aria-label="Year" name="year" onChange={updateInput}/>

         <label htmlFor="Country">Country: </label>
         <input type="text" aria-label="Country" name="country" onChange={updateInput}/>

         <label htmlFor="Platforms">Platforms: </label>
         <input type="text" aria-label="Platforms" name="platform" onChange={updateInput}/>

         <input type="submit" className="submitBtn" value="Save" style={{cursor: 'pointer'}}/>


      </form>
      {loading && (
         <div id="loading">
            Registering Account . . .
         </div>
      )}

      </>
   )



}
