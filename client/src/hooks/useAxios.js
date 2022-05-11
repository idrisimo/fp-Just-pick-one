import axios from 'axios';
import { useEffect, useState } from 'react'

axios.defaults.baseURL = "http://127.0.0.1:8000/get_movies/"

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
