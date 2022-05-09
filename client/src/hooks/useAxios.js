import axios from 'axios';
import { useEffect, useState } from 'react'

axios.defaults.baseURL = "https://api.themoviedb.org/3/discover/movie?api_key=63776e21ed364fcdaf334b748b8924eb&language=en-US&include_adult=false&include_video=false&page=1b"


const useAxios = ({ url }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchData = () => {
          axios 
          .get(url)
          .then(res => {setResponse(res.data)})
          .catch(err => setError(err))
          .finally(() => setLoading(false))
      }
      fetchData();
    }, [url])

    return { response, error, loading }
}

export default useAxios
