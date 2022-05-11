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
   const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]


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

   const renderGenreOptions = () => {
      return genres.map(genre => <><input type="checkbox" aria-label="Genre" name="genre" value={genre.id} onChange={updateInput}/>{genre.name}<br/></>)
   }

   


   return(
      <>

      {prefStatus && renderUserPreferences()}

      <form aria-label="editPreferencesForm" id="edit-preferences-form" onSubmit={handleSubmit}>

         <label htmlFor="Genre">Genre: </label><br/>
         {renderGenreOptions()}
         
         {/* <select name="genre" multiple={true}>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
         </select> */}

         <label htmlFor="Year">Year: </label>
         <input type="number" aria-label="Year" name="year" onChange={updateInput}/>

         <label htmlFor="Country">Country: </label>
         <input type="text" aria-label="Country" name="country" onChange={updateInput}/>

         <label htmlFor="Platforms">Platforms: </label>
         <input type="text" aria-label="Platforms" name="platform" onChange={updateInput}/>

         <input type="submit" className="submitBtn" value="Save" style={{cursor: 'pointer'}}/>


         {loading && (
         <div id="loading">
            Loading Preferences . . .
         </div>
         )}
      </form>

     

      </>
   )



}
